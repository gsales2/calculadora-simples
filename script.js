const botoes = document.querySelectorAll(".botao");
const display = document.querySelector("input");
let valorAtual = "";
let valorAntigo = "";
let operadorAtual = "";
let resultado = "";
let displayTexto = "";

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const tipo = botao.dataset.type;
    const valor = botao.dataset.value;
    if (tipo === "number") {
        if(valor === "." && valorAtual.includes(".")) {
            return
        }
      valorAtual += valor;
      displayTexto += valor;
      display.value = displayTexto;
    } else if (tipo === "action" && valor === "clear") {
      valorAtual = "";
      displayTexto = "";
      display.value = displayTexto;
    } else if (tipo === "action" && valor === "clear-entry") {
      valorAtual = valorAtual.slice(0, -1);
      displayTexto = displayTexto.slice(0, -1)
      display.value = displayTexto;
    } else if (tipo === "operator") {
        if (operadorAtual || !valorAtual) {
            return
        }
      operadorAtual = valor;
      valorAntigo = valorAtual;
      valorAtual = "";

      displayTexto += `${valor}`
      display.value = displayTexto;
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
