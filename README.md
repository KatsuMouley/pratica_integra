# 🍕 Delivery API - Sistema Refatorado em MVC

Um sistema de pedidos de delivery refatorado com **arquitetura MVC**, separação de responsabilidades e boas práticas de código.

## 📋 Diferenças da Solução Original

✨ **Melhorias implementadas:**
- ✅ Validação robusta com email e telefone
- ✅ Mais campos no pedido (email, telefone, endereço, quantidade)
- ✅ Múltiplos status de pedidos (pendente → confirmado → preparando → enviado → entregue)
- ✅ Camada de Models com validações
- ✅ Melhor tratamento de erros com mensagens detalhadas
- ✅ Rota de estatísticas
- ✅ Método DELETE para remover pedidos
- ✅ Endpoints RESTful mais completos
- ✅ Timestamps em todas as operações

## 🏗️ Estrutura do Projeto

```
delivery-api/
├── app.js                      # Inicializa Express e registra rotas
├── routes/
│   └── pedidosRoutes.js       # Define as rotas HTTP
├── controllers/
│   └── pedidosController.js   # Intermediária rota ↔ service
├── services/
│   └── pedidosService.js      # Lógica de negócio
├── models/
│   └── Pedido.js              # Modelo com validações
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

## 🎯 Responsabilidades por Camada

| Camada | Responsabilidade | Exemplo |
|--------|------------------|---------|
| **Routes** | Definir endpoints HTTP | `GET /api/pedidos`, `POST /api/pedidos` |
| **Controllers** | Receber requisição e chamar service | Validação de ID, tratamento de erros |
| **Services** | Regras de negócio | Lógica de cancelamento, validações |
| **Models** | Estrutura e validações de dados | Classe Pedido com métodos de validação |

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### GET /api/health
Verifica se a API está rodando
```bash
curl http://localhost:3000/api/health
```

### GET /api/pedidos
Lista todos os pedidos (exceto cancelados)
```bash
curl http://localhost:3000/api/pedidos

# Com filtro de status
curl "http://localhost:3000/api/pedidos?status=confirmado"
```

### GET /api/pedidos/:id
Obter um pedido específico
```bash
curl http://localhost:3000/api/pedidos/1
```

### POST /api/pedidos
Criar um novo pedido

**Body (JSON):**
```json
{
  "cliente": "João Silva",
  "email": "joao@example.com",
  "telefone": "11987654321",
  "item": "Pizza Margherita",
  "quantidade": 2,
  "valor": 45.50,
  "endereco": "Rua das Flores, 123 - Apto 45"
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "João Silva",
    "email": "joao@example.com",
    "telefone": "11987654321",
    "item": "Pizza Margherita",
    "quantidade": 2,
    "valor": 45.50,
    "endereco": "Rua das Flores, 123 - Apto 45"
  }'
```

### PUT /api/pedidos/:id
Atualizar status do pedido

**Body (JSON):**
```json
{
  "status": "preparando"
}
```

Status válidos: `pendente`, `confirmado`, `preparando`, `enviado`, `entregue`, `cancelado`

### PUT /api/pedidos/:id/cancelar
Cancelar um pedido específico
```bash
curl -X PUT http://localhost:3000/api/pedidos/1/cancelar
```

### DELETE /api/pedidos/:id
Deletar um pedido (apenas se cancelado)
```bash
curl -X DELETE http://localhost:3000/api/pedidos/1
```

### GET /api/pedidos/stats/resumo
Obter estatísticas dos pedidos
```bash
curl http://localhost:3000/api/pedidos/stats/resumo
```

## ✅ Validações Implementadas

### No Modelo (Pedido.js)
- ✅ Cliente: obrigatório, não-vazio
- ✅ Email: formato válido de email
- ✅ Telefone: 11 dígitos (formato brasileiro)
- ✅ Item: obrigatório, não-vazio
- ✅ Quantidade: número > 0
- ✅ Valor: mínimo R$ 10,00
- ✅ Endereço: obrigatório, mínimo 5 caracteres

## 🧪 Testando com Thunder Client

### Teste 1: Criar pedido válido ✅
```
POST http://localhost:3000/api/pedidos
Status esperado: 201
```

### Teste 2: Criar pedido sem cliente ❌
```
POST http://localhost:3000/api/pedidos
{
  "email": "test@test.com",
  "telefone": "11987654321",
  "item": "Pizza",
  "quantidade": 1,
  "valor": 25.00,
  "endereco": "Rua A"
}
Status esperado: 400 - "Cliente é obrigatório"
```

### Teste 3: Listar pedidos
```
GET http://localhost:3000/api/pedidos
Status esperado: 200
```

### Teste 4: Cancelar pedido
```
PUT http://localhost:3000/api/pedidos/1/cancelar
Status esperado: 200
```

### Teste 5: Obter estatísticas
```
GET http://localhost:3000/api/pedidos/stats/resumo
Status esperado: 200
```

## 🎓 Conceitos Aprendidos

- ✅ Separação de Responsabilidades (SoC)
- ✅ Padrão MVC
- ✅ Validação em múltiplas camadas
- ✅ Tratamento de erros estruturado
- ✅ REST API design
- ✅ Singleton pattern (PedidosService)
- ✅ Classes e POO em Node.js
- ✅ Middleware e rotas no Express

## 📝 Notas Importantes

1. **Dados em memória**: Os pedidos são armazenados em RAM. Ao reiniciar o servidor, são perdidos.
2. **Sem banco de dados**: Para produção, integrar com MongoDB, PostgreSQL, etc.
3. **Sem autenticação**: Implementar JWT ou OAuth para segurança.
4. **Sem paginação**: Em produção, adicionar limite de registros por página.

## 🚀 Melhorias Futuras

- [ ] Integrar com banco de dados real
- [ ] Adicionar autenticação JWT
- [ ] Implementar paginação
- [ ] Adicionar logs estruturados
- [ ] Testes automatizados (Jest, Mocha)
- [ ] Documentação Swagger/OpenAPI
- [ ] Rate limiting
- [ ] CORS configurável

---

**Desenvolvido como exercício de refatoração MVC** 🎯
"# pratica_integra" 
