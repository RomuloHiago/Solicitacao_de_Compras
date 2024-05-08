
$(document).ready(function() {
	 

         //// Verificação inicial
        if ($('#processState').val() === '' && $('#formMode').val() === 'ADD') {
            // Adicionar nova linha
            wdkAddChild('produto');
        }
        
        var camposParaCalendario = ['#txt_dt_solic', '#prazo_compra', '#dt_cotacao', '#dt_aprovacao'];
        camposParaCalendario.setMinDate(new Date());

        for (var i = 0; i < camposParaCalendario.length; i++) {
            FLUIGC.calendar(camposParaCalendario[i]);
        }
        
        

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        /// Função para preencher campos com base no nas info do meu zoom cadastrado 
        function preencherCamposComZoom(zoomId, campos) {
            var zoom = window[zoomId];
            
            if (zoom) {  /// Verificar se o zoom está disponível
                zoom.onChange(function(selectedItem) {
                    if (selectedItem) {
                    	
                      
                    	
                    	// GAtilhando os campos do cod pro descr/un medida
                    	$.each(campos, function(fieldName, zoomField) {
                    		$("#txt_descr_produto__" + index).val(selectedItem["descricaoProduto"]);  ///txt --compras
                    		$("#txt_unidade_medida__" + index).val(selectedItem["unidadeMedida"]);
                    		$("#txt_unidade_medida__" + index).attr("disabled", "disabled");
                    		
                    	});
                    }
                });
            } 
        }

        /// Chama a função para o zoom do forms do produto no campo codigo ///
        preencherCamposComZoom("txt_codigo_produto", {
            "txt_unidade_medida": "unidadeMedida"
           
        });
    });
 

 

 
 
 
 
 
 function setSelectedZoomItem(selectedItem) {              
		
		var inputSelecionado = selectedItem.inputName;
		var indice = inputSelecionado.substr(inputSelecionado.indexOf("___"));
		var lenInput = inputSelecionado.length - indice.length;
		var nameInput = inputSelecionado.substr(0,lenInput);
		
	// gatilha o codigo, descricao e unidade de medida do produto selecionado
		if(nameInput == "txt_codigo_produto"){
			$("#txt_codigo_produto" + indice).val(selectedItem["codigoProduto"]); //+ indice se refere a minha tabela paixfilho
			$("#txt_descr_produto" + indice).val(selectedItem["descricaoProduto"]);
			$("#txt_unidade_medida" + indice).val(selectedItem["unidadeMedida"]);
		}
		
	}

	function removedZoomItem(removedItem) {
		
		var inputRemovido = removedItem.inputName;
		
		var inputRemovido = selectedItem.inputName;
		var indice = inputRemovido.substr(inputRemovido.indexOf("___"));
		var lenInput = inputRemovido.length - indice.length;
		var nameInput = inputRemovido.substr(0,lenInput);
		
	// apaga o codigo, descricao e unidade de medida do produto removido
		if(nameInput == "txt_codigo_produto"){
			$("#txt_codigo_produto" + indice).val("");
			$("#txt_descr_produto" + indice).val("");
			$("#txt_unidade_medida" + indice).val("");
		}
		
	}
 
 
 
 
