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
      alert("Erro de conexão com o servidor.");
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
    alert("Erro de conexão com o servidor.");
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
    alert("Erro de conexão com o servidor.");
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
    alert("Erro de conexão com o servidor.");
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

  {/* HEADER */}
  <View style={styles.header}>

    <Text style={styles.title}>
      🏥 Almoxarifado Hospitalar
    </Text>

    <Text style={styles.subtitle}>
      Controle inteligente de materiais médicos
    </Text>

  </View>

  {/* CARD DESCRIÇÃO */}
  <View style={styles.infoCard}>

    <Text style={styles.description}>
      Sistema responsável pelo controle
      de estoque hospitalar em tempo real,
      permitindo cadastro, baixa e
      monitoramento de materiais médicos.
    </Text>

  </View>

  {/* FORMULÁRIO */}
  <View style={styles.formContainer}>

    <Text style={styles.sectionTitle}>
      Cadastro de Material
    </Text>

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
        ➕ Cadastrar Material
      </Text>

    </TouchableOpacity>

  </View>

  {/* PESQUISA */}
  <View style={styles.searchContainer}>

    <Text style={styles.sectionTitle}>
      Pesquisa de Materiais
    </Text>

    <TextInput
      testID="input-busca"
      placeholder="Pesquisar material..."
      value={busca}
      onChangeText={setBusca}
      style={styles.input}
    />

  </View>

  {/* DASHBOARD */}
  <Text
    testID="total-itens"
    style={styles.totalItens}
  >
    📦 Total de materiais:
    {" "}
    {materiaisFiltrados.length}
  </Text>

  {/* LOADING */}
  {
    loading &&

    <ActivityIndicator
      size="large"
      color="#2E7D32"
    />
  }

  {/* LISTA */}
  <FlatList

    testID="lista-materiais"

    data={materiaisFiltrados}

    keyExtractor={(item) => item.id}

    showsVerticalScrollIndicator={false}

    renderItem={({ item }) => (

      <View

        style={[

          styles.card,

          Number(item.quantidade) < 10
          &&
          styles.cardCritico

        ]}

        accessibilityLabel={
          Number(item.quantidade) < 10
            ? "estoque-critico"
            : ""
        }

      >

        {/* NOME */}
        <View style={styles.cardHeader}>

          <Text style={styles.materialNome}>
            {item.nome}
          </Text>

        </View>

        {/* QUANTIDADE */}
        <Text style={styles.quantidadeTexto}>
          Quantidade disponível:
          {" "}
          {item.quantidade}
        </Text>

        {/* INPUT RETIRADA */}
        <TextInput

          testID="input-retirada"

          placeholder="Quantidade retirada"

          keyboardType="numeric"

          style={styles.inputRetirada}

          value={retirada[item.id] || ""}

          onChangeText={(texto) =>

            setRetirada({

              ...retirada,

              [item.id]: texto,

            })
          }
        />

        {/* BOTÃO BAIXAR */}
        <TouchableOpacity

          testID="btn-baixar"

          style={styles.botaoBaixar}

          onPress={() =>
            baixarEstoque(item)
          }

        >

          <Text style={styles.buttonText}>
            ➖ Baixar Estoque
          </Text>

        </TouchableOpacity>

        {/* BOTÃO EXCLUIR */}
        <TouchableOpacity

          testID="btn-excluir"

          style={styles.botaoExcluir}

          onPress={() =>
            excluirMaterial(item.id)
          }

        >

          <Text style={styles.buttonText}>
            🗑 Excluir Material
          </Text>

        </TouchableOpacity>

      </View>

    )}
  />

</View>
);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F1F8F4",
    paddingTop: 50,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1,
  },

  description: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    fontSize: 14,
    color: "#4E6E5D",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 3,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    fontSize: 16,
    color: "#263238",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.03,
    shadowRadius: 2,

    elevation: 1,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 22,

    shadowColor: "#2E7D32",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.20,
    shadowRadius: 4,

    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  totalItens: {
    backgroundColor: "#E8F5E9",
    color: "#1B5E20",
    fontSize: 18,
    fontWeight: "bold",
    padding: 14,
    borderRadius: 16,
    textAlign: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,

    borderLeftWidth: 7,
    borderLeftColor: "#43A047",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 3,
  },

  cardCritico: {
    backgroundColor: "#FFF5F5",
    borderLeftColor: "#D32F2F",
  },

  materialNome: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
  },

  quantidadeTexto: {
    fontSize: 15,
    color: "#546E7A",
    marginBottom: 10,
    fontWeight: "500",
  },

  botaoBaixar: {
    backgroundColor: "rgba(46, 125, 50, 0.10)",
    padding: 15,
    borderRadius: 14,
    marginTop: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(46, 125, 50, 0.25)",
  },

  botaoExcluir: {
    backgroundColor: "rgba(211, 47, 47, 0.10)",
    padding: 15,
    borderRadius: 14,
    marginTop: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(211, 47, 47, 0.25)",
  },

  header: {
  marginBottom: 20,
},

subtitle: {
  textAlign: "center",
  color: "#4E6E5D",
  fontSize: 15,
  marginTop: 5,
},

infoCard: {
  backgroundColor: "#FFFFFF",
  padding: 18,
  borderRadius: 18,
  marginBottom: 20,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },

  shadowOpacity: 0.05,
  shadowRadius: 4,

  elevation: 3,
},

formContainer: {
  backgroundColor: "#FFFFFF",
  padding: 18,
  borderRadius: 20,
  marginBottom: 20,
},

searchContainer: {
  backgroundColor: "#FFFFFF",
  padding: 18,
  borderRadius: 20,
  marginBottom: 20,
},

sectionTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#1B5E20",
  marginBottom: 15,
},

cardHeader: {
  marginBottom: 8,
},

inputRetirada: {
  backgroundColor: "#F7FAF8",
  borderRadius: 14,
  padding: 14,
  marginTop: 10,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#DCEEDD",
  fontSize: 15,
},
});
}