	<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance({dias: '${dias!''}'})">
		<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
		<div class="panel panel-primary">
			<div class="panel-heading">
				<h3 class="panel-title">Cotação de solicitação de compras</h3>
			</div>
			<div class="panel-body">
				<div id="newTable_${instanceId}"></div>
	    	</div>
	    	<input type="hidden" name="viewDias" id="viewDias" value="${dias!''}" />
		</div>
	<div class="fluig-style-guide" id="myModal" style="display: none;">
		<form name="form" role="form" class="container">
			<div class="row">
				<h2>Solicitação <a id="a_txt_number_solicitante" href="" target="_blank" style="color: steelblue;"></a></h2>
			</div>
			
			<div class="row">
				<div id="myModalTable_${instanceId}"></div>
			</div>
		</form>
	</div>
</div>
	
		<script type="template" class="datatable">
		    <tr>
		        <td>
		        {{txt_number_solicitante}}
		        </td>
		        
		        <td>
		        {{txt_solicitante}}
		        </td>
		        
		        <td>
		        {{txt_dt_solic}}
		        </td>
		        
		        <td>
		        {{prazo_compra}}
		        </td>
		        
		        <td></td>
		    </tr>
		</script>
		
		<script type="text/template" class="template_datatable_modal">
		    <tr>
		        <td>
		        {{txt_codigo_produto}}
		        </td>
		        
		        <td>
		        {{txt_descr_produto}}
		        </td>
		        
		        <td>
		        {{txt_unidade_medida}}
		        </td>
		        
		        <td>
		        {{txt_quantidade}}
		        </td>
		        
		        <td>
		        	<input type="text" class="form-control" value="{{txt_fornecedor}}" />
		        </td>
		        
		        <td>
		        	<input type="text" class="form-control" value="{{txt_valor_cotado}}" mask="#.###.##0,00" placeholder="0,00" />
		        </td>
		    </tr>
		</script>
		