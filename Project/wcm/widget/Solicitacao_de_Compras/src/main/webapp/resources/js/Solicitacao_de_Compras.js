var MyWidget = SuperWidget.extend({
    dataInit: null,
    myTable: null,
    tableData: null,
    myModalTable: null,
    modalTableData: null,
    selected: null,

    init: function () {
        if (!this.isEditMode) {
            this.loadTable();
        } else {
            $('#editDias', this.DOM).on('input', function () {
                var value = $(this).val();
                value = value.replace(/\D/g, "");
                $(this).val(value);
            });
        }
    },

    bindings: {
        local: {
            'open-modal': ['click_loadModal'],
            'save': ['click_save']
        },
        global: {}
    },

    save: function () {
        var args = {};
        args.dias = $('#editDias', this.DOM).val();
        var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({ async: false }, this.instanceId, args);
        if (result) {
            FLUIGC.toast({
                title: 'Informação: ',
                message: 'Quantidade de dias para alerta de prazo foi alterada.',
                type: 'info'
            });
        } else {
            FLUIGC.toast({
                title: 'Erro: ',
                message: 'Erro desconhecido ao salvar.',
                type: 'danger'
            });
        }
    },

    loadTable: function () {
        var that = this;
        var data = DatasetFactory.getDataset('dsSolicitacaoCompras', null, null, null).values; 
        if (data.length > 0) {
            that.myTable = FLUIGC.datatable('#myTable' + '_' + that.instanceId, {
                dataRequest: data, 
                renderContent: '.datatable',
                header: [
                    { 'title': 'Solicitação' },
                    { 'title': 'Solicitante' },
                    { 'title': 'Data da Solicitação' },
                    { 'title': 'Prazo para Compra' },
                ],
                search: {
                    enabled: true,
                    onlyEnterkey: true,
                    onSearch: function (res) {
                        if (!res) {
                            that.myTable.reload(dataInit);
                        }
                        var dataAll = that.myTable.getData();
                        var search = dataAll.filter(function (el) {

                            return el.txt_number_solicitante.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
                                el.txt_solicitante.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
                                el.txt_dt_solic.toUpperCase().indexOf(res.toUpperCase()) >= 0 ||
                                el.prazo_compra.toUpperCase().indexOf(res.toUpperCase()) >= 0;
                        });
                        if (search && search.length) {
                            that.myTable.reload(search);
                        } else {
                            FLUIGC.toast({
                                title: 'Searching: ',
                                message: 'No results',
                                type: 'success'
                            });
                        }
                    }
                },

                navButtons: {
                    enabled: false,
                },

            }, function (err, data) {
                if (data) {
                    that.dataInit = data; 
                } else if (err) {
                    FLUIGC.toast({
                        message: err,
                        type: 'danger'
                    });
                }
            });
        }

        $('#datatable-area-search').hide();
        var dias_view = parseInt($('#dias_view', this.DOM).val(), 10);
        $('tbody:first', this.DOM).find('tr').each(function() {
            var today = new Date(getToday());
            var prazo = $(this).find('td').eq(3).text();
            prazo = prazo.split('/')[1] + '/' + prazo.split('/')[0] + '/' + prazo.split('/')[2];
            prazo = new Date(prazo);
            var dif = (prazo - today) / (1000 * 60 * 60 * 24);

            var color = '';
            if (dif < 0) {
                color = 'firebrick';
            } else if (dif <= dias_view) {
                color = 'orange';
            }

            $(this).find('td').each(function() {
                var text = $(this).text();
                $(this).empty();
                if (color === 'firebrick' || color === 'orange') {
                    $(this).append($('<strong>').text(text).css("color", color));
                } else {
                    $(this).text(text);
                }
            });

            var icon1 = getIcon('flaticon flaticon-multiple-register icon-md', 'Ver solicitação', color, null);
            var A1 = $(this).find('td:first').text();
            icon1.on('click', function() {
            	var URL = WCMAPI.serverURL + '/portal/p/' + WCMAPI.getOrganizationId() + '/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + A1;
            	window.open(URL);
			});
            var icon2 = getIcon('flaticon flaticon-invoices icon-md', 'Ver produtos', color, 'data-open-modal');
            var last = $(this).find('td:last');
            last.empty();
            last.append(icon1);
            last.append(icon2);
        });
    },

    loadModal: function () {
    	var that = this;
    	var index = this.myTable.selectedRows()[0];
    	this.selected = this.myTable.getRow(index);
    	that.getDataset();
    	var myModal = $('#myModal');
    	var txtSolic = myModal.find('txtSolic');
    	txtSolic.text(this.selected.A1);
    	var URL = WCMAPI.serverURL + '/portal/p/' + WCMAPI.getOrganizationId() + '/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + this.selected.txtSolic;
    	txtSolic.attr('href', URL);
    	setTimeout(function() {
	    	var myModal = FLUIGC.modal({
	    		title: 'Preencher cotação',
	    		content: $('#myModal').html(),
	    		id: 'fluig-modal',
	    		size: 'full',
	    		actions: [{
	    			'label': 'Enviar',
	    			'bind': 'data-send'
	    		},{
	    			'label': 'Cancelar',
	    			'autoClose': true
	    		}]
	    	}, function(err, data) {
	    		if(err) {
	    			// do error handling
	    			FLUIGC.toast({
	    				message: err,
	    				type: 'danger'
	    			});
	    		} else {
	    			// do something with data
	    		}
	    	});
    	}, 250);
    },

    getDataset: function () {
    	var that = this;
		var id = this.selected["metadata#id"];
    	var version = this.selected["metadata#version"];
    	var oAprovado = DatasetFactory.createConstraint("metadata#id", id, id, ConstraintType.MUST);
    	var oJustificativa = DatasetFactory.createConstraint("metadata#version", version, version, ConstraintType.MUST);
    	var oAprovador = DatasetFactory.createConstraint("tablename", "produtos", "produtos", ConstraintType.MUST);
    	DatasetFactory.getDataset('dsSolicitacaoCompras', null, [ oAprovado, oJustificativa, oAprovador ], null, {
    		success: function(data) {
    			if (data != null && data.values != null && data.values.length > 0) {
    				that.modalTableData = data.values;
    				that.loadModalTable(that.modalTableData);
                }
    		},
    		error: function(data) {
    			FLUIGC.toast({
                    message: data,
                    type: 'danger'
                });
			}
    	});
    },

    loadModalTable: function (data) {
    	var that = this;
		that.myModalTable = FLUIGC.datatable('#myModalTable' + "_" + that.instanceId, {
		            dataRequest: data,
		            renderContent: '.template_datatable_modal',
		            header: [
		                {'title': 'Código produto'},
		                {'title': 'Descrição do produto'},
		                {'title': 'Unidade de medida'},
		                {'title': 'Quantidade'},
		                {'title': 'Fornecedor'},
		                {'title': 'Valor do produto'}
		            ],
            search: {
                enabled: false
            },
            navButtons: {
                enabled: false,
            },
            
        }, function(err, data) {
        	
					if(err) {
						//  error handling
						FLUIGC.toast({
							message: err,
							type: 'danger'
						});
				
		                } else {
		                    // something with data fluig

                    // input do fornecedor
                    $('tbody', that.DOM).eq(1).find('tr').each(function (index, element) {
                        var inputFornecedor = $(this).find('td').eq(4).find('input:first');
                        inputFornecedor.attr('id', 'txt_fornecedor_' + index);
                        inputFornecedor.on('input', function () {
                            that.modalTableData[index]['txt_fornecedor'] = $(this).val();
                        });
                        // input que retorna o valor
                        var inputValor = $(this).find('td:last').find('input:first');
                        inputValor.attr('id', 'txt_fornecedor_' + index);
                        inputValor.on('input', function () {
                            that.modalTableData[index]['txt_fornecedor'] = $(this).val();
                        });
                    });
                    
        }
});
    },

    send: function () {
    	var processInstanceId = this.selected["txt_number_solicitante"];
		
		var tipoApovado = DatasetFactory.createConstraint('txt_number_solicitante', processInstanceId, processInstanceId, ConstraintType.MUST);
		var dataset = DatasetFactory.getDataset('dsSolicitacaoCompras', null, [ tipoApovado ], ['documentid;desc']).values;
		
		var total = dataset[0]['total'];
		var targetAssignee = '';
		
		if (parseInt(total, 10) >= 10000) {
			targetAssignee = 'Pool:Role:Diretores';
		} else {
			targetAssignee = 'Pool:Role:Contabilidade';
		}
		
		var requestBody = {
		  "movementSequence": 5, // verifica a atividade atual
		  "assignee": WCMAPI.userCode, // usuário logado no sistema
		  "targetState": 10, // a proxima atividade 
		  "comment": "",
		  "subProcessTargetState": 0,
		 
		};

		var url = WCMAPI.serverURL + '/portal/p/' + WCMAPI.getOrganizationId() + "/process-management/api/v2/requests/" + processInstanceId + "/move";

		$.ajax({
		  type: "POST",
				  url: url,
				  contentType: "application/json",
				  data: JSON.stringify(requestBody),
				  success: function(data) {
				    console.log("Requisição Completa", data);
				    window.location.reload();
		  },
		  
		  error: function(xhr, textStatus, errorThrown) {
		    console.error("Erro na Requisição", textStatus, errorThrown);
		  }
		});
    }
});

function getToday() {
	 var date = new Date();
    var day  = date.getDate();
    var month  = date.getMonth() + 1;
    var year  = date.getFullYear();
    if (day <= 9) {
   	 day = "0" + day;
    }
    if (month <= 9) {
   	 month = "0" + month;
    }
    return month + "/" + day + "/" + year;
}

function getIcon(iconClass, tooltip, color, modal) {
    var icon = $('<i>');
    if (modal != null) {
        icon = $('<i ' + modal + '>');
    }

    icon.addClass('class','iconClass');

    if (tooltip != null) {
        icon.attr({
            'data-toggle': 'tooltip',
            'data-placement': 'top',
            'title': tooltip
        }).tooltip();
    }

    if (color != null) {
        icon.css('color', color);
    }

    return icon;
}

