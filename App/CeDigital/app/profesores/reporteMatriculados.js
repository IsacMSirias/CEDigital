import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { API_URL, fetchEstudianteFromMongo } from '../../utils';

const API = API_URL + '/ced/sql';

const ReporteMatriculadosPage = () => {
  const router = useRouter();
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const grupoId = await AsyncStorage.getItem('idGrupo');
        if (!grupoId) throw new Error('ID de grupo no encontrado');

        const response = await fetch(`${API}/Matricula/list?idGrupo=${grupoId}`);
        if (!response.ok) throw new Error('Error al obtener carnets');

        const carnets = await response.json();
        const estudiantesInfo = await Promise.all(
          carnets.map(async (carnetObj) => {
            const estudiante = await fetchEstudianteFromMongo(carnetObj.carnetEstudiante);
            return estudiante ? estudiante : { carnetEstudiante: carnetObj.carnetEstudiante, nombreEstudiante: 'Desconocido', correoEstudiante: '-', telefonoEstudiante: '-' };
          })
        );

        setEstudiantes(estudiantesInfo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstudiantes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes Matriculados</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={estudiantes}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.nombreEstudiante} ({item.carnetEstudiante})</Text>
              <Text>Email: {item.correoEstudiante}</Text>
              <Text>Tel: {item.telefonoEstudiante}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#eee', padding: 10, marginVertical: 5, borderRadius: 6 },
  backButton: { marginTop: 20 },
});

export default ReporteMatriculadosPage;
