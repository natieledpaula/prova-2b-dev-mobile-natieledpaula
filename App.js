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
      <View style={styles.header}>
        <Text style={styles.title}>Almoxarifado Hospitalar</Text>
        <Text style={styles.subtitle}>
          Controle de materiais médicos e estoque
        </Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardLabel}>Materiais cadastrados</Text>
        <Text testID="total-itens" style={styles.dashboardNumber}>
          {materiaisFiltrados.length}
        </Text>
        <Text style={styles.dashboardText}>Itens disponíveis no sistema</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cadastro de Material</Text>

        <TextInput
          testID="input-nome"
          placeholder="Digite o nome do material"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholderTextColor="#8A98A8"
        />

        <TextInput
          testID="input-quantidade"
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
          style={styles.input}
          placeholderTextColor="#8A98A8"
        />

        <TouchableOpacity
          testID="btn-cadastrar"
          style={styles.primaryButton}
          onPress={cadastrarMaterial}
        >
          <Text style={styles.primaryButtonText}>Cadastrar Material</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pesquisar Material</Text>

        <TextInput
          testID="input-busca"
          placeholder="Buscar por nome..."
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
          placeholderTextColor="#8A98A8"
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0F766E" />}

      <FlatList
        testID="lista-materiais"
        data={materiaisFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              Number(item.quantidade) < 10 && styles.cardCritico,
            ]}
            accessibilityLabel={
              Number(item.quantidade) < 10 ? "estoque-critico" : ""
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.materialNome}>{item.nome}</Text>

              <Text
                style={[
                  styles.statusBadge,
                  Number(item.quantidade) < 10 && styles.statusCritico,
                ]}
              >
                {Number(item.quantidade) < 10 ? "Crítico" : "Normal"}
              </Text>
            </View>

            <Text style={styles.quantidadeTexto}>Quantidade disponível</Text>

            <Text style={styles.quantidadeNumero}>{item.quantidade}</Text>

            <TextInput
              testID="input-retirada"
              placeholder="Quantidade para retirada"
              keyboardType="numeric"
              style={styles.inputRetirada}
              value={retirada[item.id] || ""}
              onChangeText={(texto) =>
                setRetirada({
                  ...retirada,
                  [item.id]: texto,
                })
              }
              placeholderTextColor="#8A98A8"
            />

            <TouchableOpacity
              testID="btn-baixar"
              style={styles.secondaryButton}
              onPress={() => baixarEstoque(item)}
            >
              <Text style={styles.secondaryButtonText}>Baixar Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="btn-excluir"
              style={styles.dangerButton}
              onPress={() => excluirMaterial(item.id)}
            >
              <Text style={styles.dangerButtonText}>Excluir Material</Text>
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
    backgroundColor: "#F4F7FB",
    paddingTop: 50,
    paddingHorizontal: 18,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#102A43",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#627D98",
    textAlign: "center",
    marginTop: 6,
  },

  dashboardCard: {
    backgroundColor: "#0F766E",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  dashboardLabel: {
    color: "#CCFBF1",
    fontSize: 14,
    fontWeight: "600",
  },

  dashboardNumber: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 4,
  },

  dashboardText: {
    color: "#E0F2F1",
    fontSize: 14,
    marginTop: 4,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#102A43",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#102A43",
    marginBottom: 12,
  },

  primaryButton: {
    backgroundColor: "#0F766E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderLeftWidth: 6,
    borderLeftColor: "#0F766E",
    elevation: 2,
  },

  cardCritico: {
    borderLeftColor: "#DC2626",
    backgroundColor: "#FFF7F7",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  materialNome: {
    fontSize: 19,
    fontWeight: "800",
    color: "#102A43",
    flex: 1,
  },

  statusBadge: {
    backgroundColor: "#D1FAE5",
    color: "#047857",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "700",
  },

  statusCritico: {
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
  },

  quantidadeTexto: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 14,
  },

  quantidadeNumero: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 12,
  },

  inputRetirada: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 13,
    fontSize: 15,
    color: "#102A43",
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#99F6E4",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  secondaryButtonText: {
    color: "#0F766E",
    fontSize: 15,
    fontWeight: "700",
  },

  dangerButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  dangerButtonText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "700",
  },
});