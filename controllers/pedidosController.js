// controllers/pedidosController.js
const pedidosService = require('../services/pedidosService');

class PedidosController {
  
  // GET /api/pedidos - Lista todos os pedidos
  static listar(req, res) {
    try {
      const { status } = req.query;
      const resultado = pedidosService.listar(status);
      res.json(resultado);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // GET /api/pedidos/:id - Obter pedido específico
  static obterPorId(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID deve ser um número' });
      }

      const pedido = pedidosService.obterPorId(id);
      res.json(pedido);
    } catch (erro) {
      res.status(404).json({ erro: erro.message });
    }
  }

  // POST /api/pedidos - Criar novo pedido
  static criar(req, res) {
    try {
      const { cliente, email, telefone, item, quantidade, valor, endereco } = req.body;

      const dados = { cliente, email, telefone, item, quantidade, valor, endereco };
      const novoPedido = pedidosService.criar(dados);

      res.status(201).json({
        mensagem: 'Pedido criado com sucesso',
        pedido: novoPedido
      });
    } catch (erro) {
      if (erro.detalhes) {
        return res.status(400).json({
          erro: 'Dados inválidos',
          detalhes: erro.detalhes
        });
      }
      res.status(500).json({ erro: erro.message });
    }
  }

  // PUT /api/pedidos/:id - Atualizar status do pedido
  static atualizarStatus(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID deve ser um número' });
      }

      if (!status) {
        return res.status(400).json({ erro: 'Status é obrigatório' });
      }

      const pedidoAtualizado = pedidosService.atualizarStatus(id, status);

      res.json({
        mensagem: `Pedido atualizado para status: ${status}`,
        pedido: pedidoAtualizado
      });
    } catch (erro) {
      if (erro.message.includes('não encontrado')) {
        return res.status(404).json({ erro: erro.message });
      }
      res.status(400).json({ erro: erro.message });
    }
  }

  // DELETE /api/pedidos/:id - Deletar pedido (apenas se cancelado)
  static deletar(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID deve ser um número' });
      }

      const resultado = pedidosService.deletar(id);

      res.json(resultado);
    } catch (erro) {
      if (erro.message.includes('não encontrado')) {
        return res.status(404).json({ erro: erro.message });
      }
      res.status(400).json({ erro: erro.message });
    }
  }

  // PUT /api/pedidos/:id/cancelar - Rota específica para cancelar
  static cancelar(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID deve ser um número' });
      }

      const pedidoCancelado = pedidosService.cancelar(id);

      res.json({
        mensagem: 'Pedido cancelado com sucesso',
        pedido: pedidoCancelado
      });
    } catch (erro) {
      if (erro.message.includes('não encontrado')) {
        return res.status(404).json({ erro: erro.message });
      }
      res.status(400).json({ erro: erro.message });
    }
  }

  // GET /api/pedidos/stats/resumo - Estatísticas
  static obterEstatisticas(req, res) {
    try {
      const stats = pedidosService.obterEstatisticas();
      res.json(stats);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = PedidosController;
