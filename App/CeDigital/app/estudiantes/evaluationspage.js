// app/evaluationspage.js
import { Button, StyleSheet, Text, View } from 'react-native';

const EvaluationsPage = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluaciones</Text>
      <Text>Aquí puedes enviar tus evaluaciones...</Text>
      <Button title="Volver" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EvaluationsPage;
