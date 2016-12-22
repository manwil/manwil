<?php
	include "conexion_bd.php";
	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

if( isset($_POST['codigo']) ) {
	$sql2 = "SELECT * FROM usuario WHERE id_usuario ='".$_POST['codigo']."'";

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());
    $psw = "";
    $mail = "";
    $user = "";
    $cont = 0;
    //$json_grid = array();
    while($row = mysqli_fetch_array($result2)) {

        $mail = $row['correo'];
        $psw = $row['password'];
        $user = $row['id_usuario'];
        $json_grid[$cont]['id_usuario'] = $user;
        $cont++;
    }

    ///////////////////////*****************///////////////////////////
    //$to = "somebody@example.com, somebodyelse@example.com";
    $to = $mail;
    $subject = "MANWIL TICONA SRL - Contraseña";

    $message = "<html><head><title>MANWIL TICONA SRL</title></head><body><p>Su contraseña es:</p>".$psw."</body></html>";

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    //$headers .= 'From: <webmaster@example.com>' . "\r\n";
    //$headers .= 'Cc: myboss@example.com' . "\r\n";

    mail($to,$subject,$message,$headers);


    ///////////////////////*****************///////////////////////////
}
    header('Content-type: application/json; charset=utf-8');
	//echo '['.json_encode($res_arr_values, JSON_FORCE_OBJECT).']';
	echo json_encode($json_grid);


	mysqli_close($link);		
?>