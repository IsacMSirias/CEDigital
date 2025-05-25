import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const CoursePages = () => {
  const router = useRouter();
  const [semestres, setSemestres] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSemestre, setSelectedSemestre] = useState(null);
  const [grupoData, setGrupoData] = useState({ idCurso: '', numeroGrupo: '', idEscuela: '' });

  useEffect(() => {
    fetch(`${API}/Semestre/list`)
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, cur) => {
          acc[cur.añoSemestre] = [...(acc[cur.añoSemestre] || []), cur];
          return acc;
        }, {});
        setSemestres(grouped);
      });

    fetch(`${API}/Curso/list`)
      .then(res => res.json())
      .then(setCursos);

    fetch(`${API}/Escuela/list`)
      .then(res => res.json())
      .then(setEscuelas);
  }, []);

  const toggleExpand = (año) => {
    setExpanded(prev => ({ ...prev, [año]: !prev[año] }));
  };

  const handleOpenModal = (semestre) => {
    setSelectedSemestre(semestre);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setGrupoData({ idCurso: '', numeroGrupo: '', idEscuela: '' });
    setModalVisible(false);
  };

  const handleAddGrupo = async () => {
    if (!grupoData.idCurso || !grupoData.numeroGrupo || !selectedSemestre?.idSemestre) return;

    const payload = {
      numeroGrupo: parseInt(grupoData.numeroGrupo),
      idCurso: parseInt(grupoData.idCurso),
      idSemestre: selectedSemestre.idSemestre
    };

    await fetch(`${API}/Grupo/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    handleCloseModal();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Grupos por Semestre</Text>

      {Object.entries(semestres).map(([año, lista]) => (
        <View key={año} style={styles.section}>
          <TouchableOpacity onPress={() => toggleExpand(año)}>
            <Text style={styles.sectionTitle}>{expanded[año] ? '▼' : '▶'} {año}</Text>
          </TouchableOpacity>

          {expanded[año] && lista.map(sem => (
            <View key={sem.idSemestre} style={styles.item}>
              <Text>Semestre {sem.periodoSemestre} - Estado: {sem.estadoSemestre}</Text>
              <Button title="Añadir Grupo" onPress={() => handleOpenModal(sem)} />
            </View>
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
            <Text style={styles.modalTitle}>Añadir Grupo</Text>
            <Text>Año: {selectedSemestre?.añoSemestre}</Text>
            <Text>Periodo: {selectedSemestre?.periodoSemestre}</Text>

            <Text>Escuela</Text>
            <select
              value={grupoData.idEscuela}
              onChange={(e) => setGrupoData({ ...grupoData, idEscuela: e.target.value })}
              style={styles.input}
            >
              <option value="">Seleccione una escuela</option>
              {escuelas.map(e => (
                <option key={e.idEscuela} value={e.idEscuela}>{e.nombreEscuela}</option>
              ))}
            </select>

            <Text>Curso</Text>
            <select
              value={grupoData.idCurso}
              onChange={(e) => setGrupoData({ ...grupoData, idCurso: e.target.value })}
              style={styles.input}
            >
              <option value="">Seleccione un curso</option>
              {cursos.map(c => (
                <option key={c.idCurso} value={c.idCurso}>{c.nombreCurso}</option>
              ))}
            </select>

            <TextInput
              placeholder="Número de grupo"
              keyboardType="numeric"
              style={styles.input}
              value={grupoData.numeroGrupo}
              onChangeText={(text) => setGrupoData({ ...grupoData, numeroGrupo: text })}
            />

            <Button title="Guardar" onPress={handleAddGrupo} />
            <Button title="Cerrar" onPress={handleCloseModal} color="#999" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 6, marginBottom: 5 },
  backButton: { marginTop: 30, padding: 15, backgroundColor: '#6c757d', borderRadius: 8 },
  backButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff'
  }
});

export default CoursePages;
