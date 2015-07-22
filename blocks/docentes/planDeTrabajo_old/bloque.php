<?php
?>
<script type='text/javascript'>
function cambio(ele){
	document.getElementById('frame2').style.visibility = 'visible';
	if(ele.value === '1'){
		document.getElementById('frame1').style.display = 'block';
		document.getElementById('frame2').style.display = 'none';
	} else {
		document.getElementById('frame1').style.display = 'none';
		document.getElementById('frame2').style.display = 'block';
	}
}
</script>
<select onchange='cambio(this)'>
	<option value='1'>Opción 1</option>
	<option value='2'>Opción 2</option>
</select>
<iframe id='frame1'
	src='blocks/docentes/planDeTrabajo/jquery-week-calendar/index.html'
	style='width: 100%; height: 570px;'></iframe>
<iframe id='frame2' 
	style='width: 100%; height: 795px;visibility:hidden;'
	src='blocks/docentes/planDeTrabajo/fullcalendar-2.3.2/demos/json.html'></iframe>


