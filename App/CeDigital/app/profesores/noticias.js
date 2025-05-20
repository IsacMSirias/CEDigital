import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const NoticiasPage = () => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [noticias, setNoticias] = useState([]);
  const router = useRouter();

  const agregarNoticia = () => {
    if (titulo && mensaje) {
      setNoticias([{ titulo, mensaje, fecha: new Date().toLocaleDateString() }, ...noticias]);
      setTitulo('');
      setMensaje('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Noticias</Text>
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
      <TextInput placeholder="Mensaje" value={mensaje} onChangeText={setMensaje} style={styles.input} />
      <Button title="Agregar Noticia" onPress={agregarNoticia} />
      <FlatList
        data={noticias}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>{item.mensaje}</Text>
            <Text style={styles.fecha}>{item.fecha}</Text>
          </View>
        )}
      />
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
