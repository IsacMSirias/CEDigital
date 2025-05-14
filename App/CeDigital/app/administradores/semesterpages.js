// app/administradores/semesterspage.js
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Alert } from 'react-native';

const SemestersPage = ({ onBack }) => {
  const [year, setYear] = useState('');
  const [period, setPeriod] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    code: '',
    group: '',
    professor: '',
  });

  const handleCreateSemester = () => {
    if (!year || !period) {
      Alert.alert('Error', 'Ingrese el año y periodo.');
      return;
    }
    Alert.alert('Éxito', `Semestre ${year}-${period} creado (simulado).`);
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.group || !newCourse.professor) {
      Alert.alert('Error', 'Complete todos los campos del curso.');
      return;
    }

    setCourses(prev => [...prev, { ...newCourse, id: prev.length + 1 }]);
    setNewCourse({ code: '', group: '', professor: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicializar Semestre</Text>

      <Text style={styles.subtitle}>Datos del Semestre</Text>
      <TextInput
        placeholder="Año (e.g. 2025)"
        keyboardType="numeric"
        style={styles.input}
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        placeholder="Periodo (1, 2, V)"
        style={styles.input}
        value={period}
        onChangeText={setPeriod}
      />
      <Button title="Crear Semestre" onPress={handleCreateSemester} />

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
        placeholder="Profesor (cédula)"
        style={styles.input}
        value={newCourse.professor}
        onChangeText={(text) => setNewCourse({ ...newCourse, professor: text })}
      />
      <Button title="Agregar Curso al Semestre" onPress={handleAddCourse} />

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>Curso: {item.code} - Grupo: {item.group} - Profesor: {item.professor}</Text>
          </View>
        )}
      />

      <Button title="Volver" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  courseItem: {
    backgroundColor: '#dcdcdc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default SemestersPage;
