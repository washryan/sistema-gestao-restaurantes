# 🍽️ Sistema de Gestão de Restaurantes

Sistema completo de gestão para restaurantes, com **frontend em Next.js + React 19** e **backend em Spring Boot 3**, ambos containerizados com Docker para facilitar execução e deploy. O sistema possui funcionalidades como controle de pedidos, inventário, cardápio e painel administrativo com gráficos.

---

## 📸 Demonstração

> 🔗 **Frontend em produção:** [https://restaurante-demo.vercel.app](https://restaurante-demo.vercel.app)  
> *(Substitua esse link quando fizer o deploy real)*

![Tela inicial](./docs/demo1.png)  
![Painel administrativo](./docs/demo2.png)

---

## 🔧 Tecnologias Utilizadas

### 🧠 Backend – Spring Boot 3.1.5
- **Java 17**
- **Spring Boot Starter Web** – APIs REST
- **Spring Boot Starter Data JPA** – persistência com Hibernate
- **Spring Boot Starter Security** – autenticação e segurança
- **JWT (JJWT)** – autenticação baseada em tokens
- **Spring Boot Starter WebSocket** – comunicação em tempo real
- **Springdoc OpenAPI** – documentação automática (Swagger)
- **H2 Database** – banco de dados em memória para testes
- **Lombok** – redução de boilerplate no código
- **JUnit & Mockito** – testes automatizados
- **Maven** – gerenciamento de dependências
- **Docker** – containerização da aplicação

### 🎨 Frontend – Next.js 15.1.2 + React 19
- **React 19 + Next.js 15** – SPA com SSR/SSG
- **Tailwind CSS** – utilitários de estilo modernos
- **Axios** – requisições HTTP
- **Recharts** – gráficos dinâmicos
- **STOMP.js** – WebSocket com SockJS/STOMP
- **Lucide + Heroicons** – ícones vetoriais modernos
- **Radix UI** – componentes acessíveis e estilizados
- **TypeScript** – tipagem estática e escalabilidade
- **ESLint + Prettier** – padronização de código
- **Docker (multi-stage build)** – build otimizado para produção

---

## 🚀 Como executar localmente

### Pré-requisitos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Execução

```bash
#### Clone o repositório
git clone https://github.com/seu-usuario/sistema-gestao-restaurantes.git
cd sistema-gestao-restaurantes

# Inicie os serviços
docker-compose up --build
```

# 📂 Estrutura do Projeto
```bash
/
├── restaurante-backend/      # Backend em Spring Boot
├── restaurante-frontend/     # Frontend em Next.js + React
├── docker-compose.yml        # Orquestração dos serviços
└── README.md                 # Documentação do projeto
```

