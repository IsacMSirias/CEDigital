import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const EntregablesPage = () => {
  const [nota, setNota] = useState('');
  const [observacion, setObservacion] = useState('');
  const router = useRouter();

  const handlePublicar = () => {
    if (!nota) {
      Alert.alert('Error', 'Debe ingresar una nota');
      return;
    }

    Alert.alert('Nota publicada', `Nota: ${nota}\nObs: ${observacion}`);
    setNota('');
    setObservacion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluar Entregables</Text>
      <TextInput placeholder="Nota" value={nota} onChangeText={setNota} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Observaciones" value={observacion} onChangeText={setObservacion} style={styles.input} />
      <Button title="Publicar Nota" onPress={handlePublicar} />
      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  backButton: { marginTop: 20 },
});

export default EntregablesPage;
