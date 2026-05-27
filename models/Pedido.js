// models/Pedido.js
class Pedido {
  constructor(id, cliente, email, telefone, item, quantidade, valor, endereco) {
    this.id = id;
    this.cliente = cliente;
    this.email = email;
    this.telefone = telefone;
    this.item = item;
    this.quantidade = quantidade;
    this.valor = valor;
    this.endereco = endereco;
    this.status = 'pendente'; // pendente, confirmado, preparando, enviado, entregue, cancelado
    this.dataCriacao = new Date();
    this.dataAtualizacao = new Date();
  }

  static validar(dados) {
    const erros = [];

    if (!dados.cliente || typeof dados.cliente !== 'string' || dados.cliente.trim().length === 0) {
      erros.push('Cliente é obrigatório e deve ser texto');
    }

    if (!dados.email || !this.validarEmail(dados.email)) {
      erros.push('Email inválido');
    }

    if (!dados.telefone || !this.validarTelefone(dados.telefone)) {
      erros.push('Telefone inválido (formato: 11999999999)');
    }

    if (!dados.item || typeof dados.item !== 'string' || dados.item.trim().length === 0) {
      erros.push('Item é obrigatório');
    }

    if (!dados.quantidade || dados.quantidade < 1) {
      erros.push('Quantidade deve ser maior que 0');
    }

    if (!dados.valor || dados.valor < 10) {
      erros.push('Valor mínimo do pedido é R$ 10,00');
    }

    if (!dados.endereco || typeof dados.endereco !== 'string' || dados.endereco.trim().length < 5) {
      erros.push('Endereço é obrigatório e deve ter pelo menos 5 caracteres');
    }

    return erros;
  }

  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validarTelefone(telefone) {
    const regex = /^\d{11}$/;
    return regex.test(telefone.replace(/\D/g, ''));
  }

  obterResumo() {
    return {
      id: this.id,
      cliente: this.cliente,
      item: this.item,
      quantidade: this.quantidade,
      valor: this.valor.toFixed(2),
      status: this.status,
      dataCriacao: this.dataCriacao
    };
  }
}

module.exports = Pedido;
