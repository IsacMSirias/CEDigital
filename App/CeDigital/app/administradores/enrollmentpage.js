// app/administradores/enrollmentpage.js
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Alert } from 'react-native';

const EnrollmentPage = ({ onBack }) => {
  const [courseCode, setCourseCode] = useState('');
  const [group, setGroup] = useState('');
  const [carnet, setCarnet] = useState('');
  const [enrolled, setEnrolled] = useState([]);

  const handleAddStudent = () => {
    if (!courseCode || !group || !carnet) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setEnrolled(prev => [
      ...prev,
      {
        id: prev.length + 1,
        courseCode,
        group,
        carnet,
      },
    ]);

    setCarnet('');
  };

  return (
    <View style={styles.container}>
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
            <Text>{item.carnet} - Curso: {item.courseCode} Grupo: {item.group}</Text>
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
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  entry: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default EnrollmentPage;
