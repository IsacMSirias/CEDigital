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
import { MONGO_API_URL } from '../utils.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(-1);
  const router = useRouter();
  const userTypeApiRoutes = ['Administrador', 'Profesor', 'Estudiante'];
  const userTypeFrontendRoutes = ['administradores', 'profesores', 'estudiantes'];

  const handleLogin = async () => {
    const correoLogin = email.trim().toLowerCase();
    const contraseñaLogin = password.trim();

    if (correoLogin === '' || contraseñaLogin === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    // Redirección según tipo de usuario
    if (correoLogin.includes('profetec')) {
      setUserType(1);
    } else if (correoLogin.includes('admintec')) {
      setUserType(0);
    } else if (correoLogin.includes('estudiantec')) {
      setUserType(2);
    }

    try {
      if (userType >= 0) {
        const response = await fetch(
          `${MONGO_API_URL}/api/${userTypeApiRoutes[userType]}/login?correo=${encodeURIComponent(correoLogin)}&password=${encodeURIComponent(contraseñaLogin)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data === false) {
            Alert.alert('Error', 'Correo o contraseña incorrectos.');
            return;
          } else {
            const frotendUrl = `/${userTypeFrontendRoutes[userType]}/mainpage`;

            // Guardar datos en AsyncStorage según el tipo de usuario
            if (userType === 0) {
              await AsyncStorage.setItem('idAdministrador', data.idAdministrador.toString());
              router.replace({
                pathname: frotendUrl,
                params: { idAdministrador: data.idAdministrador }
              });
            } else if (userType === 1) {
              await AsyncStorage.setItem('cedulaProfesor', data.cedulaProfesor.toString());
              router.replace({
                pathname: frotendUrl,
                params: { cedulaProfesor: data.cedulaProfesor }
              });
            } else if (userType === 2) {
              await AsyncStorage.setItem('carnetEstudiante', data.carnetEstudiante.toString());
              router.replace({
                pathname: frotendUrl,
                params: { carnetEstudiante: data.carnetEstudiante }
              });
            }
          }

        } else {
          Alert.alert('Error', 'Correo no reconocido. Asegúrese de usar un dominio válido.');
        }
      }

    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
      console.error(error);
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
