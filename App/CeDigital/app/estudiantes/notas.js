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

const API = 'http://localhost:5265/ced/sql';

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
      if (!grupoId) {
        throw new Error('No se encontró el ID del grupo en memoria.');
      }

      const rubrosRes = await fetch(`${API}/Rubro/list?idGrupo=${grupoId}`);
      if (!rubrosRes.ok) {
        throw new Error(`Error al obtener rubros: ${rubrosRes.status}`);
      }

      const data = await rubrosRes.json();
      if (!Array.isArray(data)) {
        throw new Error('La respuesta de rubros no es una lista.');
      }

      setRubros(data);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rubros del Grupo</Text>

      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {errorMsg && <Text style={styles.error}>⚠️ {errorMsg}</Text>}

      {!loading && !errorMsg && rubros.length === 0 && (
        <Text style={{ fontStyle: 'italic' }}>No hay rubros registrados.</Text>
      )}

      <FlatList
        data={rubros}
        keyExtractor={(item) => item.idRubro.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombreRubro}</Text>
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
  item: { padding: 10, backgroundColor: '#eee', marginVertical: 5, borderRadius: 6 },
  backButton: { marginTop: 20 },
  error: { color: 'red', fontWeight: 'bold', marginBottom: 10 },
});

export default NotasEstudiante;
