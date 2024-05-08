

/*Usando uma API pra CEP pra quando o usario digitar o CEP seja preenchiddo automaticamente outros campos  */

$("#cep").blur(function() {      /*mapeando o campo cep*/
	$.getJSON("//viacep.com.br/ws/"+ $("#cep").val() +"/json/", function (dados){     /*dentro da API mapeei o que quero que retorne no caso o ("#cep") e nomeei ela de 'dados'*/
	  
/*os campos azul são os meus "IDs no html" */  	/*'.val' pegando o valor da API disponiveis*/  /*'(dados.bairro)' estou pegando os dados especificos da api disponivel como bairro por ex*/
		
		$("#logradouro").val(dados.logradouro);
	    $("#bairro").val(dados.bairro);
	    $("#cidade").val(dados.localidade);
	    $("#estado").val(dados.uf);
    })
});	