# ✅ CHECKLIST DE TESTES - Delivery API

## 🎯 Testes Obrigatórios (Conforme Exercício Original)

### ☐ POST /api/pedidos (Criar Pedido)
**Esperado:** 201 + pedido criado com id e status "pendente"

```json
POST http://localhost:3000/api/pedidos
Content-Type: application/json

{
  "cliente": "João Silva",
  "email": "joao@example.com",
  "telefone": "11987654321",
  "item": "Pizza Margherita",
  "quantidade": 1,
  "valor": 35.90,
  "endereco": "Rua A, 100"
}
```

**Resposta esperada:**
- Status: **201**
- ID gerado automaticamente: ✅
- Status: **"pendente"**: ✅

---

### ☐ POST /api/pedidos (Sem Campo Obrigatório)
**Esperado:** 400 + mensagem de erro

```json
POST http://localhost:3000/api/pedidos
Content-Type: application/json

{
  "email": "joao@example.com",
  "telefone": "11987654321",
  "item": "Pizza Margherita",
  "quantidade": 1,
  "valor": 35.90,
  "endereco": "Rua A, 100"
}
```

**Resposta esperada:**
- Status: **400**
- Mensagem: "Cliente é obrigatório" ✅

---

### ☐ GET /api/pedidos (Listar Todos)
**Esperado:** 200 + lista de pedidos + totalGeral

```
GET http://localhost:3000/api/pedidos
```

**Resposta esperada:**
- Status: **200**
- Array de `pedidos`: ✅
- Campo `resumo.totalGeral`: ✅
- Pedidos cancelados NÃO aparecem: ✅

---

### ☐ PUT /api/pedidos/1/cancelar (Cancelar)
**Esperado:** 200 + pedido com status "cancelado"

```
PUT http://localhost:3000/api/pedidos/1/cancelar
```

**Resposta esperada:**
- Status: **200**
- Status do pedido: **"cancelado"** ✅

---

### ☐ GET /api/pedidos (Após Cancelamento)
**Esperado:** 200 + pedido cancelado não aparece na lista

```
GET http://localhost:3000/api/pedidos
```

**Resposta esperada:**
- Pedido cancelado NÃO aparece no array: ✅
- `totalGeral` não inclui pedido cancelado: ✅

---

## 🌟 Testes Adicionais (Melhorias da Solução)

### ☐ GET /api/pedidos/:id (Obter um Pedido)
**Esperado:** 200 + pedido completo OU 404 se não existir

```
GET http://localhost:3000/api/pedidos/1
```

**Resposta esperada:**
- Status: **200**
- Todos os campos do pedido: ✅

```
GET http://localhost:3000/api/pedidos/999
```

**Resposta esperada:**
- Status: **404**
- Mensagem: "Pedido #999 não encontrado" ✅

---

### ☐ PUT /api/pedidos/1 (Atualizar Status)
**Esperado:** 200 + status atualizado

```json
PUT http://localhost:3000/api/pedidos/1
Content-Type: application/json

{
  "status": "confirmado"
}
```

**Resposta esperada:**
- Status: **200**
- Novo status: **"confirmado"** ✅

---

### ☐ Validação de Email (POST)
**Esperado:** 400 + erro de email

```json
POST http://localhost:3000/api/pedidos

{
  "cliente": "João",
  "email": "email-invalido",
  "telefone": "11987654321",
  "item": "Pizza",
  "quantidade": 1,
  "valor": 35.90,
  "endereco": "Rua A, 100"
}
```

**Resposta esperada:**
- Status: **400**
- Erro: "Email inválido" ✅

---

### ☐ Validação de Telefone (POST)
**Esperado:** 400 + erro de telefone

```json
POST http://localhost:3000/api/pedidos

{
  "cliente": "João",
  "email": "joao@example.com",
  "telefone": "123",
  "item": "Pizza",
  "quantidade": 1,
  "valor": 35.90,
  "endereco": "Rua A, 100"
}
```

**Resposta esperada:**
- Status: **400**
- Erro: "Telefone inválido (formato: 11999999999)" ✅

---

### ☐ Validação de Valor Mínimo (POST)
**Esperado:** 400 + erro de valor

```json
POST http://localhost:3000/api/pedidos

{
  "cliente": "João",
  "email": "joao@example.com",
  "telefone": "11987654321",
  "item": "Água",
  "quantidade": 1,
  "valor": 2.50,
  "endereco": "Rua A, 100"
}
```

**Resposta esperado:**
- Status: **400**
- Erro: "Valor mínimo do pedido é R$ 10,00" ✅

---

### ☐ Validação de Endereço (POST)
**Esperado:** 400 + erro de endereço

```json
POST http://localhost:3000/api/pedidos

{
  "cliente": "João",
  "email": "joao@example.com",
  "telefone": "11987654321",
  "item": "Pizza",
  "quantidade": 1,
  "valor": 35.90,
  "endereco": "Rua"
}
```

**Resposta esperado:**
- Status: **400**
- Erro: "Endereço é obrigatório e deve ter pelo menos 5 caracteres" ✅

---

### ☐ GET /api/pedidos?status=confirmado (Filtro por Status)
**Esperado:** 200 + apenas pedidos com status "confirmado"

```
GET http://localhost:3000/api/pedidos?status=confirmado
```

**Resposta esperada:**
- Status: **200**
- Apenas pedidos com status "confirmado": ✅

---

### ☐ Transição de Status
**Esperado:** Mudar status seguindo: pendente → confirmado → preparando → enviado → entregue

```
1. PUT /api/pedidos/1 com {"status": "confirmado"} → ✅
2. PUT /api/pedidos/1 com {"status": "preparando"} → ✅
3. PUT /api/pedidos/1 com {"status": "enviado"} → ✅
4. PUT /api/pedidos/1 com {"status": "entregue"} → ✅
```

---

### ☐ Não Pode Alterar Pedido Entregue
**Esperado:** 400 + erro

```json
PUT http://localhost:3000/api/pedidos/1
{"status": "cancelado"}
```

**Resposta esperada:**
- Status: **400**
- Erro: "Não é possível alterar um pedido já entregue" ✅

---

### ☐ Não Pode Cancelar Pedido Enviado
**Esperado:** 400 + erro

```
PUT http://localhost:3000/api/pedidos/2/cancelar
```

**Resposta esperada:**
- Status: **400**
- Erro: "Não é possível cancelar um pedido que já foi enviado" ✅

---

### ☐ GET /api/pedidos/stats/resumo (Estatísticas)
**Esperado:** 200 + estatísticas completas

```
GET http://localhost:3000/api/pedidos/stats/resumo
```

**Resposta esperada:**
- `totalPedidos`: número total de pedidos ✅
- `pedidosAtivos`: pedidos não cancelados ✅
- `pedidosCancelados`: apenas cancelados ✅
- `porStatus`: objeto com contagem por status ✅
- `totalRecebido`: soma de valores ✅

---

### ☐ DELETE /api/pedidos/:id (Deletar Pedido Cancelado)
**Esperado:** 200 + mensagem de sucesso

```
DELETE http://localhost:3000/api/pedidos/1
```

**Resposta esperada:**
- Status: **200**
- Mensagem: "Pedido #1 foi removido" ✅

---

### ☐ Não Pode Deletar Pedido Ativo
**Esperado:** 400 + erro

```
DELETE http://localhost:3000/api/pedidos/2
```

**Resposta esperada:**
- Status: **400**
- Erro: "Apenas pedidos cancelados podem ser deletados" ✅

---

### ☐ GET /api/health (Health Check)
**Esperado:** 200 + status "API rodando"

```
GET http://localhost:3000/api/health
```

**Resposta esperada:**
- Status: **200**
- Status: "API rodando" ✅

---

### ☐ GET / (Raiz)
**Esperado:** 200 + informações da API

```
GET http://localhost:3000/
```

**Resposta esperada:**
- Status: **200**
- Lista de endpoints ✅
- Versão da API ✅

---

### ☐ GET /rota-inexistente (404)
**Esperado:** 404 + erro

```
GET http://localhost:3000/api/nao-existe
```

**Resposta esperada:**
- Status: **404**
- Erro: "Rota não encontrada" ✅

---

## 📊 Resumo do Progresso

| Teste | Status | Observações |
|-------|--------|-------------|
| Criar pedido válido | ☐ | |
| Criar sem campo obrigatório | ☐ | |
| Listar todos | ☐ | |
| Cancelar pedido | ☐ | |
| Cancelado não aparece na lista | ☐ | |
| Obter pedido por ID | ☐ | |
| ID não encontrado | ☐ | |
| Atualizar status | ☐ | |
| Validação de email | ☐ | |
| Validação de telefone | ☐ | |
| Validação de valor mínimo | ☐ | |
| Validação de endereço | ☐ | |
| Filtrar por status | ☐ | |
| Transição de status | ☐ | |
| Não alterar entregue | ☐ | |
| Não cancelar enviado | ☐ | |
| Estatísticas | ☐ | |
| Deletar cancelado | ☐ | |
| Não deletar ativo | ☐ | |
| Health check | ☐ | |
| Raiz da API | ☐ | |
| Rota não existente | ☐ | |

**Total de Testes:** 22
**Testes Passando:** ☐ / 22

---

## 🚀 Como Testar

### Opção 1: Thunder Client (Recomendado)
1. Instalar extensão Thunder Client no VS Code
2. Criar nova requisição
3. Copiar URL e body dos exemplos acima
4. Enviar e validar resposta

### Opção 2: cURL no Terminal
```bash
# Exemplo: criar pedido
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "João",
    "email": "joao@example.com",
    "telefone": "11987654321",
    "item": "Pizza",
    "quantidade": 1,
    "valor": 35.90,
    "endereco": "Rua A, 100"
  }'
```

### Opção 3: Postman
1. Importar a coleção EXEMPLOS_REQUISICOES.md
2. Executar teste por teste
3. Validar respostas

---

## ✅ Todos os Testes Passando?

Parabéns! 🎉 A refatoração MVC foi um sucesso!

Se algum teste falhar, verificar:
1. Servidor rodando? `npm start`
2. Porta correta? `http://localhost:3000`
3. Headers corretos? `Content-Type: application/json`
4. Body válido? Copiar do exemplo

---

**Desenvolvido para validar a refatoração MVC** ✅
