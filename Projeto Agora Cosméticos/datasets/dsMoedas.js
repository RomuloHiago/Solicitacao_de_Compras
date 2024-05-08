function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	
	/// criando o datasar efetivamente com dados fixos
	var ds = DatasetBuilder.newDataset(); 
							
		ds.addColumn("simbolo");	  /// criando as colunas que terã0 no meu dataset
		ds.addColumn("nomeMoeda");
		
		ds.addRow(new Array("R$", "Real"));    /// criando os simbolos e o nome da moeda
		ds.addRow (new Array("U$$", "Dolar Americano"));
		ds.addRow(new Array("€", "Euro"));
		
		return ds;
}
function onMobileSync(user) {

}


/*
 * Esse ds foi exmeplo, caso eu queira usar com valores fixos. Porem utilizei o proprio forms de moedas pra cadastrar
 * moedas e servi-lo como dataset
 * 
 * 
 *//