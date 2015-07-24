/**
 * @author Jorge Ulises Useche Cuellar
 * ampliación de la funcionalidad para manejar recursos en el proyecto actual
 */

(function( $ ) {

$.juu = new Object();

$.juu.createDivByClass = function(clase) {
	return $("<div>")
	.addClass(clase);
};

$.juu.createButtonByClass = function(clase) {
	return $("<button>")
	.attr("type","button")
	.addClass(clase);
}

$.juu.createDialog = function(obj) {
	obj=(obj!=null)?obj:new Object();
	obj.titulo=(obj.titulo!=null)?obj.titulo:"Mi título";
	obj.closeMessage=(obj.closeMessage!=null)?obj.closeMessage:"Cerrar";
	obj.saveMessage=(obj.saveMessage!=null)?obj.saveMessage:"Guardar Actividad";
	obj.contenido=(obj.contenido!=null)?obj.contenido:"Mi contenido";
	obj.onSave=(obj.onSave!=null)?obj.onSave:function(){};
	
	var modalFade = $.juu.createDivByClass("modal fade")
	.attr("id","dialog-confirm");
	
	var modalDialog = $.juu.createDivByClass("modal-dialog")
	.appendTo(modalFade);
	
	var modalContent = $.juu.createDivByClass("modal-content")
	.appendTo(modalDialog);
	
	var modalHeader = $.juu.createDivByClass("modal-header")
	.appendTo(modalContent);
	
	var modalHeaderButton1 = $.juu.createButtonByClass("close")
	.attr("data-dismiss","modal")
	.attr("aria-hidden","true")
	.html("x")
	.appendTo(modalHeader);
	
	var modalHeaderH4 = $("<h4>")
	.addClass("modal-title")
	.html(obj.titulo)
	.appendTo(modalHeader);
	
	var modalBody = $.juu.createDivByClass("modal-body")
	.appendTo(modalContent);
	
	var modalBodyP = $("<p>")
	.appendTo(modalBody);
	
	if(typeof(obj.contenido)=='object'){
		modalBodyP.append(obj.contenido);
	} else {
		modalBodyP.html(obj.contenido);
	}
	
	var modalFooter = $.juu.createDivByClass("modal-footer")
	.appendTo(modalContent);
	
	var modalFooterButton1 = $.juu.createButtonByClass("btn btn-default")
	.attr("data-dismiss","modal")
	.html(obj.closeMessage)
	.appendTo(modalFooter);
	
	var modalFooterButton2 = $.juu.createButtonByClass("btn btn-primary")
	.html(obj.saveMessage)
	.click(function(){
		obj.onSave(obj.contenido);
		modalFade.modal('hide');
	})
	.appendTo(modalFooter);
	
	modalFade.modal();
	
    return modalFade;
};

$.juu.createFormWithSelects = function(values) {
    return $("<form>").html(
		function (){
			//values is objects with key value attributes				
			var str = new String();
			$.each(values, function (i,v){
				str += this.alias+":<br/><input type='text' name='"+this.name+"'>";
				str += (i<values.length)?'<br/>':'';		
			});
			return str;
		}()
	);
};

$.juu.formToAttrObject = function(form) {
    var obj = new Object();
    $(form).find("[name]").each(function(index){
    	obj[$(this).attr('name')] = $(this).val();
    });
    return obj;
};
 
}( jQuery ));