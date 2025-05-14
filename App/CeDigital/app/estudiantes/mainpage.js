// mainpage.js
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const courses = [
  { id: '1', name: 'Matemáticas' },
  { id: '2', name: 'Física' },
  { id: '3', name: 'Química' },
  { id: '4', name: 'Historia' },
  { id: '5', name: 'Programación' },
];

const MainPage = ({ onSelectCourse }) => {
  const handleCoursePress = (courseName) => {
    onSelectCourse(courseName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cursos</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    courseItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#007bff',
        borderRadius: 8,
    },
    courseText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default MainPage;
