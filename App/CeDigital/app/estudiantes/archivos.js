import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../../utils';

const API = API_URL + '/ced/sql';

const Archivos = () => {
  const router = useRouter();
  const { idCarpeta } = useLocalSearchParams();
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchArchivos = async () => {
    try {
      if (!idCarpeta || isNaN(idCarpeta)) throw new Error('ID de carpeta no recibido o inválido.');

      const url = `${API}/Archivo/list?idCarpeta=${idCarpeta}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
      const data = await res.json();

      setArchivos(Array.isArray(data) ? data : []);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArchivos(); }, [idCarpeta]);

  const descargarArchivo = (nombre, base64) => {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = nombre || 'archivo.bin';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar archivo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archivos de la Carpeta {idCarpeta}</Text>

      {loading && <ActivityIndicator size="large" />}
      {errorMsg ? (
        <Text style={styles.error}>⚠️ {errorMsg}</Text>
      ) : (
        archivos.length === 0 && !loading && (
          <Text style={{ fontStyle: 'italic' }}>No hay archivos disponibles.</Text>
        )
      )}

      {archivos.map((archivo) => (
        <View key={archivo.idArchivo} style={styles.item}>
          <Text style={styles.nombre}>Archivo #{archivo.idArchivo}</Text>
          <Text style={styles.subtexto}>Tamaño: {archivo.tamañoArchivo} bytes</Text>
          <Text style={styles.subtexto}>Fecha: {new Date(archivo.fechaSubidaArchivo).toLocaleString()}</Text>
          {Platform.OS === 'web' && (
            <Button
              title="Descargar"
              onPress={() =>
                descargarArchivo(`archivo_${archivo.idArchivo}.bin`, archivo.contenidoArchivo)
              }
            />
          )}
        </View>
      ))}

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#eee', padding: 10, marginVertical: 5, borderRadius: 6 },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  subtexto: { fontSize: 12, color: '#555' },
  backButton: { marginTop: 20 },
  error: { color: 'red', marginBottom: 10 },
});

export default Archivos;
