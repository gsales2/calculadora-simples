const botoes = document.querySelectorAll(".botao");
const display = document.querySelector("input");
let valorAtual = "";
let valorAntigo = "";
let operadorAtual = "";
let resultado = "";

function calcular(a, b, operador) {
  switch (operador) {
        case "+": return a + b
        case "-": return a - b
        case "*": return a * b
        case "/": return b === 0 ? 'Erro' : a / b 
        default:
          return a;
       
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
      if(operadorAtual) {
        display.value = `${valorAntigo}${operadorAtual}${valorAtual}`
      }else {
        display.value = `${valorAtual}`
      }
    } else if (tipo === "action" && valor === "clear") {
      valorAtual = "";
      valorAntigo = "";
      operadorAtual = "";
      display.value = valorAtual;
    } else if (tipo === "action" && valor === "clear-entry") {
      valorAtual = valorAtual.slice(0, -1);
      display.value = valorAtual;
    } else if (tipo === "operator") {
      if (!valorAtual) {return;}
        if (valorAntigo && operadorAtual) {
          resultado = calcular(Number(valorAntigo), Number(valorAtual), operadorAtual)
          operadorAtual = valor;
      valorAntigo = resultado;
      valorAtual = "";

      display.value = `${valorAntigo}${operadorAtual}`;
        } else{
      operadorAtual = valor;
      valorAntigo = valorAtual;
      valorAtual = "";

      display.value = `${valorAntigo}${operadorAtual}`;}
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
      valorAtual = String(resultado);
      valorAntigo = "";
      operadorAtual = "";
      display.value = valorAtual;
    }
  });
});
