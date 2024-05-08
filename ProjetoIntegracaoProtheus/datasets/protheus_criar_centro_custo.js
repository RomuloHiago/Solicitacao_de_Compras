function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("status");
	dataset.addColumn("detalhe");
	
	
	//Class 1-Sintetico / 2- Analitico
	//Code - Código do centro de custo
	//CompanyId - Empresa do TOTVS Protheus
	//Name - Nome do centro de custo
	//RegisterSituation - 1-Bloqueado/2-Ativo
	var parametros = {
	    "Class": "",
	    "Code": "",
	    "CompanyId": "01",
	    "Name": "",
	    "RegisterSituation": "2"
	}
	
	if(constraints != null){
		for(var i = 0; i < constraints.length; i++){
			if(constraints[i].fieldName == "Class"){
				parametros["Class"] = String(constraints[i].initialValue);
			}
			else if(constraints[i].fieldName == "Code"){
				parametros["Code"] = String(constraints[i].initialValue);
			}
			else if(constraints[i].fieldName == "Name"){
				parametros["Name"] = String(constraints[i].initialValue);
			}
		}
	}
	
	var sendData = {	
		companyId: String(fluigAPI.getSecurityService().getCurrentTenantId()),
		serviceCode: "PROTHEUS_COSTCENTERS",
		endpoint: "/",
		method: "POST",
		params: parametros
	}
	
	var clientService = fluigAPI.getAuthorizeClientService();
	
	var vo = clientService.invokeService(JSON.stringify(sendData));
	
	log.dir(vo);
	
	var status = String(vo.getHttpStatusResult());
	
	if(status == "201"){
		dataset.addRow(new Array(
			status,
			"Centro de custo criado com sucesso"
		));	
	}
	else if (status == "400"){
		
		var parseResult = JSON.parse(vo.getResult());
		
		var parseError = JSON.parse(parseResult.errorMessage);

		var msg = parseError.detailedMessage
		
		dataset.addRow(new Array(
			status,
			msg
		));
	}
	
	else {
		dataset.addRow(new Array(
			"403",
			"Ops, aconteceu um erro desconhecido, por favor tente mais tarde."
		));
	}
	
	return dataset;	
	
		
		
	}function onMobileSync(user) {
	

}