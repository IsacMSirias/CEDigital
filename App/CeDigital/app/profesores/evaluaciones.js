import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

const EvaluacionesPage = () => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [rubro, setRubro] = useState('');
  const [grupal, setGrupal] = useState(false);
  const router = useRouter();

  const handleAsignar = () => {
    if (!nombre || !peso || !rubro) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    Alert.alert('Evaluación asignada', `${nombre} (${peso}% del rubro ${rubro})`);
    setNombre('');
    setPeso('');
    setRubro('');
    setGrupal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Evaluación</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Peso (%)" keyboardType="numeric" value={peso} onChangeText={setPeso} style={styles.input} />
      <TextInput placeholder="Rubro" value={rubro} onChangeText={setRubro} style={styles.input} />
      <View style={styles.switchRow}>
        <Text>¿Es grupal?</Text>
        <Switch value={grupal} onValueChange={setGrupal} />
      </View>
      <Button title="Asignar Evaluación" onPress={handleAsignar} />
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
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { marginTop: 20 },
});

export default EvaluacionesPage;
