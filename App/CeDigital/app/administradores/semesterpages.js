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

const SemesterPages = () => {
  const router = useRouter();

  const [year, setYear] = useState('');
  const [period, setPeriod] = useState('');
  const [created, setCreated] = useState(false);

  const [assignedCourses, setAssignedCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    code: '',
    group: '',
    professorId: '',
  });

  const handleCreateSemester = () => {
    if (!year || !period) {
      Alert.alert('Error', 'Debes ingresar el año y el periodo.');
      return;
    }

    setCreated(true);
    Alert.alert('Éxito', `Semestre ${year}-${period} creado (simulado).`);
  };

  const handleAssignCourse = () => {
    if (!newCourse.code || !newCourse.group || !newCourse.professorId) {
      Alert.alert('Error', 'Debes completar todos los campos del curso.');
      return;
    }

    setAssignedCourses((prev) => [...prev, { ...newCourse, id: prev.length + 1 }]);
    setNewCourse({ code: '', group: '', professorId: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inicializar Semestre</Text>

      <TextInput
        placeholder="Año (ej. 2025)"
        style={styles.input}
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        placeholder="Periodo (1, 2 o V)"
        style={styles.input}
        value={period}
        onChangeText={setPeriod}
      />

      <Button title="Crear Semestre" onPress={handleCreateSemester} />

      {created && (
        <>
          <Text style={styles.subtitle}>Asignar Curso al Semestre</Text>

          <TextInput
            placeholder="Código del curso"
            style={styles.input}
            value={newCourse.code}
            onChangeText={(text) => setNewCourse({ ...newCourse, code: text })}
          />
          <TextInput
            placeholder="Grupo"
            style={styles.input}
            value={newCourse.group}
            onChangeText={(text) => setNewCourse({ ...newCourse, group: text })}
          />
          <TextInput
            placeholder="Cédula del profesor"
            style={styles.input}
            value={newCourse.professorId}
            onChangeText={(text) => setNewCourse({ ...newCourse, professorId: text })}
          />

          <Button title="Asignar curso" onPress={handleAssignCourse} />

          <FlatList
            data={assignedCourses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Curso: {item.code} | Grupo: {item.group} | Profesor: {item.professorId}</Text>
              </View>
            )}
          />
        </>
      )}

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
  item: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    marginVertical: 6,
    borderRadius: 6,
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

export default SemesterPages;
