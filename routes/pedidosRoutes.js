// routes/pedidosRoutes.js
const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidosController');

// Rota de estatísticas (deve vir antes de :id para não confundir)
router.get('/stats/resumo', PedidosController.obterEstatisticas);

// Listar todos os pedidos
router.get('/', PedidosController.listar);

// Obter pedido específico
router.get('/:id', PedidosController.obterPorId);

// Criar novo pedido
router.post('/', PedidosController.criar);

// Rota específica para cancelar
router.put('/:id/cancelar', PedidosController.cancelar);

// Atualizar status (genérico)
router.put('/:id', PedidosController.atualizarStatus);

// Deletar pedido
router.delete('/:id', PedidosController.deletar);

module.exports = router;
