# EXEMPLOS DE REQUISIÇÕES - Delivery API

## 📌 URLs Base
- Produção: http://localhost:3000

---

## 1️⃣ CRIAR PEDIDO (POST)
**URL:** POST http://localhost:3000/api/pedidos

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "cliente": "Maria Silva",
  "email": "maria@example.com",
  "telefone": "11987654321",
  "item": "Pizza Calabresa",
  "quantidade": 1,
  "valor": 35.90,
  "endereco": "Av. Paulista, 1000 - Apto 201"
}
```

**Resposta (201):**
```json
{
  "mensagem": "Pedido criado com sucesso",
  "pedido": {
    "id": 1,
    "cliente": "Maria Silva",
    "email": "maria@example.com",
    "telefone": "11987654321",
    "item": "Pizza Calabresa",
    "quantidade": 1,
    "valor": 35.9,
    "endereco": "Av. Paulista, 1000 - Apto 201",
    "status": "pendente",
    "dataCriacao": "2024-01-15T10:30:45.123Z",
    "dataAtualizacao": "2024-01-15T10:30:45.123Z"
  }
}
```

---

## 2️⃣ CRIAR OUTRO PEDIDO
**URL:** POST http://localhost:3000/api/pedidos

**Body:**
```json
{
  "cliente": "João Santos",
  "email": "joao@example.com",
  "telefone": "11988776655",
  "item": "Pizza Mozzarella com Tomate",
  "quantidade": 2,
  "valor": 65.00,
  "endereco": "Rua Augusta, 500 - Sala 10"
}
```

---

## 3️⃣ LISTAR TODOS OS PEDIDOS (GET)
**URL:** GET http://localhost:3000/api/pedidos

**Resposta (200):**
```json
{
  "pedidos": [
    {
      "id": 1,
      "cliente": "Maria Silva",
      "item": "Pizza Calabresa",
      "quantidade": 1,
      "valor": "35.90",
      "status": "pendente",
      "dataCriacao": "2024-01-15T10:30:45.123Z"
    },
    {
      "id": 2,
      "cliente": "João Santos",
      "item": "Pizza Mozzarella com Tomate",
      "quantidade": 2,
      "valor": "65.00",
      "status": "pendente",
      "dataCriacao": "2024-01-15T10:35:20.456Z"
    }
  ],
  "resumo": {
    "quantidade": 2,
    "totalGeral": "100.90",
    "dataConsulta": "2024-01-15T10:40:00.000Z"
  }
}
```

---

## 4️⃣ FILTRAR PEDIDOS POR STATUS (GET)
**URL:** GET http://localhost:3000/api/pedidos?status=confirmado

**Resposta (200):**
```json
{
  "pedidos": [...],
  "resumo": {
    "quantidade": 1,
    "totalGeral": "65.00",
    "dataConsulta": "2024-01-15T10:45:00.000Z"
  }
}
```

---

## 5️⃣ OBTER PEDIDO ESPECÍFICO (GET)
**URL:** GET http://localhost:3000/api/pedidos/1

**Resposta (200):**
```json
{
  "id": 1,
  "cliente": "Maria Silva",
  "email": "maria@example.com",
  "telefone": "11987654321",
  "item": "Pizza Calabresa",
  "quantidade": 1,
  "valor": 35.9,
  "endereco": "Av. Paulista, 1000 - Apto 201",
  "status": "pendente",
  "dataCriacao": "2024-01-15T10:30:45.123Z",
  "dataAtualizacao": "2024-01-15T10:30:45.123Z"
}
```

---

## 6️⃣ ATUALIZAR STATUS (PUT)
**URL:** PUT http://localhost:3000/api/pedidos/1

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "status": "confirmado"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Pedido atualizado para status: confirmado",
  "pedido": {
    "id": 1,
    "cliente": "Maria Silva",
    "email": "maria@example.com",
    "telefone": "11987654321",
    "item": "Pizza Calabresa",
    "quantidade": 1,
    "valor": 35.9,
    "endereco": "Av. Paulista, 1000 - Apto 201",
    "status": "confirmado",
    "dataCriacao": "2024-01-15T10:30:45.123Z",
    "dataAtualizacao": "2024-01-15T10:50:00.789Z"
  }
}
```

---

## 7️⃣ ATUALIZAR PARA "PREPARANDO" (PUT)
**URL:** PUT http://localhost:3000/api/pedidos/1

**Body:**
```json
{
  "status": "preparando"
}
```

---

## 8️⃣ ATUALIZAR PARA "ENVIADO" (PUT)
**URL:** PUT http://localhost:3000/api/pedidos/1

**Body:**
```json
{
  "status": "enviado"
}
```

---

## 9️⃣ ATUALIZAR PARA "ENTREGUE" (PUT)
**URL:** PUT http://localhost:3000/api/pedidos/1

**Body:**
```json
{
  "status": "entregue"
}
```

---

## 🔟 CANCELAR PEDIDO (PUT)
**URL:** PUT http://localhost:3000/api/pedidos/2/cancelar

**Resposta (200):**
```json
{
  "mensagem": "Pedido cancelado com sucesso",
  "pedido": {
    "id": 2,
    "cliente": "João Santos",
    "email": "joao@example.com",
    "telefone": "11988776655",
    "item": "Pizza Mozzarella com Tomate",
    "quantidade": 2,
    "valor": 65,
    "endereco": "Rua Augusta, 500 - Sala 10",
    "status": "cancelado",
    "dataCriacao": "2024-01-15T10:35:20.456Z",
    "dataAtualizacao": "2024-01-15T10:55:30.321Z"
  }
}
```

---

## 1️⃣1️⃣ LISTAR NOVAMENTE (SEM CANCELADO)
**URL:** GET http://localhost:3000/api/pedidos

**Resposta (200):**
```json
{
  "pedidos": [
    {
      "id": 1,
      "cliente": "Maria Silva",
      "item": "Pizza Calabresa",
      "quantidade": 1,
      "valor": "35.90",
      "status": "entregue",
      "dataCriacao": "2024-01-15T10:30:45.123Z"
    }
  ],
  "resumo": {
    "quantidade": 1,
    "totalGeral": "35.90",
    "dataConsulta": "2024-01-15T11:00:00.000Z"
  }
}
```

---

## 1️⃣2️⃣ OBTER ESTATÍSTICAS (GET)
**URL:** GET http://localhost:3000/api/pedidos/stats/resumo

**Resposta (200):**
```json
{
  "totalPedidos": 2,
  "pedidosAtivos": 1,
  "pedidosCancelados": 1,
  "porStatus": {
    "entregue": 1
  },
  "totalRecebido": "35.90"
}
```

---

## 1️⃣3️⃣ DELETAR PEDIDO CANCELADO (DELETE)
**URL:** DELETE http://localhost:3000/api/pedidos/2

**Resposta (200):**
```json
{
  "mensagem": "Pedido #2 foi removido"
}
```

---

## ❌ ERROS POSSÍVEIS

### Validação falhou - Cliente ausente (POST)
**Status:** 400
```json
{
  "erro": "Dados inválidos",
  "detalhes": ["Cliente é obrigatório e deve ser texto"]
}
```

### Email inválido (POST)
**Status:** 400
```json
{
  "erro": "Dados inválidos",
  "detalhes": ["Email inválido"]
}
```

### Telefone inválido (POST)
**Status:** 400
```json
{
  "erro": "Dados inválidos",
  "detalhes": ["Telefone inválido (formato: 11999999999)"]
}
```

### Valor mínimo não atingido (POST)
**Status:** 400
```json
{
  "erro": "Dados inválidos",
  "detalhes": ["Valor mínimo do pedido é R$ 10,00"]
}
```

### Pedido não encontrado (GET)
**Status:** 404
```json
{
  "erro": "Pedido #999 não encontrado"
}
```

### ID inválido (GET)
**Status:** 400
```json
{
  "erro": "ID deve ser um número"
}
```

### Não pode cancelar pedido já entregue (PUT)
**Status:** 400
```json
{
  "erro": "Não é possível cancelar um pedido que já foi enviado"
}
```

### Status inválido (PUT)
**Status:** 400
```json
{
  "erro": "Status inválido. Valores aceitos: pendente, confirmado, preparando, enviado, entregue, cancelado"
}
```

---

## 🧪 Fluxo Completo de Teste

1. **Criar 2 pedidos** (POST) → Status 201
2. **Listar todos** (GET) → Status 200, quantidade = 2
3. **Obter pedido 1** (GET /1) → Status 200
4. **Atualizar status para confirmado** (PUT /1) → Status 200
5. **Atualizar status para preparando** (PUT /1) → Status 200
6. **Atualizar status para enviado** (PUT /1) → Status 200
7. **Atualizar status para entregue** (PUT /1) → Status 200
8. **Cancelar pedido 2** (PUT /2/cancelar) → Status 200
9. **Listar todos** (GET) → Status 200, quantidade = 1 (cancelado não aparece)
10. **Obter estatísticas** (GET /stats/resumo) → Status 200
11. **Deletar pedido 2** (DELETE /2) → Status 200

---

**Todos os testes devem passar! ✅**
