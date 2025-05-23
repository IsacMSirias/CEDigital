import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const NotasEstudiante = () => {
  const [rubros, setRubros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const fetchRubros = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const grupoId = await AsyncStorage.getItem('idGrupo');
      const carnet = await AsyncStorage.getItem('carnetEstudiante');

      if (!grupoId || !carnet) {
        throw new Error('No se encontró el ID del grupo o carnet del estudiante en memoria.');
      }

      const rubrosRes = await fetch(`${API}/Rubro/list?idGrupo=${grupoId}`);
      if (!rubrosRes.ok) {
        throw new Error(`Error al obtener rubros: ${rubrosRes.status}`);
      }

      const rubrosData = await rubrosRes.json();
      if (!Array.isArray(rubrosData)) {
        throw new Error('La respuesta de rubros no es una lista.');
      }

      const rubrosConEvaluacionesYNotas = await Promise.all(
        rubrosData.map(async (rubro) => {
          try {
            const evalRes = await fetch(`${API}/Evaluacion/list?idRubro=${rubro.idRubro}`);
            let evals = evalRes.ok ? await evalRes.json() : [];

            evals = await Promise.all(
              evals.map(async (evalItem) => {
                try {
                  const notaRes = await fetch(
                    `${API}/Entregable/student-eval?carnet=${carnet}&evaluacion=${evalItem.idEvaluacion}`
                  );
                  const entregable = notaRes.ok ? await notaRes.json() : null;
                  return {
                    ...evalItem,
                    notaEntregable:
                      entregable && entregable.notaEntregable != null
                        ? entregable.notaEntregable
                        : 'Sin nota',
                  };
                } catch {
                  return { ...evalItem, notaEntregable: 'Error al cargar nota' };
                }
              })
            );

            return { ...rubro, evaluaciones: evals };
          } catch (error) {
            console.error('Error al obtener evaluaciones:', error);
            return { ...rubro, evaluaciones: [] };
          }
        })
      );

      setRubros(rubrosConEvaluacionesYNotas);
    } catch (error) {
      console.error('Error al cargar rubros:', error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRubros();
  }, []);

  const handleFileDrop = async (event, idEvaluacion) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const byteArray = Array.from(new Uint8Array(arrayBuffer));

      const carnet = await AsyncStorage.getItem('carnetEstudiante');
      const cedula = await AsyncStorage.getItem('cedulaProfesor');
      const carpetaId = await AsyncStorage.getItem('idCarpeta');

      const archivo = {
        contenidoArchivo: byteArray,
        tamañoArchivo: file.size,
        carnetEstudiante: parseInt(carnet),
        cedulaProfesor: parseInt(cedula),
        idCarpeta: parseInt(carpetaId),
      };

      try {
        const res = await fetch(`${API}/Archivo/new`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(archivo),
        });

        if (!res.ok) throw new Error('Error al subir archivo');
        alert(`Archivo ${file.name} subido correctamente`);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rubros del Grupo</Text>

      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {errorMsg !== '' && <Text style={styles.error}>⚠️ {errorMsg}</Text>}

      {!loading && !errorMsg && rubros.length === 0 && (
        <Text style={{ fontStyle: 'italic' }}>No hay rubros registrados.</Text>
      )}

      <FlatList
        data={rubros}
        keyExtractor={(item) => item.idRubro.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.rubroNombre}>{item.nombreRubro}</Text>
            <Text style={styles.rubroPorcentaje}>{item.porcentajeRubro}%</Text>

            {Array.isArray(item.evaluaciones) && item.evaluaciones.length > 0 ? (
              item.evaluaciones.map((evalItem) => (
                <View
                  key={evalItem.idEvaluacion}
                  style={styles.evaluacionItem}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFileDrop(e, evalItem.idEvaluacion)}
                >
                  <Text style={styles.evaluacionNombre}>• {evalItem.nombreEvaluacion}</Text>
                  <Text style={styles.evaluacionPeso}>Peso: {evalItem.pesoEvaluacion}%</Text>
                  <Text style={styles.evaluacionNota}>Nota: {evalItem.notaEntregable}</Text>

                  <View style={styles.dropZone}>
                    <Text style={{ textAlign: 'center' }}>
                      Arrastra un archivo aquí para subirlo
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.evaluacionItem}>
                <Text style={styles.evaluacionVacia}>Sin evaluaciones registradas</Text>
              </View>
            )}
          </View>
        )}
      />

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 6,
  },
  rubroNombre: { fontWeight: 'bold', fontSize: 16 },
  rubroPorcentaje: { color: '#555', marginBottom: 5 },
  evaluacionItem: { paddingLeft: 10, marginTop: 10 },
  evaluacionNombre: { fontSize: 14 },
  evaluacionPeso: { fontSize: 12, color: '#666' },
  evaluacionNota: { fontSize: 12, color: '#333' },
  evaluacionVacia: { fontStyle: 'italic', fontSize: 12, color: '#777' },
  dropZone: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#888',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fafafa',
  },
  backButton: { marginTop: 20 },
  error: { color: 'red', fontWeight: 'bold', marginBottom: 10 },
});

export default NotasEstudiante;
