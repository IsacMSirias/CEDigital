import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const DocumentosEstudiante = () => {
  const router = useRouter();
  const [carpetas, setCarpetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchCarpetas = async () => {
    try {
      const grupoId = await AsyncStorage.getItem('idGrupo');
      if (!grupoId) throw new Error('No se encontró el ID del grupo.');

      const res = await fetch(`${API}/Carpeta/contenidos?idGrupo=${grupoId}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      setCarpetas(Array.isArray(data) ? data : []);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCarpetas(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carpetas del Curso</Text>

      {loading && <ActivityIndicator size="large" />}
      {errorMsg && <Text style={styles.error}>⚠️ {errorMsg}</Text>}
      {!loading && carpetas.length === 0 && (
        <Text style={{ fontStyle: 'italic' }}>No hay carpetas.</Text>
      )}

      <FlatList
        data={carpetas}
        keyExtractor={(item) => item.idCarpeta.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/estudiantes/archivos',
                params: { idCarpeta: item.idCarpeta }
              })
            }
            style={styles.item}
          >
            <Text style={styles.nombre}>{item.rutaCarpeta}</Text>
            <Text style={styles.subtexto}>ID: {item.idCarpeta}</Text>
          </TouchableOpacity>
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
  item: { backgroundColor: '#eee', padding: 10, marginVertical: 5, borderRadius: 6 },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  subtexto: { fontSize: 12, color: '#555' },
  backButton: { marginTop: 20 },
  error: { color: 'red', marginBottom: 10 },
});

export default DocumentosEstudiante;
