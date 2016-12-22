<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

	if( isset($_POST['id_nota']) ) {


		$id = (string)$_POST['id_nota'];
		$cli = (string)$_POST['cliente'];
		$emp = (string)$_POST['empresa'];
		$a = (string)$_POST['autorizado'];
		$ven = (string)$_POST['vendedor'];
		$fec = (string)$_POST['fecha_creacion'];
		$mon = (string)$_POST['monto'];
		$baj = (string)$_POST['baja'];
		//$tc = (string)$_POST['tc'];
		//$dep = (string)$_POST['deposito'];
		$tc = "";
		$dep = "";
		$obs = (string)$_POST['observacion'];
		$npapel = (string)$_POST['id_nota_papel'];

		$fp = $_POST['forma_pago'];
		$id_cl = $_POST['id_cliente'];
		$id_us = $_POST['id_usuario'];
		$id_em = $_POST['id_empleado'];



		mysqli_query($link,"UPDATE nota SET cliente = '".$cli."', empresa = '".$emp."', autorizado = '".$a."', vendedor ='".$ven."', fecha_creacion = '".$fec."', monto = '".$mon."', baja = '".$baj."', tc = '".$tc."', deposito = '".$dep."', forma_pago = '".$fp."', id_cliente = '".$id_cl."', id_usuario = '".$id_us."', id_empleado = '".$id_em."', observacion = '".$obs."',id_nota_papel = '".$npapel."' WHERE id_nota = '".$id."'");

		$var = $id.', '.$cli.', '.$emp.', '.$a.', '.$ven.', '.$fec.', '.$mon.', '.$baj.', '.$tc.', '.$dep.', '.$fp.', '.$id_cl.', '.$id_us.', '.$id_em;




		mysqli_query($link,"INSERT INTO nota (id_nota, cliente, empresa, vendedor,fecha_creacion, monto, baja, tc, deposito, autorizado, id_cliente, id_empleado, id_usuario, forma_pago)
		VALUES ('".$id."','".$cli."','".$emp."','".$ven."','".$fec."','".$mon."','".$baj."','".$tc."','".$dep."','".$a."', '".$id_cl."','".$id_em."','".$id_us."','".$fp."')");
		$var = $id.$cli.$emp.$a.$ven.$fec.$mon.$baj.$tc.$dep.$id_cl.$id_us.$id_em;
	}
	echo json_encode($var);;
	mysqli_close($link);
?>