function resolve(process, colleague) {
  var valorTotalCompra = parseFloat(hAPI.getCardValue("txt_valor_cotado")); //Ira obter o valor total da compra do meu campo
  
  var papelAtribuir;
  
  if (txt_valor_cotado <= 9999.99) {
    papelAtribuir = "Contabilidade";
  } else {
    papelAtribuir = "Diretores";
  }

  // Define o papel a ser atribuído à atividade
  hAPI.setCardValue("PapelAtribuir", papelAtribuir);

  // Adiciona os usuários do papel responsável à lista de atribuição
  var userList = new java.util.ArrayList();
  var usuariosResponsaveis = hAPI.getUsersInGroup(papelAtribuir);

  for (var i = 0; i < usuariosResponsaveis.size(); i++) {
    userList.add(usuariosResponsaveis.get(i).getColleagueId());
  }

  return userList;
}




/*
 * 
 * function resolve(process, colleague) {

	var userList = new java.util.ArrayList();

	var total = hAPI.getCardValue("total");

	if (parseInt(total, 10) >= 10000) {
		userList.add('Pool:Role:Diretores');
	} else {
		userList.add('Pool:Role:Contabilidade');
	}

	return userList;

}
 * 
 */