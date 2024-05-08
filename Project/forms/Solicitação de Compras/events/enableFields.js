function enableFields(form){
	
	var atividade = getValue("WKNumState");
	var atividade_solicitacao = 5;
	var atividade_cotacao = 6;
	var atividade_aprovador = 8;	
	
	// SOLICITACAO
	if(atividade == 0 || atividade == atividade_solicitacao || atividade == atividade_cotacao){
					
		form.setVisibleById("panelAprovacao", false)
	}
	
	
	// COTAÇÃO
	if(atividade == atividade_cotacao || atividade == atividade_aprovador){
		
		
		
		if(atividade == atividade_cotacao){
			
			form.setEnabled("prazo_compra", false);
			form.setEnabled("justificativa", false);
			
		}
		else{
			
			form.setVisibleById("dataCompra", false);	
		}
		
		
		// Busca quantidade de linhas da tabela pai e filho dentro do meu forms
		var indexes = form.getChildrenIndexes("tb_produtos");
		
		if (indexes.length > 0) {
			
			// Percorre os campos Pai x Filho
	    	for (var i = 0; i < indexes.length; i++) { 
	    		
	    		form.setEnabled('txt_codigo_produto___' + indexes[i], false);
		    	form.setEnabled('txt_quantidade___' + indexes[i], false);	    		
	    		
	    		if(atividade == atividade_aprovador){
	    			
	    			form.setEnabled('txt_fornecedor___' + indexes[i], false);
		    		form.setEnabled('txt_valor_cotado___' + indexes[i], false);
	    			
	    		}
	    		
	    	}
	    	
		}
		
	}
	
	
	// APROVAÇÃO
	if(atividade == atividade_aprovador){
		
		form.setEnabled("prazo_compra", false);
		form.setEnabled("justificativa", false);
		
		// Valida tabela pai e filho
		var indexes = form.getChildrenIndexes("tb_produtos");
		
		if (indexes.length > 0) {
			
			// Percorre os campos Pai x Filho
	    	for (var i = 0; i < indexes.length; i++) { 
	    		
	    		form.setEnabled('txt_fornecedor___' + indexes[i], false);
	    		form.setEnabled('txt_valor_cotado___' + indexes[i], false);
	    		
	    	}
	    	
		}
		
	}
}