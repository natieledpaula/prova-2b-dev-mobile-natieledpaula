# 📦 Sistema de Controle de Estoque para Laboratório de Enfermagem

## 📖 Sobre o Projeto

Este projeto foi desenvolvido utilizando React Native com o objetivo de modernizar o controle de estoque do laboratório de enfermagem.

Atualmente o controle é realizado por meio de planilhas Excel e anotações em papel, o que pode gerar retrabalho, erros de contagem e dificuldades na atualização em tempo real.

A aplicação permite cadastrar materiais, visualizar o estoque, realizar baixas de produtos e excluir itens de forma simples, rápida e integrada a uma MockAPI.

---

# 🎯 Objetivos

- Facilitar o cadastro de materiais
- Permitir a consulta rápida do estoque
- Registrar baixas de materiais
- Impedir estoque negativo
- Permitir exclusão de materiais
- Reduzir erros de controle manual
- Centralizar as informações em uma única plataforma
- Servir como base para futuras funcionalidades de gestão de estoque

---

# ⚙️ Funcionalidades da Sprint 1

## ✅ Cadastro de Materiais

Permite cadastrar novos materiais informando:

- Nome do material
- Quantidade disponível

---

## ✅ Consulta de Estoque

Exibe os materiais cadastrados através de uma lista dinâmica utilizando FlatList.

---

## ✅ Integração com MockAPI

Utiliza requisições HTTP para comunicação com a API.

---

## ✅ Atualização Automática

Ao abrir o aplicativo, os dados são carregados automaticamente utilizando o Hook `useEffect`.

---

## ✅ Interface Mobile

Aplicação desenvolvida para dispositivos móveis utilizando React Native.

---

# ⚙️ Funcionalidades da Sprint 2

## ✅ Baixa de Estoque

Permite retirar materiais do estoque diretamente na lista.

O usuário informa a quantidade retirada e o sistema atualiza automaticamente o valor no servidor através de requisição PUT.

---

## ✅ Validação de Estoque

Foi implementada a função:

```js
validarRetirada(estoqueAtual, quantidadeRetirada)
```

Essa função impede:

- Retirada maior que o estoque disponível
- Valores negativos
- Valores inválidos

---

## ✅ Exclusão de Materiais

Permite excluir permanentemente um item do estoque através de requisição DELETE na MockAPI.

---

## ✅ Atualização Dinâmica

Após cadastrar, excluir ou realizar baixa de estoque, a lista é atualizada automaticamente.

---

## ✅ Melhorias Visuais

A interface recebeu melhorias de estilização:

- Cards modernos
- Botões personalizados
- Cores suaves
- Transparência nos botões
- Layout mais organizado
- Visual inspirado em sistemas hospitalares

---

# 🛠 Tecnologias Utilizadas

- React Native
- JavaScript
- Expo
- MockAPI
- Git
- GitHub

---

# 🏗 Estrutura do Projeto

```txt
projeto-almoxarifado/
│
├── App.js
├── utils/
│   └── estoque.js
├── package.json
├── README.md
├── assets/
└── node_modules/
```

---

# 🔄 Fluxo da Aplicação

## 📥 Carregamento Inicial

1. O usuário abre o aplicativo
2. O Hook `useEffect` executa automaticamente
3. É realizada uma requisição GET para a MockAPI
4. Os materiais são carregados na FlatList

---

## ➕ Cadastro de Material

1. O usuário preenche Nome e Quantidade
2. Ao clicar em "Cadastrar":
   - É realizada uma requisição POST
3. A lista é atualizada automaticamente

---

## ➖ Baixa de Estoque

1. O usuário informa a quantidade retirada
2. O sistema executa:

```js
validarRetirada()
```

3. Caso válido:
   - O estoque é atualizado
   - É realizada uma requisição PUT
4. A interface atualiza automaticamente

---

## ❌ Exclusão de Material

1. O usuário pressiona "Excluir"
2. É realizada uma requisição DELETE
3. O item é removido da MockAPI
4. A lista é atualizada automaticamente

---

# 🧪 Test IDs Utilizados

Os componentes obrigatórios foram implementados conforme solicitado pela atividade.

| Componente           | testID           |
| -------------------- | ---------------- |
| Campo Nome           | input-nome       |
| Campo Quantidade     | input-quantidade |
| Botão Cadastrar      | btn-cadastrar    |
| Lista de Materiais   | lista-materiais  |
| Campo Retirada       | input-retirada   |
| Botão Baixar Estoque | btn-baixar       |
| Botão Excluir        | btn-excluir      |

---

# 📋 Requisitos Atendidos

## Funcionais

- Cadastro de materiais
- Consulta de estoque
- Baixa de materiais
- Exclusão de materiais
- Atualização automática
- Validação de retirada

---

## Técnicos

- Utilização de React Native
- Utilização de FlatList
- Utilização de useEffect
- Integração com MockAPI
- Requisições GET
- Requisições POST
- Requisições PUT
- Requisições DELETE
- Implementação dos testID obrigatórios
- Função pura validarRetirada

---

# 🚀 Como Executar o Projeto

## 1. Clonar o Repositório

```bash
git clone https://github.com/natieledpaula/prova-2b-dev-mobile-natieledpaula.git
```

---

## 2. Entrar na Pasta do Projeto

```bash
cd prova-2b-dev-mobile-natieledpaula
```

---

## 3. Instalar Dependências

```bash
npm install
```

---

## 4. Executar o Projeto

```bash
npx expo start
```

---

## 5. Abrir no Dispositivo

- Expo Go (Android)
- Emulador Android
- Emulador iOS
- Navegador Web

---

# 👩‍💻 Desenvolvedora

**Natiele Nogueira**

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Mobile utilizando React Native.