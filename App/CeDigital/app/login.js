import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ onEstudiante, onProfesor, onAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '' || trimmedPassword === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      await AsyncStorage.setItem('username', trimmedEmail);

      if (trimmedEmail.includes('estudiantec')) {
        Alert.alert('Éxito', `Bienvenido estudiante: ${email}`);
        onEstudiante(); // va a estudiantes/mainpage
      } else if (trimmedEmail.includes('profetec')) {
        Alert.alert('Éxito', `Bienvenido profesor: ${email}`);
        onProfesor(); // va a profesores/mainpage
      } else if (trimmedEmail.includes('admin')) {
        Alert.alert('Éxito', `Bienvenido administrador: ${email}`);
        onAdmin(); // va a administrador/mainpage
      } else {
        Alert.alert('Error', 'Usuario no reconocido.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el usuario.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
