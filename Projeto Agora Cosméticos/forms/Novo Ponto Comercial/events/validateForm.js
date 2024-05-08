/*Validando os campos para não deixar de ser preenchido pelo usuario*/


function validateForm(form){
	
	
	/*Requisitante*/
	var msg = "";
	if(form.getValue("nome") == ""){
		msg += "Campo Nome não foi preenchido.";	
	}
	if(form.getValue("email") == ""){
		msg += "Campo Email não foi preenchido.";
	}
	if(form.getValue("telefone") == ""){
		msg += "Campo Telefone não foi preenchido.";
	}
	if(form.getValue("documentoIdentidade") == ""){
		msg += "Campo Documento de Identidade não foi preenchido.";
	}
	if(form.getValue("dataNascimento") == ""){
		msg += "Campo Data de Nascimento não foi preenchido.";
	}
	
	
	
	
	
	/*Responsaveis*/
	/*
	var responsaveis = form.getChildrenIndexes("responsaveisTabela")
	
	if(responsaveis.length ==0)
		msg += "Campo Responsáveis não foi preenchido.";
	
	*/

	
	

	/*Ponto Comercial*/
	
	if(form.getValue("tipoPonto") == ""){
		msg += "Campo Tipo de Ponto não foi selecionado."; 
	}
	if(form.getValue("segunda") != "on" && form.getValue("terca") != "on" && form.getValue("quarta") != "on" &&
	   form.getValue("quinta") != "on" &&  form.getValue("sexta") != "on" &&  form.getValue("sabado") != "on" &&
		   form.getValue("domingo") != "on"){
		msg += "Campo dias de funcionamento não foi infor."; 
	}

	if(form.getValue("cep") == ""){
		msg += "Campo CEP não foi preenchido.";
	}
	if(form.getValue("logradouro") == ""){
		msg += "Campo Logradouro não foi preenchido.";
	}
	
	if(form.getValue("bairro") == ""){
		msg += "Campo Bairro não foi preenchido.";
	}
	if(form.getValue("cidade") == ""){
		msg += "Campo Cidade não foi preenchido.";
	}
	if(form.getValue("Estado") == ""){
		msg += "Campo Estado não foi preenchido.";
	}
	
	
	
	
	/*Financeiro*/
	if(form.getValue("valor") == ""){
		msg += "Campo Valor não foi preenchido.";
	}
	
	if(msg != "")
	throw msg;
}