# 📁 Estrutura do Projeto - Delivery API

```
delivery-api/
│
├── 📄 app.js                       # ⭐ Arquivo principal - Inicializa Express
│
├── 📁 routes/
│   └── 📄 pedidosRoutes.js        # Define as 7 rotas HTTP
│
├── 📁 controllers/
│   └── 📄 pedidosController.js    # Lógica de requisição/resposta
│
├── 📁 services/
│   └── 📄 pedidosService.js       # Regras de negócio
│
├── 📁 models/
│   └── 📄 Pedido.js               # Estrutura e validações
│
├── 📁 config/                     # (Preparado para expansão)
│
├── 📁 utils/                      # (Preparado para expansão)
│
├── 📄 package.json                # Dependências do projeto
├── 📄 .gitignore                  # Arquivos ignorados no Git
│
├── 📚 README.md                   # Documentação principal
├── 📚 RESPOSTAS_PARTE1.md         # Análise do código espaguete
├── 📚 EXEMPLOS_REQUISICOES.md     # Exemplos de uso da API
├── 📚 CHECKLIST_TESTES.md         # Testes a executar
└── 📚 ESTRUTURA.md                # Este arquivo
```

---

## 🔍 Detalhamento de Cada Arquivo

### 1️⃣ **app.js** (Arquivo Principal)

```javascript
// O que faz:
✅ Importa Express
✅ Cria a instância do app
✅ Registra middleware (express.json())
✅ Conecta as rotas
✅ Inicia o servidor na porta 3000

// O que NÃO faz:
❌ Validações
❌ Lógica de negócio
❌ Manipulação de dados
```

**Quando modificar:**
- Adicionar novo middleware
- Adicionar novo grupo de rotas
- Mudar porta do servidor

---

### 2️⃣ **routes/pedidosRoutes.js** (Definir Endpoints)

```javascript
// O que faz:
✅ Define as 7 rotas HTTP
   - GET /
   - GET /:id
   - POST /
   - PUT /:id
   - PUT /:id/cancelar
   - DELETE /:id
   - GET /stats/resumo

✅ Mapeia rota → controller
✅ Define ordem correta (ex: /stats antes de /:id)

// O que NÃO faz:
❌ Processar requisição
❌ Implementar lógica
❌ Validar dados
```

**Quando modificar:**
- Adicionar novo endpoint
- Mudar URL de uma rota
- Adicionar middleware específico

---

### 3️⃣ **controllers/pedidosController.js** (Intermediária)

```javascript
// O que faz:
✅ Recebe req e res do Express
✅ Extrai parâmetros de URL e body
✅ Chama o serviço
✅ Trata erros
✅ Retorna resposta HTTP com status correto

// O que NÃO faz:
❌ Lógica de negócio
❌ Manipulação de dados
❌ Cálculos complexos
```

**Métodos:**
- `listar(req, res)` - GET /
- `obterPorId(req, res)` - GET /:id
- `criar(req, res)` - POST /
- `atualizarStatus(req, res)` - PUT /:id
- `cancelar(req, res)` - PUT /:id/cancelar
- `deletar(req, res)` - DELETE /:id
- `obterEstatisticas(req, res)` - GET /stats/resumo

**Quando modificar:**
- Mudar formato de resposta
- Adicionar novo status HTTP
- Alterar forma de tratar erros

---

### 4️⃣ **services/pedidosService.js** (Lógica de Negócio) ⭐

```javascript
// O que faz:
✅ Armazena dados (this.pedidos = [])
✅ Implementa regras de negócio
✅ Valida estado de transição
✅ Calcula totais e estatísticas
✅ Gerencia IDs únicos

// O que NÃO faz:
❌ Retornar respostas HTTP
❌ Acessar req ou res
❌ Saber sobre URL ou status codes
```

**Métodos principais:**
- `listar(filtroStatus)` - Retorna pedidos + resumo
- `obterPorId(id)` - Busca um pedido
- `criar(dados)` - Cria novo pedido
- `atualizarStatus(id, novoStatus)` - Muda status
- `cancelar(id)` - Cancela pedido
- `deletar(id)` - Remove pedido
- `obterEstatisticas()` - Retorna stats

**Quando modificar:**
- Adicionar novo tipo de pedido
- Mudar regra de negócio
- Adicionar novo método

---

### 5️⃣ **models/Pedido.js** (Estrutura de Dados)

```javascript
// O que faz:
✅ Define classe Pedido
✅ Valida email
✅ Valida telefone
✅ Valida campos obrigatórios
✅ Formata dados para resposta

// O que NÃO faz:
❌ Manipular pedidos
❌ Acessar dados de outros
❌ Fazer cálculos complexos
```

**Métodos estáticos:**
- `validar(dados)` - Valida todos os campos
- `validarEmail(email)` - Usa regex
- `validarTelefone(telefone)` - Usa regex

**Métodos de instância:**
- `obterResumo()` - Retorna dados formatados

**Quando modificar:**
- Adicionar novo campo
- Mudar regra de validação
- Adicionar novo tipo de validação

---

## 🔄 Fluxo de uma Requisição

### Exemplo: Criar um Pedido

```
1️⃣ USUÁRIO envia POST http://localhost:3000/api/pedidos

2️⃣ EXPRESS recebe em app.js
   └─ Middleware express.json() processa body

3️⃣ ROTA (pedidosRoutes.js) mapeia para controller
   └─ router.post('/', PedidosController.criar)

4️⃣ CONTROLLER (pedidosController.js) processa
   ├─ Extrai dados: cliente, email, etc
   ├─ Chama service: pedidosService.criar(dados)
   └─ Trata erros com try/catch

5️⃣ SERVICE (pedidosService.js) executa lógica
   ├─ Chama Pedido.validar(dados)
   ├─ Se válido, cria novo Pedido
   ├─ Adiciona ao array this.pedidos
   └─ Retorna pedido criado

6️⃣ MODEL (Pedido.js) valida
   ├─ Verifica email com regex
   ├─ Verifica telefone com regex
   ├─ Valida campos obrigatórios
   └─ Retorna array de erros (se houver)

7️⃣ CONTROLLER recebe resposta
   ├─ Se erro: res.status(400).json({erro, detalhes})
   └─ Se sucesso: res.status(201).json({mensagem, pedido})

8️⃣ RESPOSTA HTTP volta para usuário ✅
```

---

## 🎯 Princípios Aplicados

### 1. **Separação de Responsabilidades (SoC)**
```
Routes     → Apenas HTTP
Controllers → Intermediária
Services   → Lógica
Models     → Validação
```

### 2. **Single Responsibility Principle (SRP)**
```
Cada arquivo tem UM motivo para mudar:
- routes.js    muda se API muda
- controller   muda se resposta muda
- service      muda se lógica muda
- model        muda se dados mudam
```

### 3. **DRY (Don't Repeat Yourself)**
```
Validação escrita uma vez em Pedido.js
Reutilizada em todos os endpoints
```

### 4. **SOLID**
```
S - Cada classe tem uma responsabilidade
O - Aberto para extensão (novo status, novo campo)
L - Liskov (pode substituir Service por banco de dados)
I - Interface limpa (métodos bem definidos)
D - Depends on abstraction (Service é abstração)
```

---

## 📈 Escalabilidade

### Adicionar Novo Endpoint (Ex: GET /pedidos/:id/historico)

```javascript
// 1. Adicionar no service
class PedidosService {
  obterHistorico(id) {
    const pedido = this.obterPorId(id);
    return {
      id: pedido.id,
      status: pedido.status,
      dataCriacao: pedido.dataCriacao,
      dataAtualizacao: pedido.dataAtualizacao
    };
  }
}

// 2. Adicionar no controller
static obterHistorico(req, res) {
  try {
    const id = parseInt(req.params.id);
    const historico = pedidosService.obterHistorico(id);
    res.json(historico);
  } catch (erro) {
    res.status(404).json({erro: erro.message});
  }
}

// 3. Adicionar na rota
router.get('/:id/historico', PedidosController.obterHistorico);
```

**Resultado:** 3 linhas adicionadas! ✅

---

## 🔐 Proteção de Dados

### Antes (Espaguete)
```javascript
let pedidos = [];  // ❌ Acesso direto, qualquer um modifica!
pedidos[0].status = 'hacked';
```

### Depois (MVC)
```javascript
class PedidosService {
  atualizarStatus(id, novoStatus) {
    // ✅ Validação obrigatória
    // ✅ Transição de estado validada
    // ✅ Auditoria possível
  }
}
```

---

## 💾 Pronto para Banco de Dados

### Mudar de memória para MongoDB?

```javascript
// Antes
class PedidosService {
  constructor() {
    this.pedidos = [];  // Array em memória
  }
}

// Depois
class PedidosService {
  async obterPorId(id) {
    return await Pedido.findById(id);  // MongoDB
  }
}
```

**O resto do código não muda!** O controller continua igual! 🎯

---

## 🧪 Testabilidade

### Testar Service (sem HTTP)
```javascript
// Sem precisar fazer requisição HTTP!
const service = new PedidosService();

const pedido = service.criar({
  cliente: "João",
  email: "joao@example.com",
  telefone: "11987654321",
  item: "Pizza",
  quantidade: 1,
  valor: 35.90,
  endereco: "Rua A"
});

assert(pedido.id === 1);
assert(pedido.status === 'pendente');
```

---

## 📚 Quando Consultar Cada Arquivo

| Objetivo | Consulte |
|----------|----------|
| Adicionar novo endpoint | routes/ → controllers/ → services/ |
| Mudar regra de validação | models/Pedido.js |
| Mudar cálculo de total | services/ |
| Alterar formato de resposta | controllers/ |
| Debugar um erro | console.log no controller ou service |
| Testar lógica isolada | services/ (sem HTTP) |
| Ver fluxo completo | Ler de routes → controllers → services |

---

## ✅ Checklist de Compreensão

- ☐ Entendo por que routes não pode ter lógica
- ☐ Entendo por que validação vai no model/service
- ☐ Entendo o fluxo requisição → response
- ☐ Conseguiria adicionar novo endpoint
- ☐ Conseguiria mudar uma regra de negócio
- ☐ Entendo por que isso é melhor que espaguete
- ☐ Consigo imaginar isso com banco de dados
- ☐ Conseguiria testar o service isoladamente

Se respondeu "não" a algum, releia o README.md e este arquivo! 📖

---

**Estrutura MVC aplicada com maestria!** 🎓
