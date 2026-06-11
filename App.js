import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  // --- Estados da Aplicação (Os alunos implementarão aqui) ---
  // Guarda o nome digitado
const [nome, setNome] = useState('');

// Guarda a quantidade digitada
const [quantidade, setQuantidade] = useState('');

// Guarda os materiais vindos da API
const [materiais, setMateriais] = useState([]);

// Mostra carregamento enquanto busca dados
const [loading, setLoading] = useState(false);

// URL da MockAPI
const API_URL = 'https://6a18c3b523c3626470ac002f.mockapi.io/api/v1/:endpoint';

  // --- Funções de Requisição e Efeitos (Os alunos implementarão aqui) ---

  // Busca todos os materiais cadastrados
  const buscarMateriais = async () => {
    try{
      setLoading(true);
      const response = await fetch(API_URL);
      const dados = await response.json();
      setMateriais(dados);
    } catch (error) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  };

  // Executa automaticamente quando a tela abre
  // e chama a função que busca os materiais
  useEffect(() => {

    buscarMateriais();

  }, []);

  // Cadastra um novo material na API
  const cadastrarMaterial = async () => {

    // Valida se os campos estão preenchidos
  if (!nome || !quantidade) {

    alert('Preencha todos os campos');
    return;

  }

  // Tenta enviar os dados para a API
  try {

    // Cria um objeto com os dados do novo material
    const novoMaterial = {

      nome,
      quantidade

    };

    // Envia os dados para a API
    await fetch(API_URL, {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(novoMaterial)

    });

    setNome('');
    setQuantidade('');

    buscarMateriais();

  } catch (erro) {

    console.log(error);

  }

};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>
      
      {/* Breve descrição do projeto inserida abaixo */}
      <Text style={styles.description}>
        Este template servirá para desenvolver o projeto responsável por modernizar o controle de insumos médicos do almoxarifado. 
        Através desta interface conectada à API, é possível realizar o inventário em tempo real, cadastrar novos materiais e registrar baixas de estoque de forma ágil e segura.
      </Text>

      {/* Os alunos vão construir os componentes visuais das Sprints aqui dentro */}
      <TextInput
        testID="input-nome"
        placeholder="Nome do Material"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        testID="input-quantidade"
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
      />

      <TouchableOpacity
        testID="btn-cadastrar"
        style={styles.button}
        onPress={cadastrarMaterial}
      >
        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Reduzido ligeiramente para aproximar o texto explicativo
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20, // Dá um espaçamento confortável entre as linhas do parágrafo
    marginBottom: 30, // Margem inferior para afastar o texto dos futuros inputs dos alunos
  }
});