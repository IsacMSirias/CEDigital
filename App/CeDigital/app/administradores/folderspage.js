import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const defaultFolders = ['Presentaciones', 'Quices', 'Exámenes', 'Proyectos'];

const FoldersPage = () => {
  const router = useRouter();
  const [courseCode, setCourseCode] = useState('');
  const [group, setGroup] = useState('');
  const [folders, setFolders] = useState([]);

  const handleCreateStructure = () => {
    if (!courseCode || !group) {
      Alert.alert('Error', 'Debes ingresar el código del curso y el grupo.');
      return;
    }

    const created = defaultFolders.map((name, index) => ({
      id: index.toString(),
      name,
    }));

    setFolders(created);

    Alert.alert('Estructura creada', `Carpetas para ${courseCode} grupo ${group} generadas.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estructura de Carpetas</Text>

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

      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.name}</Text>
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
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  entry: {
    padding: 10,
    backgroundColor: '#eee',
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

export default FoldersPage;
