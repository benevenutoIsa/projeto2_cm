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
      require('./login-success.mp3') 
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
        source={require('./bobB.png')} 
        style={styles.image}
      />
    </SafeAreaView>
  );
}

//função da tela que contem um To Do List com a opção de check 
function TelaToDO() {
  //define os estado do compo da tarefa e guarda na lista
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  //parte que vai fazer essa adição das tarefas na lista
  const adicionarTarefa = () => {
    if (tarefa) {
      setTarefas([...tarefas, { id: Date.now().toString(), texto: tarefa, completa: false }]);
      //çimpa o campo de entrada apos adicionar a nova tarefa 
      setTarefa('');
    } else {
      Alert.alert('Erro', 'Digite uma tarefa para adicionar.');
    }
  };
    //monta a tela de To Do com conexão ao arquivo de style css
  //mostra o espaço para inserir, o botão e exibe em forma de lista 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa"
        value={tarefa}
        onChangeText={setTarefa}
      />
      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.texto}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

//função da tela de controle financeiro
function TelaControleFinanceiro() {
  //define os estados das entradas e serão armazenadas
  const [salario, setSalario] = useState('');
  const [despesa, setDespesa] = useState('');
  const [descricaoDespesa, setDescricaoDespesa] = useState('');
  const [despesas, setDespesas] = useState([]);
  const [saldo, setSaldo] = useState(0);

  //registra o valor inical inserido que é o salario
  const handleRegistrarSalario = () => {
    const salarioConvertido = parseFloat(salario); //converte para float, decimal no caso e faz uma verifição para ver se o valor inserido é valido
    if (!isNaN(salarioConvertido)) {
      setSaldo(salarioConvertido);
      Alert.alert('Sucesso', 'Salário registrado com sucesso!');
      setSalario('');
    } else {
      Alert.alert('Erro', 'Digite um valor de salário válido.');
    }
  };

  //adciona uma despesa
  const handleAdicionarDespesa = () => {
    const despesaConvertida = parseFloat(despesa); //faz a conversão e a mesma verificação do salario
    if (!descricaoDespesa || isNaN(despesaConvertida)) {
      Alert.alert('Erro', 'Digite uma descrição e valor válidos para a despesa.');
      return;
    }
    //adiciona a despesa a lista no formato estabeçecido
    setDespesas([
      ...despesas,
      { id: Date.now().toString(), descricao: descricaoDespesa, valor: despesaConvertida },
    ]);
    //diminui do salario o valor da despesa
    setSaldo((saldoAnterior) => saldoAnterior - despesaConvertida);
    //limpa os campos para a proxima despesa
    setDespesa('');
    setDescricaoDespesa('');
  };
      //monta a tela de controle financeira com conexão ao arquivo de style css
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Controle Financeiro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu salário"
        value={salario}
        onChangeText={setSalario}
        keyboardType="numeric"
      />
      <Button title="Registrar Salário" onPress={handleRegistrarSalario} />
      <Text style={styles.balance}>Saldo Restante: R$ {saldo.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição da despesa"
        value={descricaoDespesa}
        onChangeText={setDescricaoDespesa}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor da despesa"
        value={despesa}
        onChangeText={setDespesa}
        keyboardType="numeric"
      />
      <Button title="Adicionar Despesa" onPress={handleAdicionarDespesa} />
      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{item.descricao}: R$ {item.valor.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

//função responsavel pela navegação entre as paginas
function TabAutenticacao() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={PaginaLogin}
        options={{ headerShown: false, tabBarLabel: 'Login' }}
      />
      <Tab.Screen
        name="Cadastro"
        component={PaginaCadastro}
        options={{ headerShown: false, tabBarLabel: 'Cadastro' }}
      />
    </Tab.Navigator>
  );
}

//define as estrutura principal do aplicativo com todas as paginas e se vai ter um fluxo para voltar ou entrar em outra (headerShown)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Autenticacao" component={TabAutenticacao} />
        <Stack.Screen name="Opcoes" component={Menu} />
        <Stack.Screen name="CheckDiario" component={TelaToDO} options={{ headerShown: true }} />
        <Stack.Screen name="ControleFinanceiro" component={TelaControleFinanceiro} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

