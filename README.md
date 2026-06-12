# 📦 Sistema de Controle de Estoque para Laboratório de Enfermagem

## 📖 Sobre o Projeto

Este projeto foi desenvolvido utilizando React Native com o objetivo de modernizar o controle de estoque do laboratório de enfermagem.

Atualmente o controle é realizado por meio de planilhas Excel e anotações em papel, o que pode gerar retrabalho, erros de contagem e dificuldades na atualização em tempo real.

A aplicação permite cadastrar materiais e visualizar o estoque de forma simples, rápida e integrada a uma MockAPI.

---

## 🎯 Objetivos

- Facilitar o cadastro de materiais.
- Permitir a consulta rápida do estoque.
- Reduzir erros de controle manual.
- Centralizar as informações em uma única plataforma.
- Servir como base para futuras funcionalidades de gestão de estoque.

---

## ⚙️ Funcionalidades da Sprint 1

### ✅ Cadastro de Materiais

Permite cadastrar novos materiais informando:

- Nome do material
- Quantidade disponível

### ✅ Consulta de Estoque

Exibe os materiais cadastrados através de uma lista dinâmica.

### ✅ Integração com MockAPI

Utiliza requisições HTTP para comunicação com a API.

### ✅ Atualização Automática

Ao abrir o aplicativo, os dados são carregados automaticamente utilizando o Hook `useEffect`.

### ✅ Interface Mobile

Aplicação desenvolvida para dispositivos móveis utilizando React Native.

---

## 🛠 Tecnologias Utilizadas

- React Native
- JavaScript
- Expo
- MockAPI
- Git
- GitHub

---

## 🏗 Estrutura do Projeto

```
projeto-almoxarifado/
│
├── App.js
├── package.json
├── README.md
├── assets/
└── node_modules/
```

---

## 🔄 Fluxo da Aplicação

1. O usuário abre o aplicativo.
2. O Hook `useEffect` executa automaticamente.
3. É realizada uma requisição GET para a MockAPI.
4. Os materiais são carregados na FlatList.
5. O usuário preenche os campos Nome e Quantidade.
6. Ao clicar em "Cadastrar", é enviada uma requisição POST.
7. A lista é atualizada automaticamente.

---

## 🧪 Test IDs Utilizados

Os componentes obrigatórios foram implementados conforme solicitado pela atividade.

| Componente | testID |
|------------|---------|
| Campo Nome | input-nome |
| Campo Quantidade | input-quantidade |
| Botão Cadastrar | btn-cadastrar |
| Lista de Materiais | lista-materiais |

---

## 📋 Requisitos Atendidos

### Funcionais

- Cadastro de materiais.
- Consulta de estoque.
- Integração com API.
- Atualização automática da lista.

### Técnicos

- Utilização de React Native.
- Utilização de FlatList.
- Utilização de useEffect.
- Integração com MockAPI.
- Implementação dos testID obrigatórios.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/natieledpaula/prova-2b-dev-mobile-natieledpaula.git
```

### 2. Entrar na Pasta do Projeto

```bash
cd nome-do-projeto
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Projeto

```bash
npx expo start
```

### 5. Abrir no Dispositivo

- Expo Go (Android)
- Emulador Android
- Emulador iOS
- Navegador Web

---

## 👩‍💻 Desenvolvedora

**Natiele Nogueira**

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Mobile utilizando React Native.