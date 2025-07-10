# NLW Agents - Back-end

Projeto desenvolvido durante a imersão da Rocketseat.

## Tecnologias Utilizadas
- Node.js
- TypeScript
- Drizzle ORM
- Docker

## Padrões de Projeto
- Organização por módulos (`src/db`, `src/http`, `src/schema`)
- Separação de responsabilidades (conexão, rotas, schema)
- Uso de variáveis de ambiente

## Guia Básico de Setup

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repositorio-backend>
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Renomeie `.env.example` para `.env` e ajuste conforme necessário (se existir).
4. **Inicie o banco de dados e o servidor:**
   ```sh
   docker-compose up -d
   npm run dev
   ```

## Estrutura do Projeto

```
src/
  db/         # Conexão e migrações do banco
  http/       # Rotas HTTP
  schema/     # Schemas do banco
```

---
Rocketseat ©
