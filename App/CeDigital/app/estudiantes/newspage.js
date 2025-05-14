// app/newspage.js
import { Button, StyleSheet, Text, View } from 'react-native';

const NewsPage = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias</Text>
      <Text>Aquí puedes ver las noticias publicadas por el profesor...</Text>
      <Button title="Volver" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default NewsPage;
