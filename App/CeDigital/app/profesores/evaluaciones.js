import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const EvaluacionesPage = () => {
  const router = useRouter();
  const [rubros, setRubros] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);
  const [formData, setFormData] = useState({});
  const [modoNuevo, setModoNuevo] = useState(false);

  const fetchEvaluaciones = async () => {
    const grupoId = await AsyncStorage.getItem('idGrupo');
    const rubrosRes = await fetch(`${API}/Rubro/list?idGrupo=${grupoId}`);
    const rubrosData = await rubrosRes.json();

    const rubrosConEvaluaciones = await Promise.all(
      rubrosData.map(async (r) => {
        const evalRes = await fetch(`${API}/Evaluacion/list?idRubro=${r.idRubro}`);
        const evaluaciones = evalRes.ok ? await evalRes.json() : [];
        return { ...r, evaluaciones };
      })
    );
    setRubros(rubrosConEvaluaciones);
  };

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenModal = (evaluacion, nuevo = false, idRubro = null) => {
    setModoNuevo(nuevo);
    setEvaluacionSeleccionada(evaluacion);
    setFormData({
      nombreEvaluacion: evaluacion?.nombreEvaluacion || '',
      pesoEvaluacion: evaluacion?.pesoEvaluacion?.toString() || '',
      esGrupalEvaluacion: evaluacion?.esGrupalEvaluacion || false,
      limiteEntregaEvaluacion: evaluacion?.limiteEntregaEvaluacion || '',
      idRubro: idRubro || evaluacion?.idRubro
    });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setEvaluacionSeleccionada(null);
    setFormData({});
    setModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = async () => {
    const data = {
      nombreEvaluacion: formData.nombreEvaluacion,
      pesoEvaluacion: parseInt(formData.pesoEvaluacion),
      esGrupalEvaluacion: formData.esGrupalEvaluacion,
      limiteEntregaEvaluacion: formData.limiteEntregaEvaluacion || null,
      idRubro: formData.idRubro
    };

    if (modoNuevo) {
      await fetch(`${API}/Evaluacion/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      await fetch(`${API}/Evaluacion/edit?id=${evaluacionSeleccionada.idEvaluacion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    handleCloseModal();
    fetchEvaluaciones();
  };

  const handleEliminar = async () => {
    await fetch(`${API}/Evaluacion/del?id=${evaluacionSeleccionada.idEvaluacion}`, { method: 'DELETE' });
    handleCloseModal();
    fetchEvaluaciones();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Evaluaciones</Text>

      {rubros.map((r) => (
        <View key={r.idRubro} style={styles.section}>
          <TouchableOpacity onPress={() => toggleExpand(r.idRubro)}>
            <Text style={styles.rubroHeader}>{expanded[r.idRubro] ? '▼' : '▶'} {r.nombreRubro}</Text>
          </TouchableOpacity>
          {expanded[r.idRubro] && (
            <>
              {r.evaluaciones.map((e) => (
                <TouchableOpacity
                  key={e.idEvaluacion}
                  style={styles.itemBox}
                  onPress={() => handleOpenModal(e)}
                >
                  <Text>{e.nombreEvaluacion} ({e.pesoEvaluacion}%)</Text>
                </TouchableOpacity>
              ))}
              <Button title="+ Añadir Evaluación" onPress={() => handleOpenModal(null, true, r.idRubro)} />
            </>
          )}
        </View>
      ))}

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modoNuevo ? 'Nueva Evaluación' : 'Editar Evaluación'}</Text>
            <TextInput
              placeholder="Nombre"
              value={formData.nombreEvaluacion}
              onChangeText={(text) => handleInputChange('nombreEvaluacion', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Peso"
              keyboardType="numeric"
              value={formData.pesoEvaluacion}
              onChangeText={(text) => handleInputChange('pesoEvaluacion', text)}
              style={styles.input}
            />
            <input
              type="datetime-local"
              value={formData.limiteEntregaEvaluacion}
              onChange={(e) => handleInputChange('limiteEntregaEvaluacion', e.target.value)}
              style={{ padding: 10, marginBottom: 10, borderRadius: 8, borderColor: '#ccc', borderWidth: 1 }}
            />
            <View style={styles.switchRow}>
              <Text>¿Es grupal?</Text>
              <Switch
                value={formData.esGrupalEvaluacion}
                onValueChange={(val) => handleInputChange('esGrupalEvaluacion', val)}
              />
            </View>
            <View style={styles.modalButtons}>
              <Button title="Guardar" onPress={handleGuardar} />
              {!modoNuevo && <Button title="Eliminar" color="#D32F2F" onPress={handleEliminar} />}
              <Button title="Cerrar" onPress={handleCloseModal} color="#888" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10
  },
  backButton: { marginTop: 20 },
  section: { marginBottom: 15 },
  rubroHeader: { fontWeight: 'bold', fontSize: 18 },
  itemBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalButtons: { marginTop: 15, gap: 10 }
});

export default EvaluacionesPage;
