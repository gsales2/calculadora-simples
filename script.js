const botoes = document.querySelectorAll(".botao");
const display = document.querySelector("input");
let valorAtual = "";
let valorAntigo = "";
let operadorAtual = "";
let resultado = "";
let displayTexto = "";

function calcular(a, b, operador) {
  switch (operador) {
        case "+": return a + b
        case "-": return a - b
        case "*": return a * b
        case "/": return b === 0 ? 'Erro' : a / b 
       
      }
}

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
        if (valorAntigo && operadorAtual) {
          resultado = calcular(Number(valorAntigo), Number(valorAtual), operadorAtual)
          operadorAtual = valor;
      valorAntigo = resultado;
      valorAtual = "";

      displayTexto += `${valor}`
      display.value = displayTexto;
        } else{
      operadorAtual = valor;
      valorAntigo = valorAtual;
      valorAtual = "";

      displayTexto += `${valor}`
      display.value = displayTexto;}
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
      resultado = calcular(valorAntigoFormatado, valorAtualFormatado, operadorAtual)
      valorAtual = "";
      valorAntigo = resultado;
      operadorAtual = "";
      display.value = valorAntigo;
    }
  });
});
