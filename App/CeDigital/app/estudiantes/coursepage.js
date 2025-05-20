import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CoursePage = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Curso Matriculado</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('/estudiantes/documentos')}>
          <Text style={styles.buttonText}>Ver Documentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('/estudiantes/evaluaciones')}>
          <Text style={styles.buttonText}>Enviar Evaluaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('/estudiantes/notas')}>
          <Text style={styles.buttonText}>Ver Reporte de Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('/estudiantes/noticias')}>
          <Text style={styles.buttonText}>Ver Noticias</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CoursePage;
