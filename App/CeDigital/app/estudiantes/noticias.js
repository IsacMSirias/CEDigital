import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const NoticiasEstudiante = () => {
  const router = useRouter();
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const grupoId = await AsyncStorage.getItem('idGrupo');
      if (!grupoId) {
        throw new Error('No se encontró el ID del grupo en memoria.');
      }

      const res = await fetch(`${API}/Noticia/list?idGrupo=${grupoId}`);
      if (!res.ok) {
        throw new Error(`Error al obtener noticias: ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('La respuesta de noticias no es una lista.');
      }

      setNoticias(data);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias del Curso</Text>

      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {errorMsg !== '' && <Text style={styles.error}>⚠️ {errorMsg}</Text>}

      {!loading && noticias.length === 0 && (
        <Text style={{ fontStyle: 'italic' }}>No hay noticias publicadas.</Text>
      )}

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.idNoticia.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.tituloNoticia}</Text>
            <Text>{item.mensajeNoticia}</Text>
            <Text style={styles.fecha}>{new Date(item.fechaPublicacionNoticia).toLocaleDateString()}</Text>
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
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  fecha: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  backButton: { marginTop: 20 },
  error: { color: 'red', fontWeight: 'bold', marginBottom: 10 },
});

export default NoticiasEstudiante;
