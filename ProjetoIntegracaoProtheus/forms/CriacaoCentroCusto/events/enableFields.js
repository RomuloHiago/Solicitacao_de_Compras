function enableFields(form){
	
	var atividade = getValue("WKNumState");
	
	//ATV GESTOR 6
	if(atividade == 6){
		form.setEnabled("txt_cod_centro_custo", false);
		form.setEnabled("txt_nome_centro_custo", false);
		form.setEnabled("txt_cod_classe_centro_custo", false);
	}
	
}