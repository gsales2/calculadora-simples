const botoes = document.querySelectorAll('.botao');
const display = document.querySelector('input')
let valorAtual = "";
let valorAntigo = "";
let operadorAtual = "";
let resultado = "";

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        const tipo = botao.dataset.type;
        const valor = botao.dataset.value;
        if (tipo === 'number') {
            let valorClicado = valor;
            valorAtual += valorClicado;
            display.value = valorAtual
        }
        if ( valor === 'clear') {
            valorAtual = '';
            display.value = valorAtual
        }
        if ( valor === 'clear-entry') {
            valorAtual = valorAtual.slice(0, -1)
            display.value = valorAtual
        }
        if (tipo === 'operator') {
            operadorAtual = valor
            valorAntigo = valorAtual
            valorAtual = ""
            display.value = valorAtual
        }
        if (tipo === 'result') {
            let valorAntigoFormatado = parseInt(valorAntigo)
            let valorAtualFormatado = parseInt(valorAtual)
            switch(operadorAtual) {
                case '+':
                    resultado = valorAntigoFormatado + valorAtualFormatado
                    break;
                case '-':
                    resultado = valorAntigoFormatado - valorAtualFormatado
                    break;
                case '/':
                    resultado = valorAntigoFormatado / valorAtualFormatado
                    break;
                case '*':
                   resultado = valorAntigoFormatado * valorAtualFormatado
                    break;
            }
            display.value = resultado
        }
    });
})