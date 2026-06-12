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