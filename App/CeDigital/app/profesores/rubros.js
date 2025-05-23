import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const RubrosPage = () => {
  const router = useRouter();
  const [rubros, setRubros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const fetchRubros = async () => {
    try {
      const grupoId = await AsyncStorage.getItem('idGrupo');
      if (!grupoId) throw new Error('ID de grupo no encontrado');

      const res = await fetch(`${API}/Rubro/list?idGrupo=${grupoId}`);
      if (!res.ok) throw new Error('Error al obtener rubros');

      const data = await res.json();
      setRubros(data);
    } catch (err) {
      setMensaje(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRubros();
  }, []);

  const toggleModal = () => {
    setModalVisible(true);
    setMensaje('');
  };

  const updateRubroField = (index, field, value) => {
    const newRubros = [...rubros];
    if (field === 'porcentajeRubro') {
      const parsed = parseFloat(value);
      newRubros[index][field] = value === '' ? '' : isNaN(parsed) ? '' : parsed;
    } else {
      newRubros[index][field] = value;
    }
    setRubros(newRubros);
  };

  const handleDeleteRubro = (index) => {
    const newRubros = rubros.filter((_, i) => i !== index);
    setRubros(newRubros);
  };

  const handleSaveAll = async () => {
    const total = rubros.reduce((sum, r) => sum + parseFloat(r.porcentajeRubro || 0), 0);
    if (total !== 100) {
      setMensaje('La suma de los porcentajes debe ser exactamente 100%');
      return;
    }

    try {
      const grupoId = await AsyncStorage.getItem('idGrupo');
      for (let rubro of rubros) {
        if (rubro.idRubro) {
          await fetch(`${API}/Rubro/edit?id=${rubro.idRubro}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rubro)
          });
        } else {
          await fetch(`${API}/Rubro/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nombreRubro: rubro.nombreRubro,
              porcentajeRubro: rubro.porcentajeRubro,
              idGrupo: parseInt(grupoId)
            })
          });
        }
      }
      await fetchRubros();
      setModalVisible(false);
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Rubros</Text>
      {mensaje !== '' && <Text style={styles.error}>{mensaje}</Text>}
      <FlatList
        data={rubros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.nombreRubro} - {item.porcentajeRubro}%</Text>
        )}
      />
      <Button title="Editar Rubros" onPress={toggleModal} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Rubros</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {rubros.map((rubro, index) => (
                <View key={index} style={styles.rubroRow}>
                  <TextInput
                    placeholder="Nombre del rubro"
                    value={rubro.nombreRubro}
                    onChangeText={(text) => updateRubroField(index, 'nombreRubro', text)}
                    style={[styles.input, { flex: 1 }]}
                  />
                  <TextInput
                    placeholder="%"
                    keyboardType="numeric"
                    value={rubro.porcentajeRubro === '' ? '' : String(rubro.porcentajeRubro)}
                    onChangeText={(text) => updateRubroField(index, 'porcentajeRubro', text)}
                    style={[styles.input, { width: 70 }]}
                  />
                  <TouchableOpacity
                    onPress={() => handleDeleteRubro(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <Button
              title="Agregar Rubro"
              onPress={() => setRubros([...rubros, { nombreRubro: '', porcentajeRubro: '' }])}
            />
            {mensaje !== '' && <Text style={styles.error}>{mensaje}</Text>}
            <View style={styles.modalButtons}>
              <Button title="Guardar Cambios" onPress={handleSaveAll} />
              <Button title="Cancelar" color="#999" onPress={() => {
                setModalVisible(false);
                fetchRubros();
              }} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => {
          router.back();
          fetchRubros();
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  backButton: { marginTop: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  },
  rubroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  deleteButton: {
    backgroundColor: '#e57373',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 5
  },
  deleteText: {
    color: 'white',
    fontSize: 16
  }
});

export default RubrosPage;
