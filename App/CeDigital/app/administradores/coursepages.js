// app/administradores/coursespage.js
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Alert, TouchableOpacity } from 'react-native';

const CoursesPage = ({ onBack }) => {
  const [courses, setCourses] = useState([
    { id: '1', code: 'CE3101', name: 'Bases de Datos', credits: 4, career: 'Computadores' },
    { id: '2', code: 'CE1102', name: 'Circuitos Eléctricos', credits: 3, career: 'Computadores' },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    career: '',
  });

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.credits || !newCourse.career) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setCourses(prev => [
      ...prev,
      { ...newCourse, id: (prev.length + 1).toString() },
    ]);

    setNewCourse({ code: '', name: '', credits: '', career: '' });
  };

  const handleDisableCourse = (id) => {
    Alert.alert('Deshabilitado', `Curso con ID ${id} fue deshabilitado (simulado).`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Cursos</Text>

      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>{item.code} - {item.name} ({item.credits} créditos) - {item.career}</Text>
            <TouchableOpacity onPress={() => handleDisableCourse(item.id)}>
              <Text style={styles.disableButton}>Deshabilitar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.subheader}>Agregar Nuevo Curso</Text>
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
        style={styles.input}
        keyboardType="numeric"
        value={newCourse.credits}
        onChangeText={(text) => setNewCourse({ ...newCourse, credits: text })}
      />
      <TextInput
        placeholder="Carrera"
        style={styles.input}
        value={newCourse.career}
        onChangeText={(text) => setNewCourse({ ...newCourse, career: text })}
      />

      <Button title="Agregar Curso" onPress={handleAddCourse} />

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
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  courseItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  disableButton: {
    color: 'red',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default CoursesPage;
