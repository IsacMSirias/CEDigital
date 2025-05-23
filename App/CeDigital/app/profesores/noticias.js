import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const NoticiasPage = () => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [noticias, setNoticias] = useState([]);
  const [idGrupo, setIdGrupo] = useState(null);
  const [cedulaProfesor, setCedulaProfesor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const router = useRouter();

  const fetchNoticias = async (grupoId) => {
    try {
      const res = await fetch(`${API}/Noticia/list?idGrupo=${grupoId}`);
      if (!res.ok) throw new Error('Error al obtener noticias');
      const data = await res.json();
      setNoticias(data);
    } catch (err) {
      console.error('Error cargando noticias:', err);
    }
  };

  const initialize = async () => {
    const grupoId = await AsyncStorage.getItem('idGrupo');
    const cedula = await AsyncStorage.getItem('cedulaProfesor');
    setIdGrupo(grupoId);
    setCedulaProfesor(cedula);
    fetchNoticias(grupoId);
  };

  useEffect(() => {
    initialize();
  }, []);

  const agregarNoticia = async () => {
    if (titulo && mensaje && idGrupo && cedulaProfesor) {
      const noticia = {
        tituloNoticia: titulo,
        mensajeNoticia: mensaje,
        fechaPublicacionNoticia: new Date().toISOString(),
        cedulaProfesor: parseInt(cedulaProfesor),
        idGrupo: parseInt(idGrupo)
      };

      try {
        const res = await fetch(`${API}/Noticia/new`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noticia)
        });

        if (!res.ok) throw new Error('Error al agregar noticia');
        setTitulo('');
        setMensaje('');
        fetchNoticias(idGrupo);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const actualizarNoticia = async () => {
    if (noticiaSeleccionada && idGrupo && cedulaProfesor) {
      const updated = {
        ...noticiaSeleccionada,
        tituloNoticia: titulo,
        mensajeNoticia: mensaje,
        fechaPublicacionNoticia: new Date().toISOString(),
        cedulaProfesor: parseInt(cedulaProfesor),
        idGrupo: parseInt(idGrupo)
      };

      try {
        const res = await fetch(`${API}/Noticia/edit?id=${noticiaSeleccionada.idNoticia}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });

        if (!res.ok) throw new Error('Error al actualizar noticia');
        setModalVisible(false);
        setTitulo('');
        setMensaje('');
        setNoticiaSeleccionada(null);
        fetchNoticias(idGrupo);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const eliminarNoticia = async (id) => {
    try {
      const res = await fetch(`${API}/Noticia/del?id=${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Error al eliminar noticia');
      setModalVisible(false);
      fetchNoticias(idGrupo);
    } catch (err) {
      console.error(err);
    }
  };

  const abrirModal = (noticia) => {
    setTitulo(noticia.tituloNoticia);
    setMensaje(noticia.mensajeNoticia);
    setNoticiaSeleccionada(noticia);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Noticias</Text>
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
      <TextInput placeholder="Mensaje" value={mensaje} onChangeText={setMensaje} style={styles.input} />
      <Button title="Agregar Noticia" onPress={agregarNoticia} />
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.idNoticia.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => abrirModal(item)}>
            <Text style={styles.title}>{item.tituloNoticia}</Text>
            <Text>{item.mensajeNoticia}</Text>
            <Text style={styles.fecha}>{new Date(item.fechaPublicacionNoticia).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.header}>Editar Noticia</Text>
          <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
          <TextInput placeholder="Mensaje" value={mensaje} onChangeText={setMensaje} style={styles.input} />
          <Button title="Guardar Cambios" onPress={actualizarNoticia} />
          <Button title="Eliminar Noticia" color="red" onPress={() => eliminarNoticia(noticiaSeleccionada.idNoticia)} />
          <Button title="Cancelar" color="gray" onPress={() => { setModalVisible(false); setNoticiaSeleccionada(null); }} />
        </View>
      </Modal>

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  item: { backgroundColor: '#eee', padding: 10, marginVertical: 5, borderRadius: 6 },
  title: { fontWeight: 'bold' },
  fecha: { fontStyle: 'italic', fontSize: 12, marginTop: 5 },
  backButton: { marginTop: 20 },
});

export default NoticiasPage;
