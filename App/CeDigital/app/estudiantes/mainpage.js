import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from '../../utils';

const carnetPrueba = 1;

const MainPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`${API_URL}/ced/sql/Matricula/cursos-estudiante?carnet=${carnetPrueba}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${await response.text()}`);
        }

        const cursosRaw = await response.json();

        const formattedCourses = cursosRaw.map(curso => ({
          id: curso.idGrupo?.toString() ?? '',
          name: curso.nombreCurso ?? 'Sin nombre'
        }));

        setCourses(formattedCourses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const handleCoursePress = (courseName) => {
    router.push('/estudiantes/coursepage');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cursos Matriculados</Text>

      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseItem}
              onPress={() => handleCoursePress(item.name)}
            >
              <Text style={styles.courseText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.logoutContainer}>
        <Button title="Cerrar Sesión" onPress={handleLogout} color="#D32F2F" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#1976D2',
    borderRadius: 8,
  },
  courseText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutContainer: {
    marginTop: 30,
  },
});

export default MainPage;
