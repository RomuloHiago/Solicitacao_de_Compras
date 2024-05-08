function createDataset(fields, constraints, sortFields) {
	
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("login");
	ds.addColumn("nome");

									//'qual coluna busco', 'valor final', 'valor inicial', 'tipo da constraint'  constraint é um filtro no fluig
	var filtroGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId","Responsaveis",
		"Responsaveis", ConstraintType.MUST);

										// 		'ok', 'n estou trazendo colunas', 'filtros', 'n ordenação dos registros'
	var datasetGrupo = DatasetFactory.getDataset("colleagueGroup", null,  new Array(filtroGrupo), null); // esta trazendo o msm conteudo que o dataset colleagueGroup 
	
	
	for(i = 0; i < datasetGrupo.rowsCount ;i++){
		var colabGrupo = datasetGrupo.getValue(i, "colleagueGroupPK.colleagueId");
		
		var datasetColaborador = DatasetFactory.getDataset("colleague", null,  null, null);
		
		for(j = 0; j < datasetColaborador.rowsCount; j++){
			var colabCol = datasetColaborador.getValue(j, "colleaguePK.colleagueId");			
			var colabNome = datasetColaborador.getValue(j, "colleagueName");
			if(colabCol == colabGrupo){ // se for igual
				 ds.addRow(new Array(colabCol, colabNome));
			}
		}
	}
	
	return ds;

}
