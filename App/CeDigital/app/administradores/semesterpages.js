import { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const SemesterPages = () => {
  const router = useRouter();

  const [semestres, setSemestres] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSemestre, setSelectedSemestre] = useState(null);
  const [formData, setFormData] = useState({ añoSemestre: '', periodoSemestre: '', estadoSemestre: 'E' });

  const fetchSemestres = async () => {
    const res = await fetch(`${API}/Semestre/list`);
    const data = await res.json();

    const grouped = data.reduce((acc, curr) => {
      const year = curr.añoSemestre;
      if (!acc[year]) acc[year] = [];
      acc[year].push(curr);
      return acc;
    }, {});

    setSemestres(grouped);
  };

  useEffect(() => {
    fetchSemestres();
  }, []);

  const toggleExpand = (year) => {
    setExpanded((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const handleOpenModal = (semestre) => {
    setSelectedSemestre(semestre);
    setFormData({
      añoSemestre: semestre.añoSemestre.toString(),
      periodoSemestre: semestre.periodoSemestre,
      estadoSemestre: semestre.estadoSemestre
    });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedSemestre(null);
    setFormData({ añoSemestre: '', periodoSemestre: '', estadoSemestre: 'E' });
    setModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = async () => {
    const data = {
      idSemestre: selectedSemestre?.idSemestre,
      añoSemestre: parseInt(formData.añoSemestre),
      periodoSemestre: formData.periodoSemestre,
      estadoSemestre: formData.estadoSemestre
    };

    if (selectedSemestre) {
      await fetch(`${API}/Semestre/update/${selectedSemestre.idSemestre}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      await fetch(`${API}/Semestre/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    handleCloseModal();
    fetchSemestres();
  };

  const handleEliminar = async () => {
    if (selectedSemestre) {
      await fetch(`${API}/Semestre/delete/${selectedSemestre.idSemestre}`, { method: 'DELETE' });
      handleCloseModal();
      fetchSemestres();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestión de Semestres</Text>

      <Button title="Nuevo Semestre" onPress={() => setModalVisible(true)} />

      {Object.entries(semestres).map(([year, items]) => (
        <View key={year} style={styles.section}>
          <TouchableOpacity onPress={() => toggleExpand(year)}>
            <Text style={styles.rubroHeader}>{expanded[year] ? '▼' : '▶'} {year}</Text>
          </TouchableOpacity>
          {expanded[year] && items.map((s) => (
            <TouchableOpacity
              key={s.idSemestre}
              style={styles.itemBox}
              onPress={() => handleOpenModal(s)}
            >
              <Text>{s.periodoSemestre} - Estado: {s.estadoSemestre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/administradores/mainpage')}
      >
        <Text style={styles.backButtonText}>Volver al panel de administración</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedSemestre ? 'Editar Semestre' : 'Nuevo Semestre'}</Text>
            <TextInput
              placeholder="Año"
              value={formData.añoSemestre}
              onChangeText={(text) => handleInputChange('añoSemestre', text)}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Periodo"
              value={formData.periodoSemestre}
              onChangeText={(text) => handleInputChange('periodoSemestre', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Estado (A, E, F)"
              value={formData.estadoSemestre}
              onChangeText={(text) => handleInputChange('estadoSemestre', text)}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Guardar" onPress={handleGuardar} />
              {selectedSemestre && <Button title="Eliminar" color="#D32F2F" onPress={handleEliminar} />}
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
  section: { marginBottom: 15 },
  rubroHeader: { fontWeight: 'bold', fontSize: 18 },
  itemBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 5
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#6c757d',
    borderRadius: 8
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
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

export default SemesterPages;
