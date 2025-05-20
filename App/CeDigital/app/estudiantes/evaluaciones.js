
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const EvaluacionesEstudiante = () => {
  const router = useRouter();
  const [entrega, setEntrega] = useState('');
  const [lista, setLista] = useState([]);

  const enviar = () => {
    if (!entrega.trim()) {
      Alert.alert('Error', 'Ingrese un nombre de archivo válido');
      return;
    }
    const nueva = {
      id: Date.now().toString(),
      archivo: entrega,
      fecha: new Date().toLocaleDateString(),
    };
    setLista([nueva, ...lista]);
    setEntrega('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Evaluaciones</Text>
      <TextInput
        placeholder="Nombre del archivo"
        style={styles.input}
        value={entrega}
        onChangeText={setEntrega}
      />
      <Button title="Subir Entrega" onPress={enviar} />
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Archivo: {item.archivo}</Text>
            <Text>Fecha: {item.fecha}</Text>
          </View>
        )}
      />
      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  item: { padding: 10, marginVertical: 5, backgroundColor: '#eee', borderRadius: 6 },
  backButton: { marginTop: 20 },
});

export default EvaluacionesEstudiante;
