import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import { validarRetirada } from "./utils/estoque";

export default function App() {
// --- Estados da Aplicação (Os alunos implementarão aqui) ---
// Guarda o nome digitado
const [nome, setNome] = useState('');

// Guarda a quantidade digitada
const [quantidade, setQuantidade] = useState('');

// Guarda os materiais vindos da API
const [materiais, setMateriais] = useState([]);

// Guarda o texto da pesquisa
const [busca, setBusca] = useState('');

// Mostra carregamento enquanto busca dados
const [loading, setLoading] = useState(false);

// Guarda valor digitado na retirada
const [retirada, setRetirada] = useState({
  1: "5",
  2: "10"
});

// URL da MockAPI
const API_URL = 'https://6a18c3b523c3626470ac002f.mockapi.io/api/v1/materiais';

  // --- Funções de Requisição e Efeitos (Os alunos implementarão aqui) ---

  // Busca todos os materiais cadastrados
  const buscarMateriais = async () => {
    try{
      setLoading(true);
      const response = await fetch(API_URL);
      const dados = await response.json();
      setMateriais(dados);
    } catch (erro) {
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

    console.log(erro);

  }

};

// Remove material da API
const excluirMaterial = async (id) => {

  try {

    await fetch(`${API_URL}/${id}`, {

      method: "DELETE",

    });

    // Atualiza lista
    buscarMateriais();

    alert("Material removido!");

  } catch (erro) {

    console.log(erro);

  }
};

// Faz baixa no estoque
const baixarEstoque = async (item) => {

  // Valor digitado
  const quantidadeRetirada =
    retirada[item.id];

  // Validação obrigatória
  const podeRetirar =
    validarRetirada(
      item.quantidade,
      quantidadeRetirada
    );

  // Bloqueia estoque negativo
  if (!podeRetirar) {

    alert("Quantidade inválida!");

    return;
  }

  // Calcula novo estoque
  const novoEstoque =
    Number(item.quantidade) -
    Number(quantidadeRetirada);

  try {

    // Atualiza API
    await fetch(`${API_URL}/${item.id}`, {

      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        nome: item.nome,

        quantidade: novoEstoque,

      }),
    });

    // Atualiza lista
    buscarMateriais();

    alert("Baixa realizada!");

  } catch (erro) {

    console.log(erro);

  }
};

// Filtra materiais conforme pesquisa
const materiaisFiltrados = materiais.filter(
    (item) =>

    item.nome
      .toLowerCase()
      .includes(
        busca.toLowerCase()
      )
);

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

      <TextInput
        testID="input-busca"
        placeholder="Pesquisar material..."
        value={busca}
        onChangeText={setBusca}
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
    
      {
      loading &&
      <ActivityIndicator
        size="large"
        color="#2196F3"
      />
      }

    <FlatList
      testID="lista-materiais"
      data={materiaisFiltrados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (

    <View

  style={[

    styles.card,

    Number(item.quantidade) < 10 &&
      styles.cardCritico

  ]}

  accessibilityLabel={
    Number(item.quantidade) < 10
      ? "estoque-critico"
      : ""
  }>

      <Text style={styles.materialNome}>
        {item.nome}
      </Text>

      <Text>
        Quantidade: {item.quantidade}
      </Text>

      <TextInput
      testID="input-retirada"
      placeholder="Quantidade retirada"
      keyboardType="numeric"
      style={styles.input}
      value={retirada[item.id] || ""}
      onChangeText={(texto) =>
      setRetirada({
      ...retirada,
      [item.id]: texto,
    })
  }
  />

    <TouchableOpacity
    testID="btn-baixar"
    style={styles.botaoBaixar}
    onPress={() => baixarEstoque(item)}>

    <Text style={styles.textoBotao}>
      Baixar Estoque
    </Text>
    </TouchableOpacity>

    <TouchableOpacity
    testID="btn-excluir"
    style={styles.botaoExcluir}
    onPress={() => excluirMaterial(item.id)}>

  <Text style={styles.textoBotao}>
    Excluir
  </Text>
  </TouchableOpacity>
    </View>
)}
/>        
  </View>
);
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1565C0",
  },

  description: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22, // Dá um espaçamento confortável entre as linhas do parágrafo
    marginBottom: 25, // Margem inferior para afastar o texto dos futuros inputs dos alunos
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#BBDEFB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#1976D2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textAlignVertical: "center",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: "#1976D2",
  },

  materialNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 5,
  },

  botaoBaixar: {
    backgroundColor: "rgba(46, 125, 50, 0.15)",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(46, 125, 50, 0.35)",
  },

  botaoExcluir: {
    backgroundColor: "rgba(211, 47, 47, 0.15)",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(211, 47, 47, 0.35)",
  },

  cardCritico: {
    backgroundColor: "#FFEBEE",
    borderLeftColor: "#D32F2F",
    borderLeftWidth: 6,
  },
});