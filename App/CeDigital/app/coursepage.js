// app/coursepage.js
import { Button, StyleSheet, Text, View } from 'react-native';

const CoursePage = ({ courseName, onBack, onViewDocuments, onViewEvaluations, onViewGrades, onViewNews }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Curso: {courseName}</Text>
      <Button title="Volver" onPress={onBack} />
      
      {/* Botones para navegar a los apartados */}
      <Button title="Ver Documentos" onPress={onViewDocuments} />
      <Button title="Enviar Evaluaciones" onPress={onViewEvaluations} />
      <Button title="Ver Reporte de Notas" onPress={onViewGrades} />
      <Button title="Ver Noticias" onPress={onViewNews} />
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
    marginTop: 30,
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 15,  
    height: 60,  
    fontSize: 18,  
    borderRadius: 10,  
  },
  backButton: {
    marginBottom: 30,  
    height: 60,
    fontSize: 18,
    borderRadius: 10,
  },
});

export default CoursePage;
