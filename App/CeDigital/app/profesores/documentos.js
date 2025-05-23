import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const DocumentosPage = () => {
  const router = useRouter();
  const [carpetas, setCarpetas] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [error, setError] = useState('');
  const [nuevaCarpeta, setNuevaCarpeta] = useState('');

  const fetchCarpetas = async () => {
    try {
      const grupoId = await AsyncStorage.getItem('idGrupo');
      if (!grupoId) throw new Error('No se encontró el ID del grupo.');

      const res = await fetch(`${API}/Carpeta/contenidos?idGrupo=${grupoId}`);
      if (!res.ok) throw new Error('Error al obtener carpetas');
      const data = await res.json();
      setCarpetas(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivos = async (idCarpeta) => {
    try {
      const res = await fetch(`${API}/Archivo/listar?idCarpeta=${idCarpeta}`);
      if (!res.ok) throw new Error('Error al obtener archivos');
      const data = await res.json();
      setArchivos(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleFolderPress = (carpeta) => {
    setSelectedFolder(carpeta);
    fetchArchivos(carpeta.idCarpeta);
  };

  const handleCrearCarpeta = async () => {
    if (!nuevaCarpeta.trim()) return;
    const grupoId = await AsyncStorage.getItem('idGrupo');
    const cedula = await AsyncStorage.getItem('cedulaProfesor');
    const nueva = {
      rutaCarpeta: nuevaCarpeta,
      idGrupo: parseInt(grupoId),
      cedulaProfesor: parseInt(cedula)
    };

    const res = await fetch(`${API}/Carpeta/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nueva)
    });

    if (!res.ok) return;
    setNuevaCarpeta('');
    fetchCarpetas();
  };

  const handleEliminarCarpeta = async (idCarpeta) => {
    const res = await fetch(`${API}/Carpeta/del/${idCarpeta}`, { method: 'DELETE' });
    if (!res.ok) return;
    if (selectedFolder?.idCarpeta === idCarpeta) setSelectedFolder(null);
    fetchCarpetas();
  };

  const renderFolder = ({ item }) => (
    <View style={styles.itemRow}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleFolderPress(item)}>
        <Text style={styles.folderText}>📁 {item.rutaCarpeta}</Text>
      </TouchableOpacity>
      {item.cedulaProfesor !== null && (
        <TouchableOpacity
          style={styles.smallDeleteButton}
          onPress={() => handleEliminarCarpeta(item.idCarpeta)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#EF9A9A'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFCDD2'}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFile = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nombreArchivo || `Archivo ${item.idArchivo}`}</Text>
      <Text>Tamaño: {item.tamañoArchivo} bytes</Text>
      <Text>Subido: {new Date(item.fechaSubidaArchivo).toLocaleDateString()}</Text>
    </View>
  );

  const handlePickDocument = async () => {
    if (!selectedFolder) return;

    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      const base64 = await fetch(result.uri).then(res => res.blob()).then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });

      const carnet = await AsyncStorage.getItem('carnetEstudiante');

      const archivo = {
        contenidoArchivo: base64,
        tamañoArchivo: result.size,
        carnetEstudiante: parseInt(carnet),
        cedulaProfesor: 0,
        idCarpeta: selectedFolder.idCarpeta,
        fechaSubidaArchivo: new Date().toISOString()
      };

      const res = await fetch(`${API}/Archivo/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(archivo)
      });

      if (!res.ok) return;
      fetchArchivos(selectedFolder.idCarpeta);
    }
  };

  useEffect(() => {
    fetchCarpetas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Documentos</Text>
      {loading && <ActivityIndicator size="large" />}
      {error !== '' && <Text style={{ color: 'red' }}>⚠️ {error}</Text>}

      <TextInput
        placeholder="Nombre de nueva carpeta"
        value={nuevaCarpeta}
        onChangeText={setNuevaCarpeta}
        style={styles.input}
      />
      <Button title="Crear Carpeta" onPress={handleCrearCarpeta} />

      <Text style={styles.subtitle}>Carpetas</Text>
      <FlatList
        data={carpetas}
        keyExtractor={(item) => item.idCarpeta.toString()}
        renderItem={renderFolder}
      />

      {selectedFolder && (
        <>
          <Text style={styles.subtitle}>Archivos en: {selectedFolder.rutaCarpeta}</Text>
          <Button title="Subir Documento" onPress={handlePickDocument} />
          <FlatList
            data={archivos}
            keyExtractor={(item) => item.idArchivo.toString()}
            renderItem={renderFile}
          />
        </>
      )}

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  item: { padding: 10, marginVertical: 5, backgroundColor: '#eee', borderRadius: 6 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5, backgroundColor: '#eee', padding: 10, borderRadius: 6 },
  folderText: { fontSize: 16, fontWeight: 'bold' },
  smallDeleteButton: { padding: 4, marginLeft: 10, backgroundColor: '#FFCDD2', borderRadius: 4 },
  deleteText: { fontSize: 12, color: '#B71C1C' },
  backButton: { marginTop: 20 },
});

export default DocumentosPage;
