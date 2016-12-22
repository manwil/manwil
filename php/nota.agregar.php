<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);


	//$id = (string)$_POST['id_nota'];
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

	$fp = $_POST['forma_pago'];
	$id_cl = $_POST['id_cliente'];
	$id_us = $_POST['id_usuario'];
	$id_em = $_POST['id_empleado'];


	mysqli_query($link,"INSERT INTO nota (cliente, empresa, vendedor,fecha_creacion, monto, baja, tc, deposito, autorizado, id_cliente, id_empleado, id_usuario, forma_pago)
	VALUES ('".$cli."','".$emp."','".$ven."','".$fec."','".$mon."','".$baj."','".$tc."','".$dep."','".$a."', '".$id_cl."','".$id_em."','".$id_us."','".$fp."')");
	//$var = $id.$cli.$emp.$a.$ven.$fec.$mon.$baj.$tc.$dep.$id_cl.$id_us.$id_em;

		
	$sql2 = 'SELECT * FROM nota';

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //recorrido de los datos de la tabla
    while($row = mysqli_fetch_array($result2)) {

		$json_grid[$cont]['id_nota'] = $row['id_nota'];

        //echo json_encode($json_grid[$cont]['sexo']);
        //$cont++;
    }

    header('Content-type: application/json; charset=utf-8');
	//echo json_encode($json_grid, JSON_FORCE_OBJECT);
	echo json_encode($json_grid);


	//echo json_encode($var);;
	mysqli_close($link);
?>