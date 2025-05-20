
import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const DocumentosEstudiante = () => {
  const router = useRouter();
  const [documentos, setDocumentos] = useState([
    { id: '1', nombre: 'Guía de laboratorio 1', fecha: '2025-03-01' },
    { id: '2', nombre: 'Presentación Unidad 2', fecha: '2025-03-05' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documentos del Curso</Text>
      <FlatList
        data={documentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Text style={styles.fecha}>{item.fecha}</Text>
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
  item: { backgroundColor: '#eee', padding: 10, marginVertical: 5, borderRadius: 6 },
  fecha: { fontStyle: 'italic', fontSize: 12 },
  backButton: { marginTop: 20 },
});

export default DocumentosEstudiante;
