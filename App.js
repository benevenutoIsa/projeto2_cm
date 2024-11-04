import React, { useState, useEffect  } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, TouchableOpacity, FlatList, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import styles from './styles';

//cria navegadores das paginas
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//função de cadastrar o usuario
function PaginaCadastro() {
  //onde vão ser armazenados os valores de usuario e senha
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const handleRegistrar = async () => {
    //guarda no armazenamento local, deixa o campo vazio novamente 
    if (usuario && senha) {
      try {
        await AsyncStorage.setItem(usuario, senha);
        Alert.alert('Sucesso', 'Usuário cadastrado!');
        setUsuario('');
        setSenha('');
      } catch (erro) {
        Alert.alert('Erro');
      }
    }
  };
  //monta a tela de cadastro com conexão ao arquivo de style css
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
      <Button title="Registrar" onPress={handleRegistrar} />
    </SafeAreaView>
  );
}

//função da pagina de login
function PaginaLogin({ navigation }) {
  //onde vão ser armazenados os valores de usuario e senha
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [sound, setSound] = useState();

  // carregar o som para quando o login for efetuado com sucesso
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/login-success.mp3') 
    );
    setSound(sound);
  };
  //faz a confirmação se o login foi realizado corretamente e solta o som escolhido 
  const handleLogin = async () => {
    const senhaArmazenada = await AsyncStorage.getItem(usuario);
    if (senhaArmazenada === senha) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      if (sound) {
        await sound.replayAsync(); 
      }
      navigation.navigate('Opcoes');
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos.');
    }
  };
  
  useEffect(() => {
    loadSound(); //solta o som ao entrar na pagina depois de confirma
    return sound
      ? () => {
          sound.unloadAsync(); //para ele
        }
      : undefined;
  }, []);
//monta a tela de cadastro com conexão ao arquivo de style css
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>organiZer</Text>
      <Text style={styles.subText}>Insira seu login para continuar</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome de usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </SafeAreaView>
  );
}

//função do menu principal do app
function Menu({ navigation }) {
  const opcoes = [
      //lista de objetos presentes dentro do menu
    { id: '1', titulo: 'Check Diário' },
    { id: '2', titulo: 'Controle de Finanças' },
  ];
  //monta a tela de menu com conexão ao arquivo de style css
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Navegue Pelo Nosso App</Text>
      {opcoes.map((opcao) => (
        <TouchableOpacity
          key={opcao.id}
          style={styles.movieButton}
          onPress={() => {
            if (opcao.titulo === 'Check Diário') {
              navigation.navigate('CheckDiario');
            } else if (opcao.titulo === 'Controle de Finanças') {
              navigation.navigate('ControleFinanceiro');
            }
          }}
        >
          <Text style={styles.movieTitle}>{opcao.titulo}</Text>
        </TouchableOpacity>
      ))}

      <Image
        source={require('./assets/bobB.png')} 
        style={styles.image}
      />
    </SafeAreaView>
  );
}


