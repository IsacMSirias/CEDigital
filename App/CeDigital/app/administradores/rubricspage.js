// app/administradores/rubricspage.js
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Alert } from 'react-native';

const RubricsPage = ({ onBack }) => {
  const [rubrics, setRubrics] = useState([]);
  const [newRubric, setNewRubric] = useState({ name: '', percentage: '' });

  const handleAddRubric = () => {
    const percentage = parseFloat(newRubric.percentage);

    if (!newRubric.name || isNaN(percentage)) {
      Alert.alert('Error', 'Nombre y porcentaje válidos son requeridos.');
      return;
    }

    const total = rubrics.reduce((sum, r) => sum + parseFloat(r.percentage), 0) + percentage;

    if (total > 100) {
      Alert.alert('Error', `El total de porcentajes no puede exceder 100% (actual: ${total}%).`);
      return;
    }

    setRubrics(prev => [...prev, { ...newRubric, id: prev.length + 1 }]);
    setNewRubric({ name: '', percentage: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Rubros</Text>

      <TextInput
        placeholder="Nombre del rubro (e.g. Quices)"
        style={styles.input}
        value={newRubric.name}
        onChangeText={(text) => setNewRubric({ ...newRubric, name: text })}
      />
      <TextInput
        placeholder="Porcentaje"
        keyboardType="numeric"
        style={styles.input}
        value={newRubric.percentage}
        onChangeText={(text) => setNewRubric({ ...newRubric, percentage: text })}
      />
      <Button title="Agregar rubro" onPress={handleAddRubric} />

      <Text style={styles.subtitle}>Rubros agregados</Text>
      <FlatList
        data={rubrics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rubricItem}>
            <Text>{item.name} - {item.percentage}%</Text>
          </View>
        )}
      />

      <Button title="Volver" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  rubricItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default RubricsPage;
