const express = require('express');
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Registrar rotas
app.use('/api/pedidos', pedidosRoutes);

// Rota de healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'API rodando', timestamp: new Date().toISOString() });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo à Delivery API',
    versao: '1.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/pedidos',
      'GET /api/pedidos/:id',
      'POST /api/pedidos',
      'PUT /api/pedidos/:id',
      'DELETE /api/pedidos/:id'
    ]
  });
});

// Erro 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📍 Teste em: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
