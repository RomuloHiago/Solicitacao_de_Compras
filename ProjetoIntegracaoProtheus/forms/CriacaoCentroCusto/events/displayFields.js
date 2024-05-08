function displayFields(form,customHTML){
	
	//NOME COMPLETO
	//getDadosUsuario().getFullName();
	
	//EMAIL
	//getDadosUsuario().getEmail();
	
	//DATA DO SERVIDOR
	//dataAgora()
	
	//form.setValue("CAMPO", valor);
	
	form.setValue("txt_solicitante", getDadosUsuario().getFullName());
	form.setValue("txt_solic_email", getDadosUsuario().getEmail());
	form.setValue("txt_dt_solic", dataAgora());
	
}

function getDadosUsuario(){
	return fluigAPI.getUserService().getCurrent();
}

function dataAgora(){
	return new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(java.util.Date()); //00/00/00 00:00
}