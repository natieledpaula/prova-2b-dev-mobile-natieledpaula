// Função obrigatória da atividade
export function validarRetirada(
  estoqueAtual,
  quantidadeRetirada
) {

  // Converte para número
  const estoque = Number(estoqueAtual);

  const retirada = Number(quantidadeRetirada);

  // Não pode retirar valor negativo
  if (retirada <= 0) {
    return false;
  }

  // Não pode retirar mais que existe
  if (retirada > estoque) {
    return false;
  }

  // Retirada válida
  return true;
}