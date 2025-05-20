import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MainPage = () => {
  const router = useRouter();

  const courses = [
    { id: '1', name: 'Bases de Datos' },
    { id: '2', name: 'Programación' },
    { id: '3', name: 'Sistemas Operativos' },
  ];

  const handleCoursePress = (courseName) => {
    router.push('/profesores/coursepage');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    router.replace('/login'); // Evita que vuelva a esta vista con "back"
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => handleCoursePress(item.name)}>
      <Text style={styles.courseText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos Asignados</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
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
  logoutContainer: {
    marginTop: 30,
  },
});

export default MainPage;
