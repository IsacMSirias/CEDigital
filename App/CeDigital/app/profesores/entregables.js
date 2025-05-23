import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const EntregablesPage = () => {
  const router = useRouter();
  const [rubros, setRubros] = useState([]);
  const [expandedRubros, setExpandedRubros] = useState({});
  const [expandedEvaluaciones, setExpandedEvaluaciones] = useState({});
  const [selectedEntregable, setSelectedEntregable] = useState(null);
  const [nota, setNota] = useState(0);
  const [observaciones, setObservaciones] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEntregables = async () => {
    try {
      const grupoId = await AsyncStorage.getItem('idGrupo');
      if (!grupoId) throw new Error('ID de grupo no encontrado.');

      const rubrosRes = await fetch(`${API}/Rubro/list?idGrupo=${grupoId}`);
      if (!rubrosRes.ok) throw new Error('Error al obtener rubros');
      const rubrosData = await rubrosRes.json();

      const rubrosConEvaluaciones = await Promise.all(
        rubrosData.map(async (rubro) => {
          const evalRes = await fetch(`${API}/Evaluacion/list?idRubro=${rubro.idRubro}`);
          const evaluaciones = evalRes.ok ? await evalRes.json() : [];

          const evaluacionesConEntregables = await Promise.all(
            evaluaciones.map(async (evaluacion) => {
              const entregablesRes = await fetch(`${API}/Entregable/list?idEvaluacion=${evaluacion.idEvaluacion}`);
              const entregables = entregablesRes.ok ? await entregablesRes.json() : [];
              return { ...evaluacion, entregables };
            })
          );

          return { ...rubro, evaluaciones: evaluacionesConEntregables };
        })
      );

      setRubros(rubrosConEvaluaciones);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntregables();
  }, []);

  const toggleRubro = (id) => {
    setExpandedRubros((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEvaluacion = (id) => {
    setExpandedEvaluaciones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (entregable) => {
    setSelectedEntregable(entregable);
    setNota(entregable.notaEntregable?.toString() || '');
    setObservaciones(entregable.observacionesEntregable || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEntregable(null);
    setNota('');
    setObservaciones('');
    setModalVisible(false);
  };

  const handleGuardarNota = async () => {
    if (!selectedEntregable) return;
    await fetch(`${API}/Entregable/set-nota?id=${selectedEntregable.idEntregable}&notaEntregable=${nota}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        observacionesEntregable: observaciones
      })
    });
    closeModal();
    fetchEntregables();
  };

  const handleDescargarArchivo = () => {
    if (selectedEntregable?.idArchivoEntrega) {
      Linking.openURL(`${API}/Archivo/download?id=${selectedEntregable.idArchivoEntrega}`);
    }
  };

  const handleSubirDesglose = async () => {
    if (!selectedEntregable) return;
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      const base64 = await fetch(result.uri).then(res => res.blob()).then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });

      const archivo = {
        contenidoArchivo: base64,
        tamañoArchivo: result.size,
        carnetEstudiante: selectedEntregable.carnetEstudiante,
        cedulaProfesor: 0,
        idCarpeta: selectedEntregable.idCarpeta || 1,
        fechaSubidaArchivo: new Date().toISOString()
      };

      const res = await fetch(`${API}/Archivo/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(archivo)
      });

      if (res.ok) {
        const data = await res.json();
        await fetch(`${API}/Entregable/edit-desglose?id=${selectedEntregable.idEntregable}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idArchivoDesglose: data.idArchivo })
        });
        fetchEntregables();
        closeModal();
      }
    }
  };

  const handleEliminarDesglose = async () => {
    if (!selectedEntregable?.idArchivoDesglose) return;
    await fetch(`${API}/Archivo/del?id=${selectedEntregable.idArchivoDesglose}`, { method: 'DELETE' });
    await fetch(`${API}/Entregable/edit-desglose?id=${selectedEntregable.idEntregable}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idArchivoDesglose: null })
    });
    fetchEntregables();
    closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Entregables por Evaluación</Text>
      {loading && <Text>Cargando...</Text>}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {rubros.map((rubro) => (
        <View key={rubro.idRubro} style={styles.section}>
          <TouchableOpacity onPress={() => toggleRubro(rubro.idRubro)}>
            <Text style={styles.rubroTitle}>
              {expandedRubros[rubro.idRubro] ? '▼' : '▶'} {rubro.nombreRubro}
            </Text>
          </TouchableOpacity>
          {expandedRubros[rubro.idRubro] && rubro.evaluaciones.map((evaluacion) => (
            <View key={evaluacion.idEvaluacion} style={styles.subsection}>
              <TouchableOpacity onPress={() => toggleEvaluacion(evaluacion.idEvaluacion)}>
                <Text style={styles.evalTitle}>
                  {expandedEvaluaciones[evaluacion.idEvaluacion] ? '▼' : '▶'} {evaluacion.nombreEvaluacion}
                </Text>
              </TouchableOpacity>
              {expandedEvaluaciones[evaluacion.idEvaluacion] && (
                evaluacion.entregables.length === 0 ? (
                  <Text style={styles.noData}>Sin entregables</Text>
                ) : (
                  evaluacion.entregables.map((entregable) => (
                    <TouchableOpacity
                      key={entregable.idEntregable}
                      style={styles.entregableBox}
                      onPress={() => openModal(entregable)}
                    >
                      <Text>Estudiante: {entregable.carnetEstudiante}</Text>
                      <Text>Nota: {entregable.notaEntregable ?? 'No asignada'}</Text>
                      <Text>Observaciones: {entregable.observacionesEntregable ?? 'N/A'}</Text>
                    </TouchableOpacity>
                  ))
                )
              )}
            </View>
          ))}
        </View>
      ))}

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gestionar Entregable</Text>
            <TextInput
              placeholder="Nota"
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Observaciones"
              value={observaciones}
              onChangeText={setObservaciones}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Guardar Nota" onPress={handleGuardarNota} />
              <Button title="Descargar Archivo" onPress={handleDescargarArchivo} />
              <Button title="Subir Desglose" onPress={handleSubirDesglose} />
              <Button title="Eliminar Desglose" color="#D32F2F" onPress={handleEliminarDesglose} />
              <Button title="Cerrar" color="#999" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  rubroTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  evalTitle: { fontSize: 16, fontWeight: '600', marginTop: 5 },
  entregableBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
  },
  section: { marginBottom: 20 },
  subsection: { paddingLeft: 10 },
  noData: { fontStyle: 'italic', color: '#777' },
  error: { color: 'red', fontWeight: 'bold' },
  backButton: { marginTop: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalButtons: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  }
});

export default EntregablesPage;
