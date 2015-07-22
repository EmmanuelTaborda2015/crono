/**
 * @author Jorge Ulises Useche Cuellar
 */

$(document).ready(function() {
	$.getJSON("json/actividades.json", loadCalendar);
});

function loadCalendar(data) {
	var calendario = $('#calendar');
	var dayClickListener = function(date, jsEvent, view) {
		// calendario.fullCalendar('gotoDate', date);

		// change the day's background color just for fun
		$(this).css('background-color', 'red');

	};
	var selectListener = function(start, end) {
		var title = prompt('Event Title:');
		var eventData;
		if (title) {
			eventData = {
				title : title,
				start : start,
				end : end
			};
			$('#calendar').fullCalendar('renderEvent', eventData, true);
			// stick? = true
		}
		$('#calendar').fullCalendar('unselect');
	};
	calendario.fullCalendar({
		theme : true,
		header : {
			left : 'prevYear,prev,next,nextYear today',
			center : 'title',
			right : 'month,agendaWeek,agendaDay'
		},
		defaultDate : '2015-02-12',
		lang : 'es',
		buttonIcons : false, // show the prev/next text
		// weekNumbers: true,
		businessHours : true, // display business hours
		editable : true,
		eventLimit : true, // allow "more" link when too many events
		events : data.events,
		dayClick : dayClickListener,
		selectable: true,
		selectHelper: true,
		select : selectListener
	});
}
