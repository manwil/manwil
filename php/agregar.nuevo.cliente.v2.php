<?php
    include "conexion_bd.php";
    $link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

    $apellido = "";
    if( isset($_POST['nombre']) ) {


        //$codigo = (string)$_POST['codigo'];
        $nombre = (string)$_POST['nombre'];
        if (isset($_POST['apellido'])) {
            $apellido = (string)$_POST['apellido'];
        }
        $id_em = (string)$_POST['id_empleado'];
        $n_em = (string)$_POST['nombre_empleado'];
        

        mysqli_query($link,"INSERT INTO cliente (nombre, apellido, id_empleado, nombre_empleado)
        VALUES ('".$nombre."','".$apellido."','".$id_em."','".$n_em."')");


        $sql2 = "SELECT * FROM cliente ORDER BY nombre ASC";

        $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

        $cont = 0;
        //$json_grid = array();
        while($row = mysqli_fetch_array($result2)) {

            $json_grid[$cont]['id_cliente'] = $row['id_cliente'];
            $json_grid[$cont]['nombre'] = $row['nombre']." ".$row['apellido']." -- ".$row['nombre_empresa'];  
            $json_grid[$cont]['nombre_real'] = $row['nombre']." ".$row['apellido'];  
            $json_grid[$cont]['nit'] = $row['nit']; 
            $json_grid[$cont]['direccion'] = $row['direccion'];
            $json_grid[$cont]['celular'] = $row['celular']; 
            $json_grid[$cont]['observacion'] = $row['observacion'];
            $json_grid[$cont]['nombre_empresa'] = $row['nombre_empresa']; 
            $json_grid[$cont]['id_empleado'] = $row['id_empleado'];
            $json_grid[$cont]['nombre_empleado'] = $row['nombre_empleado']; 
            $cont++;
        }
    }
    //echo json_encode($var);
    echo json_encode($json_grid);
    mysqli_close($link);
?>