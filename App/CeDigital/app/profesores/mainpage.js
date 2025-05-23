import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

const API = API_URL + '/ced/sql';

const MainPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cedula, setCedula] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedCedula = await AsyncStorage.getItem('cedulaProfesor');
        if (!storedCedula) throw new Error('Cédula del profesor no encontrada');

        setCedula(storedCedula);

        const gruposRes = await fetch(`${API}/ProfesorGrupo/cursos-profesor?cedula=${storedCedula}`);
        if (!gruposRes.ok) throw new Error('Error al obtener los grupos');

        const grupos = await gruposRes.json();

        const cursosRes = await fetch(`${API}/Curso/list`);
        if (!cursosRes.ok) throw new Error('Error al obtener cursos');
        const cursos = await cursosRes.json();

        const semestresRes = await fetch(`${API}/Semestre/list`);
        if (!semestresRes.ok) throw new Error('Error al obtener semestres');
        const semestres = await semestresRes.json();

        const formattedCourses = grupos.map(grupo => {
          const curso = cursos.find(c => c.idCurso === grupo.idCurso);
          const semestre = semestres.find(s => s.idSemestre === grupo.idSemestre);

          return {
            id: grupo.idGrupo.toString(),
            name: curso?.nombreCurso || 'Curso desconocido',
            groupNumber: grupo.numeroGrupo,
            semester: semestre ? `${semestre.periodoSemestre}-${semestre.añoSemestre}` : 'Semestre desconocido'
          };
        });

        setCourses(formattedCourses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const handleCoursePress = async (idGrupo, nombreCurso) => {
    try {
      await AsyncStorage.setItem('idGrupo', idGrupo);
      await AsyncStorage.setItem('nombreCurso', nombreCurso || 'Curso desconocido');
      router.push('/profesores/coursepage');
    } catch (err) {
      console.error('Error guardando el ID del grupo:', err);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['username', 'cedulaProfesor', 'idGrupo']);
    router.replace('/login');
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => handleCoursePress(item.id, item.name + ' G' + item.groupNumber)}>
      <Text style={styles.courseText}>{item.name} - Grupo {item.groupNumber}</Text>
      <Text style={styles.semesterText}>{item.semester}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos Asignados</Text>

      {loading && <ActivityIndicator size="large" color="#1976D2" />}
      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={courses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
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
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseItem: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#DDD',
    borderRadius: 8,
  },
  courseText: {
    fontSize: 18,
  },
  semesterText: {
    fontSize: 14,
    color: '#555'
  },
  logoutContainer: {
    marginTop: 30,
  },
});

export default MainPage;
