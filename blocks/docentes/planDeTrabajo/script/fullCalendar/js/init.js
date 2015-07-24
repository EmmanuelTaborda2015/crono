/**
 * @author Jorge Ulises Useche Cuellar
 */

$(document).ready(function() {
	$.getJSON("json/actividades.json", loadCalendar);
});

function loadCalendar(data) {
	var calendario = $('#calendar');
	//	var dayClickListener = function(date, jsEvent, view) {
	////		calendario.fullCalendar('changeView', 'agendaWeek');
	////		calendario.fullCalendar('gotoDate', date);
	//
	//		// change the day's background color just for fun
	//		$(this).css('background-color', 'red');
	//
	//	};
	var selectListener = function(start, end) {
		var onSave = function(contenido) {
			var attr = $.juu.formToAttrObject(contenido);
			eventData = {
				title : attr.nombreActividad,
				start : start,
				end : end
			};
			$('#calendar').fullCalendar('renderEvent', eventData, true);
			// stick? = true
			$('#calendar').fullCalendar('unselect');
		};
		
		var values = [{
			'name' : 'nombreActividad',
			'alias' : 'Nombre de la Actividad'
		}, {
			'name' : 'observacion',
			'alias' : 'Observación'
		}];

		var contenido = $.juu.createFormWithSelects(values);
		perro = contenido;
		var options = {
			titulo : 'Parámetros de la Actividad',
			contenido : contenido,
			onSave : onSave
		};
		var dialog = $.juu.createDialog(options);
		dialog.modal('show');

	};
	calendario.fullCalendar({
		theme : true,
		header : {
			left : 'prevYear,prev,next,nextYear',
			center : 'title',
			right : 'today'
		},
		defaultDate : '2015-02-12',
		defaultView : 'agendaWeek',
		lang : 'es',
		slotDuration : '01:00:00',
		// time formats
		//		titleFormat: {
		//		    month: 'MMMM yyyy',
		//		    week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
		//		    day: 'dddd, MMM d, yyyy'
		//		},
		//		columnFormat: {
		//		    month: 'ddd',
		//		    week: 'ddd M/d',
		//		    day: 'dddd d'
		//		},
		axisFormat : 'h:mm A', //,'H(:mm)',
		timeFormat : {
			agenda : 'h:mm A' //H(:mm)'
		},
		height : 610,
		// locale
		//		buttonIcons : false, // show the prev/next text
		// weekNumbers: true,
		//		businessHours : true, // display business hours
		editable : true,
		allDaySlot : false,
		allDayText : false,
		//		eventLimit : true, // allow "more" link when too many events
		events : data.events,
		//		dayClick : dayClickListener,
		selectable : true,
		selectHelper : true,
		select : selectListener
	});

}
