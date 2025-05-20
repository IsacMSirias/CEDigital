import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const RubrosPage = () => {
  const [rubros, setRubros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const router = useRouter();

  const agregarRubro = () => {
    const nuevoPorcentaje = parseFloat(porcentaje);
    const total = rubros.reduce((acc, r) => acc + r.porcentaje, 0) + nuevoPorcentaje;

    if (isNaN(nuevoPorcentaje) || !nombre) {
      Alert.alert('Error', 'Campos inválidos');
    } else if (total > 100) {
      Alert.alert('Error', 'La suma excede el 100%');
    } else {
      setRubros([...rubros, { nombre, porcentaje: nuevoPorcentaje }]);
      setNombre('');
      setPorcentaje('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Rubros</Text>
      <TextInput placeholder="Nombre del rubro" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Porcentaje" keyboardType="numeric" value={porcentaje} onChangeText={setPorcentaje} style={styles.input} />
      <Button title="Agregar Rubro" onPress={agregarRubro} />
      <FlatList
        data={rubros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.nombre} - {item.porcentaje}%</Text>}
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
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  backButton: { marginTop: 20 },
});

export default RubrosPage;
