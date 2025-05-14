import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MainPage = () => {
  const router = useRouter();

  const options = [
    { label: 'Ver y editar cursos', route: '/administradores/coursespage' },
    { label: 'Crear semestre', route: '/administradores/semesterspage' },
    { label: 'Asignar cursos y profesores', route: '/administradores/semesterspage' },
    { label: 'Matricular estudiantes', route: '/administradores/enrollmentpage' },
    { label: 'Subir archivo Excel', route: '/administradores/exceluploadpage' },
    { label: 'Crear estructura de carpetas', route: '/administradores/folderspage' },
    { label: 'Crear rubros predeterminados', route: '/administradores/rubricspage' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Administrador CEDigital</Text>
      <Text style={styles.subheader}>¿Qué desea gestionar hoy?</Text>

      <View style={styles.cardContainer}>
        {options.map((opt, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => router.push(opt.route)}>
            <Text style={styles.cardText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  cardContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#6c757d',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainPage;
