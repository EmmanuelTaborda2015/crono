/**
 * @author Jorge Ulises Useche Cuellar
 */
function loadCalendar(eventData1) {
	var d = new Date();
	d.setDate(d.getDate() - d.getDay());
	var year = d.getFullYear();
	var month = d.getMonth();
	var day = d.getDate();

	eventData1.options = {
		timeslotsPerHour : 1,
		timeslotHeight : 20,
		defaultFreeBusy : {
			free : true
		}
	};
	
	$(document).ready(function() {
		var $calendar = $('#calendar').weekCalendar({
			timeslotsPerHour : 1,
			scrollToHourMillis : 0,
			height : function($calendar) {
				return $(window).height() - $('h1').outerHeight(true);
			},
			eventRender : function(calEvent, $event) {
				if (calEvent.end.getTime() < new Date().getTime()) {
					$event.css('backgroundColor', '#a55');
					$event.find('.wc-time').css({
						backgroundColor : '#900',
						border : '2px solid #800'
					});
				}
			},
			previousStart : null,
			previousEnd : null,
//			eventRefresh : function (calEvent){
//				console.log(calEvent.start,calEvent.end);
//			},
			eventResize : function (calEvent){
				/**
				 * Arregla un problema del core de jquery.weekcalendar por el cual no se actualiza
				 * el parámetro del eventoResize inmediatamente si no hasta que después de que se mueve
				 * el mismo u otros elementos
				 */
				$(calendar).weekCalendar('updateEvent', calEvent);
			},
			eventDrag : function(calEvent, element){
				this.previousStart = calEvent.start;
				this.previousEnd = calEvent.end;
				console.log(calEvent.start,calEvent.end);
//				console.log(this.previousStart,this.previousEnd);
			},
			eventDrop : function(calEvent, $event, FreeBusyManager, calendar, element){
				perro = calEvent;
				var isFree = true;
				$.each(FreeBusyManager.getFreeBusys(calEvent.start, calEvent.end), function() {
					if (this.getStart().getTime() != calEvent.end.getTime() && this.getEnd().getTime() != calEvent.start.getTime() && !this.getOption('free')) {
						isFree = false;
						return false;
					}
				});
				if (!isFree) {
					alert('No se pueden registrar horarios en este segmento.');
//					calEvent.id = calEvent.userId + '_' + calEvent.start.getTime();
					calEvent.start = this.previousStart;
					calEvent.end = this.previousEnd;
//					$(calendar).weekCalendar('updateEvent', calEvent);
					return false;
				}

//				alert('Se ha movido pero aún no se han guardado los cambios.');
//
//				calEvent.id = calEvent.userId + '_' + calEvent.start.getTime();
//				$(calendar).weekCalendar('updateFreeBusy', {
//					start : calEvent.start,
//					end : calEvent.end,
//					free : false
//				});
			},
			eventNew : function(calEvent, $event, FreeBusyManager, calendar) {
				var isFree = true;
				$.each(FreeBusyManager.getFreeBusys(calEvent.start, calEvent.end), function() {
					if (this.getStart().getTime() != calEvent.end.getTime() && this.getEnd().getTime() != calEvent.start.getTime() && !this.getOption('free')) {
						isFree = false;
						return false;
					}
				});

				if (!isFree) {
					alert('No se pueden registrar horarios en este segmento.');
					$(calendar).weekCalendar('removeEvent', calEvent.id);
					return false;
				}

				alert('Se ha creado pero aún no se han guardado los cambios.');

				calEvent.id = calEvent.userId + '_' + calEvent.start.getTime();
				$(calendar).weekCalendar('updateFreeBusy', {
					start : calEvent.start,
					end : calEvent.end,
					free : false
				});
			},
			data : function(start, end, callback) {
				if (eventData1) {
					callback(eventData1);
				} else {
					callback({
						options : {
							defaultFreeBusy : {
								free : true
							}
						},
						events : []
					});
				}
			},
			displayOddEven : true,
			displayFreeBusys : true,
			daysToShow : 7,
			switchDisplay : {
				'Entre Semana' : 5,
				'Semana Total' : 7
			},
			headerSeparator : ' ',
			useShortDayNames : true,
//			readonly: false,
//			businessHours: (6, 18, false),
			// I18N
			firstDayOfWeek : $.datepicker.regional['es'].firstDay,
			shortDays : $.datepicker.regional['es'].dayNamesShort,
			longDays : $.datepicker.regional['es'].dayNames,
			shortMonths : $.datepicker.regional['es'].monthNamesShort,
			longMonths : $.datepicker.regional['es'].monthNames,
			dateFormat : 'd F Y'
		});
	});
};

function loadEvents(){
	$.getJSON("actividades.json",loadCalendar);
};

loadEvents();
