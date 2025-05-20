import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '' || trimmedPassword === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      await AsyncStorage.setItem('username', trimmedEmail);

      if (trimmedEmail.includes('profetec')) {
        Alert.alert('Éxito', `Bienvenido profesor: ${trimmedEmail}`);
        router.replace('/profesores/mainpage');
      } else if (trimmedEmail.includes('admintec')) {
        Alert.alert('Éxito', `Bienvenido administrador: ${trimmedEmail}`);
        router.replace('/administradores/mainpage');
      } else if (trimmedEmail.includes('estudiantec')) {
        Alert.alert('Éxito', `Bienvenido estudiante: ${trimmedEmail}`);
        router.replace('/estudiantes/mainpage');
      } else {
        Alert.alert('Error', 'Correo no reconocido. Asegúrese de usar un dominio válido.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Login;
