// services/pedidosService.js
const Pedido = require('../models/Pedido');

class PedidosService {
  constructor() {
    this.pedidos = [];
    this.proximoId = 1;
  }

  // Listar todos os pedidos (exceto cancelados)
  listar(filtroStatus = null) {
    let pedidosFiltrados = this.pedidos.filter(p => p.status !== 'cancelado');

    if (filtroStatus) {
      pedidosFiltrados = pedidosFiltrados.filter(p => p.status === filtroStatus);
    }

    const totalGeral = pedidosFiltrados.reduce((soma, p) => soma + p.valor, 0);
    const quantidade = pedidosFiltrados.length;

    return {
      pedidos: pedidosFiltrados.map(p => p.obterResumo()),
      resumo: {
        quantidade,
        totalGeral: totalGeral.toFixed(2),
        dataConsulta: new Date()
      }
    };
  }

  // Obter pedido específico
  obterPorId(id) {
    const pedido = this.pedidos.find(p => p.id === id);
    if (!pedido) {
      throw new Error(`Pedido #${id} não encontrado`);
    }
    return pedido;
  }

  // Criar novo pedido
  criar(dados) {
    // Validar dados
    const erros = Pedido.validar(dados);
    if (erros.length > 0) {
      const erro = new Error('Validação falhou');
      erro.detalhes = erros;
      throw erro;
    }

    // Criar pedido
    const novoPedido = new Pedido(
      this.proximoId++,
      dados.cliente.trim(),
      dados.email.toLowerCase().trim(),
      dados.telefone.replace(/\D/g, ''),
      dados.item.trim(),
      parseInt(dados.quantidade),
      parseFloat(dados.valor),
      dados.endereco.trim()
    );

    this.pedidos.push(novoPedido);
    return novoPedido;
  }

  // Atualizar status do pedido
  atualizarStatus(id, novoStatus) {
    const statusValidos = ['pendente', 'confirmado', 'preparando', 'enviado', 'entregue', 'cancelado'];

    if (!statusValidos.includes(novoStatus)) {
      throw new Error(`Status inválido. Valores aceitos: ${statusValidos.join(', ')}`);
    }

    const pedido = this.obterPorId(id);

    // Validações de transição de status
    if (pedido.status === 'cancelado') {
      throw new Error('Não é possível alterar um pedido cancelado');
    }

    if (pedido.status === 'entregue') {
      throw new Error('Não é possível alterar um pedido já entregue');
    }

    pedido.status = novoStatus;
    pedido.dataAtualizacao = new Date();

    return pedido;
  }

  // Cancelar pedido
  cancelar(id) {
    const pedido = this.obterPorId(id);

    if (pedido.status === 'cancelado') {
      throw new Error('Pedido já foi cancelado');
    }

    if (pedido.status === 'enviado' || pedido.status === 'entregue') {
      throw new Error('Não é possível cancelar um pedido que já foi enviado');
    }

    pedido.status = 'cancelado';
    pedido.dataAtualizacao = new Date();

    return pedido;
  }

  // Deletar pedido (apenas cancelados)
  deletar(id) {
    const pedido = this.obterPorId(id);

    if (pedido.status !== 'cancelado') {
      throw new Error('Apenas pedidos cancelados podem ser deletados');
    }

    this.pedidos = this.pedidos.filter(p => p.id !== id);
    return { mensagem: `Pedido #${id} foi removido` };
  }

  // Obter estatísticas
  obterEstatisticas() {
    const porStatus = {};
    let totalRecebido = 0;

    this.pedidos.forEach(p => {
      if (p.status !== 'cancelado') {
        porStatus[p.status] = (porStatus[p.status] || 0) + 1;
        totalRecebido += p.valor;
      }
    });

    return {
      totalPedidos: this.pedidos.length,
      pedidosAtivos: this.pedidos.filter(p => p.status !== 'cancelado').length,
      pedidosCancelados: this.pedidos.filter(p => p.status === 'cancelado').length,
      porStatus,
      totalRecebido: totalRecebido.toFixed(2)
    };
  }
}

// Singleton - uma única instância compartilhada
const pedidosService = new PedidosService();

module.exports = pedidosService;
