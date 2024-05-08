
$(document).ready(function() {
    // Recupera o valor atual do código do produto do Local Storage
    var codigoProdutoAtual = localStorage.getItem('ultimoCodigoProduto');

    // Se houver um valor numérico, incrementa e define de volta no campo e no Local Storage
    if (codigoProdutoAtual && !isNaN(codigoProdutoAtual)) {
        $("#codigoProduto").val(parseInt(codigoProdutoAtual) + 1);
        localStorage.setItem('ultimoCodigoProduto', parseInt(codigoProdutoAtual) + 1);
    } else {
        // Se não houver um valor numérico, define como '1' e atualiza o Local Storage
        $("#codigoProduto").val('1');
        localStorage.setItem('ultimoCodigoProduto', '1');
    }
});