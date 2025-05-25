// app/administradores/mainpage.js
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const options = [
  { id: '1', label: 'Gestión de Grupos/Cursos', route: '/administradores/coursepages' },
  { id: '2', label: 'Gestion de Semestres', route: '/administradores/semesterpages' },
  { id: '3', label: 'Matricular Estudiantes', route: '/administradores/enrollmentpage' },
  { id: '4', label: 'Cargar desde Excel', route: '/administradores/exceluploadpage' },
];

const MainPage = () => {
  const router = useRouter();

  const handleOptionPress = (route) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panel de Administración</Text>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleOptionPress(item.route)}
          >
            <Text style={styles.optionText}>{item.label}</Text>
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
  optionItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MainPage;
