import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const CoursePages = () => {
  const router = useRouter();
  const [semestres, setSemestres] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [expandedEscuelas, setExpandedEscuelas] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [grupoData, setGrupoData] = useState({ idCurso: '', numeroGrupo: '', idSemestre: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingGrupoId, setEditingGrupoId] = useState(null);

  const [cursoModalVisible, setCursoModalVisible] = useState(false);
  const [cursoData, setCursoData] = useState({ idCurso: '', nombreCurso: '', creditosCurso: '', idEscuela: '' });
  const [editingCursoId, setEditingCursoId] = useState(null);

  useEffect(() => {
    fetch(`${API}/Semestre/list`).then(res => res.json()).then(setSemestres);
    fetch(`${API}/Grupo/list`).then(res => res.json()).then(setGrupos);
    fetch(`${API}/Curso/list`).then(res => res.json()).then(setCursos);
    fetch(`${API}/Escuela/list`).then(res => res.json()).then(setEscuelas);
  }, []);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpandEscuela = (id) => {
    setExpandedEscuelas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAddModal = (idSemestre) => {
    setGrupoData({ idCurso: '', numeroGrupo: '', idSemestre });
    setEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (grupo) => {
    setGrupoData({
      idCurso: grupo.idCurso.toString(),
      numeroGrupo: grupo.numeroGrupo.toString(),
      idSemestre: grupo.idSemestre
    });
    setEditingGrupoId(grupo.idGrupo);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setGrupoData({ idCurso: '', numeroGrupo: '', idSemestre: '' });
    setEditingGrupoId(null);
    setEditMode(false);
    setModalVisible(false);
  };

  const handleSaveGrupo = async () => {
    const payload = {
      idCurso: parseInt(grupoData.idCurso),
      numeroGrupo: parseInt(grupoData.numeroGrupo),
      idSemestre: grupoData.idSemestre
    };

    const endpoint = editMode ? `${API}/Grupo/update/${editingGrupoId}` : `${API}/Grupo/new`;
    const method = editMode ? 'PUT' : 'POST';

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    fetch(`${API}/Grupo/list`).then(res => res.json()).then(setGrupos);
    handleCloseModal();
  };

  const handleDeleteGrupo = async () => {
    if (editingGrupoId) {
      await fetch(`${API}/Grupo/del?id=${editingGrupoId}`, { method: 'DELETE' });
      fetch(`${API}/Grupo/list`).then(res => res.json()).then(setGrupos);
      handleCloseModal();
    }
  };

  const openCursoModal = (curso) => {
    setCursoData({
      idCurso: curso.idCurso,
      nombreCurso: curso.nombreCurso,
      creditosCurso: curso.creditosCurso.toString(),
      idEscuela: curso.idEscuela.toString()
    });
    setEditingCursoId(curso.idCurso);
    setCursoModalVisible(true);
  };

  const closeCursoModal = () => {
    setCursoData({ idCurso: '', nombreCurso: '', creditosCurso: '', idEscuela: '' });
    setEditingCursoId(null);
    setCursoModalVisible(false);
  };

  const saveCurso = async () => {
    const payload = {
      nombreCurso: cursoData.nombreCurso,
      creditosCurso: parseInt(cursoData.creditosCurso),
      idEscuela: parseInt(cursoData.idEscuela)
    };

    await fetch(`${API}/Curso/update/${editingCursoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    fetch(`${API}/Curso/list`).then(res => res.json()).then(setCursos);
    closeCursoModal();
  };

  const deleteCurso = async () => {
    await fetch(`${API}/Curso/delete/${editingCursoId}`, { method: 'DELETE' });
    fetch(`${API}/Curso/list`).then(res => res.json()).then(setCursos);
    closeCursoModal();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Grupos por Semestre</Text>

      {semestres.map(sem => (
        <View key={sem.idSemestre} style={styles.section}>
          <TouchableOpacity onPress={() => toggleExpand(sem.idSemestre)}>
            <Text style={styles.sectionTitle}>{expanded[sem.idSemestre] ? '▼' : '▶'} {sem.añoSemestre} - {sem.periodoSemestre}</Text>
          </TouchableOpacity>

          {expanded[sem.idSemestre] && (
            <>
              {grupos.filter(g => g.idSemestre === sem.idSemestre).map(grupo => (
                <TouchableOpacity key={grupo.idGrupo} style={styles.item} onPress={() => openEditModal(grupo)}>
                  <Text>Grupo {grupo.numeroGrupo} - Curso: {cursos.find(c => c.idCurso === grupo.idCurso)?.nombreCurso || 'Desconocido'}</Text>
                </TouchableOpacity>
              ))}
              <Button title="Añadir Grupo" onPress={() => openAddModal(sem.idSemestre)} />
            </>
          )}
        </View>
      ))}

      <Text style={styles.title}>Gestión de Escuelas y Cursos</Text>
      {escuelas.map(esc => (
        <View key={esc.idEscuela} style={styles.section}>
          <TouchableOpacity onPress={() => toggleExpandEscuela(esc.idEscuela)}>
            <Text style={styles.sectionTitle}>{expandedEscuelas[esc.idEscuela] ? '▼' : '▶'} {esc.nombreEscuela}</Text>
          </TouchableOpacity>
          {expandedEscuelas[esc.idEscuela] && (
            cursos.filter(c => c.idEscuela === esc.idEscuela).map(curso => (
              <View key={curso.idCurso} style={styles.itemRow}>
                <Text>{curso.nombreCurso} ({curso.creditosCurso} créditos)</Text>
                <TouchableOpacity onPress={() => openCursoModal(curso)}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/administradores/mainpage')}>
        <Text style={styles.backButtonText}>Volver al panel de administración</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Editar Grupo' : 'Añadir Grupo'}</Text>
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
            <Button title="Guardar" onPress={handleSaveGrupo} />
            {editMode && <Button title="Eliminar" onPress={handleDeleteGrupo} color="#D32F2F" />}
            <Button title="Cerrar" onPress={handleCloseModal} color="#999" />
          </View>
        </View>
      </Modal>

      <Modal visible={cursoModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Curso</Text>
            <TextInput
              placeholder="Nombre del curso"
              value={cursoData.nombreCurso}
              onChangeText={(text) => setCursoData({ ...cursoData, nombreCurso: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Créditos"
              keyboardType="numeric"
              value={cursoData.creditosCurso}
              onChangeText={(text) => setCursoData({ ...cursoData, creditosCurso: text })}
              style={styles.input}
            />
            <Button title="Guardar" onPress={saveCurso} />
            <Button title="Eliminar" onPress={deleteCurso} color="#D32F2F" />
            <Button title="Cerrar" onPress={closeCursoModal} color="#999" />
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
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 10, borderRadius: 6, marginBottom: 5 },
  editButton: { color: '#007bff' },
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
