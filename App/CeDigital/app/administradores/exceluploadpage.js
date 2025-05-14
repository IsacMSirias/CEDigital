// app/administradores/exceluploadpage.js
import { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const ExcelUploadPage = ({ onBack }) => {
  const [fileName, setFileName] = useState(null);

  const handleUpload = () => {
    // Simulación: en una app real usarías DocumentPicker o backend API.
    setFileName('semestre_2025.xlsx');
    Alert.alert('Archivo cargado', 'Archivo "semestre_2025.xlsx" subido exitosamente (simulado).');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carga de archivo Excel</Text>

      <Button title="Seleccionar archivo Excel" onPress={handleUpload} />

      {fileName && (
        <Text style={styles.fileInfo}>Archivo cargado: {fileName}</Text>
      )}

      <Button title="Volver" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileInfo: {
    marginTop: 15,
    fontSize: 16,
    color: 'green',
  },
});

export default ExcelUploadPage;
