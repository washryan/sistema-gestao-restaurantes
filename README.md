# Sistema de Gestão de Restaurantes

Aplicação full stack para demonstração técnica, feita para rodar localmente com PostgreSQL, backend Java Spring Boot e frontend Next.js.

## Objetivo

- Abrir o sistema rapidamente
- Fazer login com um usuário demo
- Mostrar dashboard, pedidos, cardápio e estoque
- Demonstrar integração frontend + backend
- Apresentar arquitetura de forma clara para recrutadores

## Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- Backend: Spring Boot 3, Java 17, Spring Security, JWT, WebSocket, JPA/Hibernate
- Banco: PostgreSQL local via Docker Compose
- UI: componentes leves e responsivos para demo

## O que funciona

- Login com JWT
- Dashboard com cards, gráficos e pedidos
- Seed automática com dados de demonstração
- API REST para menu, pedidos, estoque e analytics
- Atualização em tempo real dos pedidos

## Credenciais de demo

- Usuário: `admin@restaurante.com`
- Senha: `123456`

## Como rodar localmente

### Opção recomendada: tudo com Docker

```powershell
Copy-Item .env.example .env
docker compose down -v
docker compose up --build
```

URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`
- PostgreSQL: `localhost:5432`

### Verificação rápida

- Abrir `http://localhost:3000/login`
- Fazer login com `admin@restaurante.com / 123456`
- Abrir o dashboard
- Conferir pedidos, menu, estoque e gráficos

## Variáveis de ambiente

O arquivo `.env.example` já traz os valores usados no Docker Compose.

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `SPRING_JPA_HIBERNATE_DDL_AUTO`
- `APP_JWT_SECRET`
- `APP_JWT_EXPIRATION_IN_MS`
- `APP_CORS_ALLOWED_ORIGINS`
- `BACKEND_INTERNAL_URL`
- `NEXT_PUBLIC_BACKEND_URL`

## Arquitetura simples

O frontend acessa a API por `/api/*`, o Next faz rewrite para o backend, o backend aplica autenticação JWT e grava dados no PostgreSQL. O WebSocket atualiza os pedidos em tempo real.

## Roteiro de apresentação

1. Mostrar a tela de login.
2. Entrar com o usuário demo.
3. Abrir o dashboard.
4. Explicar que os dados vêm do backend e do PostgreSQL.
5. Mostrar os pedidos em tempo real.
6. Abrir menu e estoque.
7. Fechar explicando arquitetura e decisões técnicas.

## Checklist antes da demo

- `docker compose up --build` funcionando
- Se trocou senha/variáveis antes, rodar `docker compose down -v` uma vez para recriar o volume do Postgres
- Login abrindo sem erro
- Dashboard carregando com seed
- `/api/menu` respondendo
- `/api/orders` respondendo com autenticação
- Logs sem erro crítico no navegador
