
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const datos = [
  { id: '1', evaluacion: 'Quiz 1', nota: 85 },
  { id: '2', evaluacion: 'Proyecto', nota: 90 },
  { id: '3', evaluacion: 'Examen Final', nota: 78 },
];

const NotasEstudiante = () => {
  const router = useRouter();

  const calcularPromedio = () => {
    const total = datos.reduce((acc, curr) => acc + curr.nota, 0);
    return (total / datos.length).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reporte de Notas</Text>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.evaluacion}: {item.nota}</Text>
          </View>
        )}
      />
      <Text style={styles.promedio}>Promedio: {calcularPromedio()}</Text>
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
  promedio: { fontWeight: 'bold', fontSize: 18, marginTop: 20 },
  backButton: { marginTop: 20 },
});

export default NotasEstudiante;
