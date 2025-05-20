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

const EnrollmentPage = () => {
  const router = useRouter();

  const [courseCode, setCourseCode] = useState('');
  const [group, setGroup] = useState('');
  const [carnet, setCarnet] = useState('');
  const [enrolled, setEnrolled] = useState([]);

  const handleAddStudent = () => {
    if (!courseCode || !group || !carnet) {
      Alert.alert('Error', 'Debes completar todos los campos.');
      return;
    }

    const newEntry = {
      id: enrolled.length + 1,
      courseCode,
      group,
      carnet,
    };

    setEnrolled([...enrolled, newEntry]);
    setCarnet('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Matrícula de Estudiantes</Text>

      <TextInput
        placeholder="Código del curso"
        style={styles.input}
        value={courseCode}
        onChangeText={setCourseCode}
      />
      <TextInput
        placeholder="Grupo"
        style={styles.input}
        value={group}
        onChangeText={setGroup}
      />
      <TextInput
        placeholder="Carné del estudiante"
        style={styles.input}
        value={carnet}
        onChangeText={setCarnet}
        keyboardType="numeric"
      />

      <Button title="Agregar estudiante" onPress={handleAddStudent} />

      <Text style={styles.subtitle}>Estudiantes Matriculados</Text>
      <FlatList
        data={enrolled}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>
              Carné: {item.carnet} | Curso: {item.courseCode} | Grupo: {item.group}
            </Text>
          </View>
        )}
      />

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
  entry: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 5,
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

export default EnrollmentPage;
