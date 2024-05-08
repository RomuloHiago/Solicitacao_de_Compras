function validateForm(form){
	
	var atividade = getValue("WKNumState");
	var atividade_solicitacao = 5;
	var atividade_cotacao = 6;
	var atividade_aprovador = 8;
	
	// SOLICITAÇÃO
	if (atividade == atividade_solicitacao){
		
		if (form.getValue('tipo') == null || form.getValue('tipo') == "")
	    {
	       throw "Informe o tipo do produto.";
	    }
		
	}
	
	// Valida tabela pai e filho
	var indexes = form.getChildrenIndexes("tb_produtos");
	
    if (indexes.length < 1) {
    	
    	throw "Não foram informados produtos!";
    }
    else{
    	
    	// Percorre os campos Pai x Filho
    	for (var i = 0; i < indexes.length; i++) { 
    		
    		// SOLICITAÇÃO
    		if (atividade == atividade_solicitacao){
        	
	            if(form.getValue('txt_codigo_produto___' + indexes[i]) == null || form.getValue('txt_codigo_produto___' + indexes[i]) == "") {
	            	throw "Informe o codigo do produto" + indexes[i];
	            }
	            
	            if(form.getValue('txt_quantidade___' + indexes[i]) == null || form.getValue('quantidade___' + indexes[i]) == "") {
	            	throw "Informe a quantidade do produto" + indexes[i];
	            }
	            
    		}
    		
    		// COTAÇÃO
    		if (atividade == atividade_cotacao){
    			
    			if(form.getValue('txt_fornecedor___' + indexes[i]) == null || form.getValue('txt_fornecedor___' + indexes[i]) == "") {
	            	throw "Informe o Fornecedor " + indexes[i];
	            }
	            
	            if(form.getValue('txt_valor_cotado___' + indexes[i]) == null || form.getValue('txt_valor_cotado___' + indexes[i]) == "") {
	            	throw "Informe o Valor cotado" + indexes[i];
	            }
    			
    		}
        }
    }
    
    // APROVACAO
    if (atividade == atividade_aprovador){
    	
    	if(form.getValue('tipoApovado') == null || form.getValue('aprov_gestor') == "") {
        	throw "Selecione opção de aprovação!";
        }
    	
    	if(form.getValue('tipoApovado') == "nao" && (form.getValue('txt_justificativa_gestor') == null || form.getValue('txt_justificativa_gestor') == "") ) {
        	throw "Informe a Observação/Justificativa!";
        }
    	
    	
    	
    }
	
}