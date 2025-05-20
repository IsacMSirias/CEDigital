
import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const NoticiasEstudiante = () => {
  const router = useRouter();
  const [noticias] = useState([
    { id: '1', titulo: 'Cambio de fecha', mensaje: 'La evaluación se reprogramó al lunes.' },
    { id: '2', titulo: 'Nuevo material', mensaje: 'Se agregó una nueva lectura en documentos.' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias del Curso</Text>
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.mensaje}</Text>
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
  item: { padding: 10, backgroundColor: '#eee', marginVertical: 5, borderRadius: 6 },
  titulo: { fontWeight: 'bold' },
  backButton: { marginTop: 20 },
});

export default NoticiasEstudiante;
