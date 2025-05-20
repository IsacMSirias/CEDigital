import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const RubricsPage = () => {
  const router = useRouter();
  const [rubrics, setRubrics] = useState([]);
  const [newRubric, setNewRubric] = useState({ name: '', percentage: '' });

  const handleAddRubric = () => {
    const percent = parseFloat(newRubric.percentage);
    if (!newRubric.name || isNaN(percent)) {
      Alert.alert('Error', 'Nombre y porcentaje válidos son requeridos.');
      return;
    }

    const total = rubrics.reduce((acc, r) => acc + parseFloat(r.percentage), 0) + percent;

    if (total > 100) {
      Alert.alert('Error', `El total no puede superar 100% (actual: ${total}%)`);
      return;
    }

    setRubrics([...rubrics, { ...newRubric, id: rubrics.length + 1 }]);
    setNewRubric({ name: '', percentage: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rubros Predeterminados</Text>

      <TextInput
        placeholder="Nombre del rubro"
        style={styles.input}
        value={newRubric.name}
        onChangeText={(text) => setNewRubric({ ...newRubric, name: text })}
      />
      <TextInput
        placeholder="Porcentaje"
        style={styles.input}
        keyboardType="numeric"
        value={newRubric.percentage}
        onChangeText={(text) => setNewRubric({ ...newRubric, percentage: text })}
      />

      <Button title="Agregar rubro" onPress={handleAddRubric} />

      <FlatList
        data={rubrics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.name}: {item.percentage}%</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/administradores/mainpage')}
      >
        <Text style={styles.backButtonText}>Volver al panel de administración</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  entry: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 5,
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#6c757d',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RubricsPage;
