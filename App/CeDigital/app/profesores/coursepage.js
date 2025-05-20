import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

const CoursePage = ({ courseName }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Curso: {courseName}</Text>

      <View style={styles.buttonsContainer}>
        <Button title="Ver Documentos" onPress={() => router.push('/profesores/documentos')} />
        <Button title="Gestionar Rubros" onPress={() => router.push('/profesores/rubros')} />
        <Button title="Asignar Evaluaciones" onPress={() => router.push('/profesores/evaluaciones')} />
        <Button title="Evaluar Entregables" onPress={() => router.push('/profesores/entregables')} />
        <Button title="Ver Noticias" onPress={() => router.push('/profesores/noticias')} />
        <Button title="Reporte de Notas" onPress={() => router.push('/profesores/reporteNotas')} />
        <Button title="Estudiantes Matriculados" onPress={() => router.push('/profesores/reporteMatriculados')} />
      </View>

      {/* Este sí funciona como volver */}
      <View style={styles.backButtonContainer}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
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
    gap: 10,
    marginBottom: 30,
  },
  backButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default CoursePage;
