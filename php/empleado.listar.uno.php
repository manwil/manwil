<?php
    include "conexion_bd.php";
    $link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

if( isset($_POST['codigo']) ) {
    $sql2 = "SELECT * FROM empleado WHERE id_empleado ='".$_POST['codigo']."'";

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $cont = 0;
    //recorrido de los datos de la tabla
    while($row = mysqli_fetch_array($result2)) {

        $json_grid[$cont]['id_empleado'] = $row['id_empleado'];
        $json_grid[$cont]['nombre'] = $row['nombre'];       
        $json_grid[$cont]['apellido'] = $row['apellido'];       
        $json_grid[$cont]['fecha_nacimiento']= $row['fecha_nacimiento'];
        $json_grid[$cont]['ci'] = $row['ci'];
        $json_grid[$cont]['tel_Cel'] = $row['tel_Cel'];
        $json_grid[$cont]['fecha_ingreso'] = $row['fecha_ingreso'];
        $json_grid[$cont]['fecha_retiro'] = $row['fecha_retiro'];
        $json_grid[$cont]['horario'] = $row['horario'];
        $json_grid[$cont]['cargo'] = $row['cargo'];
        $json_grid[$cont]['garante'] = $row['garante'];
        $json_grid[$cont]['hoja_vida'] = $row['hoja_vida'];
        $json_grid[$cont]['observacion'] = $row['observacion'];
        $json_grid[$cont]['sexo'] = $row['sexo'];
        $json_grid[$cont]['direccion'] = $row['direccion'];
        //echo json_encode($json_grid[$cont]['sexo']);

        $cont++;
    }
}
    header('Content-type: application/json; charset=utf-8');
    //echo json_encode($json_grid, JSON_FORCE_OBJECT);
    echo json_encode($json_grid);


    mysqli_close($link);        
?>