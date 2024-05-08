 /*
  * form.setValue() é uma função utilizada no Fluig para definir o valor de um campo em um formulário.
  * */

function displayFields(form, customHTML){
		
	var atividade = getValue("WKNumState");
	var user = getUser();		
	
	// SOLICITACAO
	if(atividade == 0 || atividade == 6){
				
		form.setValue("txt_number_solicitante", getValue("WKNumProces")); // Numero do processo
		form.setValue("txt_solicitante", user.getFullName()); // Nome completo User
		form.setValue("txt_solicitante", getValue("WKUser")); // Contém o código do usuário atual
		form.setValue("txt_dt_solic", getDate()); // campo com data
		form.setValue("status", "");	
		form.setVisibleById("panelGestor", false); //oculta essa div nesse atv
	}
	
	
	
	// REALIZAR COTACAO
	else if (atividade == 6) {
		
		form.setValue("txt_number_solicitante", getValue("WKNumProces"));
		form.setValue("txt_solicitante", user.getFullName());
		form.setValue("txt_solicitante", getValue("WKUser"));
		form.setValue("txt_dt_solic", getDate());
		form.setValue("cotado_por", getValue("WKNumProces"));
		form.setValue("status", "cotacao");	
		form.setVisibleById("panelGestor", false); //oculta essa div nesse atv
	}
	
	
	// ANALIZAR P/ APROVAR A COTACAO
	else if (atividade == 8) {
		
		form.setValue("nome_aprovador", user.getFullName());
		form.setValue("nome_aprovador", getValue("WKUser")); 
		form.setValue("dt_cotacao", getDate()); // data
		form.setValue("cotado_por", getValue("WKNumProces")); 
		form.setValue("status", "aprovacao");
	}
	
	
	// APROVADO
	else if (atividade == 12) {
				
		form.setValue("status", "aprovado");	
	}
	
	
	// REPROVADO
	else if (atividade == 14) {
				
		form.setValue("status", "reprovado");
	}
}

function getUser(){
	return fluigAPI.getUserService().getCurrent();
}

function getDate(){
	return new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(new java.util.Date());
}
