import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, TouchableOpacity, FlatList, View 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PaginaCadastro() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (usuario && senha) {
      try {
        await AsyncStorage.setItem(usuario, senha);
        Alert.alert('Sucesso', 'Usuário cadastrado!');
        setUsuario('');
        setSenha('');
      } catch (error) {
        Alert.alert('Erro');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>organiZer</Text>
      <Text style={styles.subText}>O app que irá te ajudar a organizar sua rotina!</Text>
      <Text style={styles.subText}>Cadastre-se para começar sua jornada</Text>
      
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="crie um nome de usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="crie uma senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
    </SafeAreaView>
  );
}
