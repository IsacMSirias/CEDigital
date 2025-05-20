import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const DocumentosPage = () => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState('');
  const router = useRouter();

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      const newFile = {
        name: result.name,
        size: result.size,
        uri: result.uri,
        folder: folder || 'General',
        date: new Date().toLocaleDateString(),
      };
      setFiles([...files, newFile]);
    }
  };

  const renderFile = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>Carpeta: {item.folder}</Text>
      <Text>Tamaño: {item.size} bytes</Text>
      <Text>Fecha: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Documentos</Text>
      <TextInput
        placeholder="Nombre de carpeta (opcional)"
        value={folder}
        onChangeText={setFolder}
        style={styles.input}
      />
      <Button title="Subir Documento" onPress={handlePickDocument} />

      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFile}
      />

      <View style={styles.backButton}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
  item: { padding: 10, marginVertical: 5, backgroundColor: '#eee', borderRadius: 6 },
  backButton: { marginTop: 20 },
});

export default DocumentosPage;
