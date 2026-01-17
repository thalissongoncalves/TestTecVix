# Frontend – VM Management Dashboard

Frontend da aplicação de gerenciamento de máquinas virtuais (VMs), desenvolvido em React, como parte do desafio técnico.

A aplicação permite autenticação de usuários, visualização de VMs, criação de novas VMs e execução de ações básicas como start e pause.

---

## 🧰 Tecnologias Utilizadas

- React + TypeScript
- Vite
- Material UI (MUI)
- Zustand (gerenciamento de estado)
- React Router DOM
- i18n (internacionalização)
- Axios
- JWT (autenticação via backend)

---

## ⚙️ Pré-requisitos

- Node.js >= 18
- Backend da aplicação rodando localmente

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente

- Crie um arquivo .env baseado no .env.example:
VITE_BASE_URL=http://localhost:3001/api/v1

### 3. Rodar o projeto

- npm run dev

### Autenticação

- A aplicação utiliza autenticação JWT fornecida pelo backend.
É necessário realizar login para acessar as funcionalidades protegidas.
- Usuários de teste podem ser encontrados no README do backend.

### Funcionalidades Implementadas

- Login e registro de usuários
- Proteção de rotas autenticadas
- Listagem de máquinas virtuais
- Criação de novas VMs
- Start e pause de VMs
- Gráficos de uso de CPU e memória (dados mockados)
- Seleção de sistema operacional via dropdown
- Integração completa com o backend

### Observações

- Algumas funcionalidades avançadas descritas no desafio não foram implementadas por limitação de tempo.
- O foco foi garantir integração correta frontend ↔ backend, validações e fluxo funcional completo.