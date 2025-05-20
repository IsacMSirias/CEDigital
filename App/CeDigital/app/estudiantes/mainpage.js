import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const courses = [
  { id: '1', name: 'Matemáticas' },
  { id: '2', name: 'Física' },
  { id: '3', name: 'Química' },
  { id: '4', name: 'Historia' },
  { id: '5', name: 'Programación' },
];

const MainPage = () => {
  const router = useRouter();

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
