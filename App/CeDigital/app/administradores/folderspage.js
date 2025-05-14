// app/administradores/folderspage.js
import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const defaultFolders = ['Presentaciones', 'Quices', 'Exámenes', 'Proyectos'];

const FoldersPage = ({ onBack }) => {
  const [courseCode, setCourseCode] = useState('');
  const [group, setGroup] = useState('');
  const [folders, setFolders] = useState([]);

  const handleCreateStructure = () => {
    if (!courseCode || !group) {
      Alert.alert('Error', 'Debe ingresar el código del curso y el grupo.');
      return;
    }

    const createdFolders = defaultFolders.map((name, index) => ({
      id: index.toString(),
      name,
    }));

    setFolders(createdFolders);

    Alert.alert('Estructura creada', `Carpetas creadas para ${courseCode} grupo ${group}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estructura de Carpetas del Curso</Text>

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

      <Button title="Crear estructura" onPress={handleCreateStructure} />

      <Text style={styles.subtitle}>Carpetas creadas:</Text>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.folderItem}>
            <Text>{item.name}</Text>
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
  folderItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default FoldersPage;
