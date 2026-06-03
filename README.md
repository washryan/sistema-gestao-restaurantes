# Sistema de Gestao de Restaurantes

Aplicacao full stack para gestao de restaurante, pensada para demonstracao tecnica, portifolio e entrevista. O foco atual e estabilidade, clareza arquitetural, visual limpo e deploy simples.

## Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- Backend: Spring Boot 3, Java 17, Spring Security, JWT, WebSocket, JPA/Hibernate
- Banco: PostgreSQL em producao, H2 para desenvolvimento local sem Docker
- Deploy: Vercel para frontend e Render para backend + banco

## O que funciona

- Login com JWT
- Dashboard administrativo
- Lista de pedidos em tempo real
- Cadastro e listagem de cardapio
- Estoque basico
- Graficos de vendas e itens populares
- Seed de demonstracao para abrir o sistema ja com dados

## Credenciais de demo

- Usuario: `admin`
- Senha: `123456`

## Rodar localmente

### Opcao 1: mais rapida, com Docker

```powershell
Copy-Item .env.example .env
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

### Opcao 2: desenvolvimento separado

Backend:

```powershell
cd restaurante-backend
$env:SPRING_PROFILES_ACTIVE="dev"
mvn spring-boot:run
```

Frontend:

```powershell
cd restaurante-frontend
$env:BACKEND_INTERNAL_URL="http://localhost:8080"
$env:NEXT_PUBLIC_BACKEND_URL="http://localhost:8080"
npm install
npm run dev
```

## Deploy

### Render

- Importe o arquivo `render.yaml`
- O blueprint cria o PostgreSQL e o backend Docker
- O backend sobe com `SPRING_PROFILES_ACTIVE=prod`
- O banco e os segredos ficam gerenciados pelo Render
- Configure o backend para responder em `/api/menu` como health check
- Guarde a URL publica do backend gerada pelo Render

### Vercel

- Aponte o deploy para `restaurante-frontend`
- Configure as variaveis:
  - `BACKEND_INTERNAL_URL` = URL publica do backend Render
  - `NEXT_PUBLIC_BACKEND_URL` = mesma URL publica do backend Render
- O frontend usa rewrite em `/api/*`, entao nao precisa expor o backend direto no browser para as rotas REST

## O que ainda falta para publicar

- Conta logada no GitHub com acesso ao repositório
- Projeto criado no Render e linkado ao repositório
- Projeto criado no Vercel e linkado ao repositório
- Variaveis de ambiente configuradas nos dois ambientes
- URL publica do backend copiada para o frontend
- Teste final do login e do dashboard em producao

## Passo a passo exato para publicar

1. Fazer push do codigo para o GitHub.
2. Criar o backend no Render usando `render.yaml`.
3. Confirmar a criacao do PostgreSQL no Render.
4. Copiar a URL publica do backend do Render.
5. Criar o frontend no Vercel apontando para `restaurante-frontend`.
6. Configurar `BACKEND_INTERNAL_URL` e `NEXT_PUBLIC_BACKEND_URL` com a URL publica do Render.
7. Fazer um deploy novo no Vercel.
8. Abrir o frontend publicado, fazer login com `admin / 123456`.
9. Validar dashboard, pedidos e atualizacao em tempo real.
10. Se der erro, olhar primeiro logs do Render e depois logs do Vercel.

## Arquitetura em uma frase

O frontend chama a API por rewrites do Next.js, o backend processa autenticaçao, pedidos e estoque, e o PostgreSQL persiste os dados; o WebSocket entrega atualizacoes em tempo real para o dashboard.

## Documentacao complementar

- Arquitetura detalhada: `docs/architecture.md`
- Roteiro de apresentacao: `docs/presentation-script.md`
- Blueprint do Render: `render.yaml`

## Checklist rapido antes da demo

- Backend no Render respondendo com 200 em `/api/menu`
- Frontend no Vercel carregando o login
- Login com `admin / 123456`
- Dashboard abrindo com dados seedados
- WebSocket conectado no painel de pedidos
- Deploy funcionando em navegador anonimo
- Console sem erros criticos
