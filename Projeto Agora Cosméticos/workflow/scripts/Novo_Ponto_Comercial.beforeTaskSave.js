/*	Estou usando o evento 'beforeTaskSave'(antes da solicitação ser salva) antes de ela ser salvo, 
 	estou validando e impedir que o user crie uma solicição sem inserir a proposta comercial (PDF anexado).
 	
*/

function beforeTaskSave(colleagueId,nextSequenceId,userList){ 
	
	var anexos = hAPI.listAttachments();
	var temAnexos = false;
	
	for (i = 0; i < anexos.size() ;i++){ 
		var anexoAtual = anexos.get(i);
		if(anexoAtual.getDocumentDescription() == "Proposta Comercial.pdf"){
			temAnexos = true;
		}
	}
	

	
	if(!temAnexos){
		throw("Proposta inicial não foi anexada.");
	}
	
}