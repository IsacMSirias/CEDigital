import { useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const estudiantes = [
  { carnet: '20210001', nombre: 'Ana Torres', correo: 'ana@tec.ac.cr', telefono: '8888-8888' },
  { carnet: '20210002', nombre: 'Luis Gómez', correo: 'luis@tec.ac.cr', telefono: '8999-9999' },
];

const ReporteMatriculadosPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes Matriculados</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre} ({item.carnet})</Text>
            <Text>Email: {item.correo}</Text>
            <Text>Tel: {item.telefono}</Text>
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
  item: { backgroundColor: '#eee', padding: 10, marginVertical: 5, borderRadius: 6 },
  backButton: { marginTop: 20 },
});

export default ReporteMatriculadosPage;
