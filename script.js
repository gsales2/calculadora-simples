const botoes = document.querySelectorAll(".botao");
const display = document.querySelector("input");
let valorAtual = "";
let valorAntigo = "";
let operadorAtual = "";
let resultado = "";

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const tipo = botao.dataset.type;
    const valor = botao.dataset.value;
    if (tipo === "number") {
        if(valor === "." && valorAtual.includes(".")) {
            return
        }
      let valorClicado = valor;
      valorAtual += valorClicado;
      display.value = valorAtual;
    } else if (tipo === "action" && valor === "clear") {
      valorAtual = "";
      display.value = valorAtual;
    } else if (tipo === "action" && valor === "clear-entry") {
      valorAtual = valorAtual.slice(0, -1);
      display.value = valorAtual;
    } else if (tipo === "operator") {
        if (operadorAtual || !valorAtual) {
            return
        }
      operadorAtual = valor;
      valorAntigo = valorAtual;
      valorAtual = "";
      display.value = operadorAtual;
    } else if (tipo === "result") {
      let valorAntigoFormatado = Number(valorAntigo);
      let valorAtualFormatado = Number(valorAtual);
      if (operadorAtual === "/" && valorAtualFormatado === 0) {
        display.value = "Erro: divisão por 0";
        valorAtual = "";
        valorAntigo = "";
        operadorAtual = "";
        return;
      }
      switch (operadorAtual) {
        case "+":
          resultado = valorAntigoFormatado + valorAtualFormatado;
          break;
        case "-":
          resultado = valorAntigoFormatado - valorAtualFormatado;
          break;
        case "/":
          resultado = valorAntigoFormatado / valorAtualFormatado;
          break;
        case "*":
          resultado = valorAntigoFormatado * valorAtualFormatado;
          break;
      }
      valorAtual = resultado;
      valorAntigo = "";
      operadorAtual = "";
      display.value = valorAtual;
    }
  });
});
