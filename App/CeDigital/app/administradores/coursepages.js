import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const CoursePages = () => {
  const router = useRouter();

  const [courses, setCourses] = useState([
    { id: '1', code: 'CE3101', name: 'Bases de Datos', credits: 4, career: 'Computadores' },
    { id: '2', code: 'CE4201', name: 'Redes de Computadoras', credits: 3, career: 'Computadores' },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    career: '',
  });

  const handleAddCourse = () => {
    const { code, name, credits, career } = newCourse;

    if (!code || !name || !credits || !career) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newId = (courses.length + 1).toString();

    setCourses([
      ...courses,
      {
        id: newId,
        code,
        name,
        credits,
        career,
      },
    ]);

    setNewCourse({ code: '', name: '', credits: '', career: '' });
  };

  const handleDisableCourse = (id) => {
    Alert.alert('Curso deshabilitado', `Curso con ID ${id} fue deshabilitado (simulado).`);
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Cursos</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={<Text>No hay cursos registrados.</Text>}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={styles.courseText}>
              {item.code} - {item.name} ({item.credits} créditos) - {item.career}
            </Text>
            <TouchableOpacity onPress={() => handleDisableCourse(item.id)}>
              <Text style={styles.disableButton}>Deshabilitar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Agregar nuevo curso</Text>
      <TextInput
        placeholder="Código"
        style={styles.input}
        value={newCourse.code}
        onChangeText={(text) => setNewCourse({ ...newCourse, code: text })}
      />
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={newCourse.name}
        onChangeText={(text) => setNewCourse({ ...newCourse, name: text })}
      />
      <TextInput
        placeholder="Créditos"
        keyboardType="numeric"
        style={styles.input}
        value={newCourse.credits}
        onChangeText={(text) => setNewCourse({ ...newCourse, credits: text })}
      />
      <TextInput
        placeholder="Carrera"
        style={styles.input}
        value={newCourse.career}
        onChangeText={(text) => setNewCourse({ ...newCourse, career: text })}
      />

      <Button title="Agregar curso" onPress={handleAddCourse} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/administradores/mainpage')}
      >
        <Text style={styles.backButtonText}>Volver al panel de administración</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  courseItem: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  courseText: {
    fontSize: 16,
  },
  disableButton: {
    color: 'red',
    marginTop: 5,
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#6c757d',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CoursePages;
