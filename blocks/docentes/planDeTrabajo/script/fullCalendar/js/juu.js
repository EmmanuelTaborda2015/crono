/**
 * @author Jorge Ulises Useche Cuellar
 * ampliación de la funcionalidad para manejar recursos en el proyecto actual
 */

(function( $ ) {

$.juu = new Object();

$.juu.crearDivPorClase = function(clase) {
	return $("<div>")
	.addClass(clase);
}
$.juu.crearButtonPorClase = function(clase) {
	return $("<button>")
	.attr("type","button")
	.addClass(clase);
}
$.juu.crearDialogo = function(obj) {
	obj=(obj!=null)?obj:new Object();
	obj.titulo=(obj.titulo!=null)?obj.titulo:"Mi título";
	obj.closeMessage=(obj.closeMessage!=null)?obj.closeMessage:"Cerrar";
	obj.saveMessage=(obj.saveMessage!=null)?obj.saveMessage:"Guardar Actividad";
	obj.contenido=(obj.contenido!=null)?obj.contenido:"Mi contenido";
	
	var modalFade = $.juu.crearDivPorClase("modal fade")
	.attr("id","dialog-confirm");
	
	var modalDialog = $.juu.crearDivPorClase("modal-dialog")
	.appendTo(modalFade);
	
	var modalContent = $.juu.crearDivPorClase("modal-content")
	.appendTo(modalDialog);
	
	var modalHeader = $.juu.crearDivPorClase("modal-header")
	.appendTo(modalContent);
	
	var modalHeaderButton1 = $.juu.crearButtonPorClase("close")
	.attr("data-dismiss","modal")
	.attr("aria-hidden","true")
	.html("x")
	.appendTo(modalHeader);
	
	var modalHeaderH4 = $("<h4>")
	.addClass("modal-title")
	.html(obj.titulo)
	.appendTo(modalHeader);
	
	var modalBody = $.juu.crearDivPorClase("modal-body")
	.appendTo(modalContent);
	
	var modalBodyP = $("<p>")
	.html(obj.contenido)
	.appendTo(modalBody);
	
	var modalFooter = $.juu.crearDivPorClase("modal-footer")
	.appendTo(modalContent);
	
	var modalFooterButton1 = $.juu.crearButtonPorClase("btn btn-default")
	.attr("data-dismiss","modal")
	.html(obj.closeMessage)
	.appendTo(modalFooter);
	
	var modalFooterButton2 = $.juu.crearButtonPorClase("btn btn-primary")
	.html(obj.saveMessage)
	.appendTo(modalFooter);
	
	modalFade.modal('show');
	
    return modalFade;
};

$.juu.fn = function() {
    // Close popup code.
};
 
}( jQuery ));