import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ExcelUploadPage = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState(null);

  const handleUpload = () => {
    // Simulado: en futuro se integrará DocumentPicker y backend.
    setFileName('semestre_2025.xlsx');
    Alert.alert('Archivo cargado', 'Archivo "semestre_2025.xlsx" subido exitosamente (simulado).');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carga desde Excel</Text>

      <Button title="Seleccionar archivo Excel" onPress={handleUpload} />

      {fileName && <Text style={styles.fileInfo}>Archivo cargado: {fileName}</Text>}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/administradores/mainpage')}
      >
        <Text style={styles.backButtonText}>Volver al panel de administración</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  fileInfo: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
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

export default ExcelUploadPage;
