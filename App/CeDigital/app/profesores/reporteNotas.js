import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const estudiantes = [
  { nombre: 'Ana', quices: 80, examenes: 75, proyectos: 90 },
  { nombre: 'Luis', quices: 85, examenes: 65, proyectos: 88 },
];

const ReporteNotasPage = () => {
  const router = useRouter();

  const calcularNotaFinal = (e) => 0.3 * e.quices + 0.3 * e.examenes + 0.4 * e.proyectos;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reporte de Notas</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Text>Nota final: {calcularNotaFinal(item).toFixed(2)}</Text>
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
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 10, marginVertical: 5, backgroundColor: '#ddd', borderRadius: 8 },
  backButton: { marginTop: 20 },
});

export default ReporteNotasPage;
