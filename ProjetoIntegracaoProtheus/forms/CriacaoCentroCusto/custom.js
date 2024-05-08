function setSelectedZoomItem(selectedItem) {              
	var inputSelecionado = selectedItem.inputName;
	
	if(inputSelecionado == "txt_classe_centro_custo"){
		$("#txt_cod_classe_centro_custo").val(selectedItem["Código"]);
	}
}

function removedZoomItem(removedItem) {
	var inputRemovido = removedItem.inputName;
	
	if(inputRemovido == "txt_classe_centro_custo"){
		$("#txt_cod_classe_centro_custo").val("");
	}
}