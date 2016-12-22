<?php
    include "conexion_bd.php";
    $link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

    if (isset($_POST['desde']) and isset($_POST['hasta'])) {
        
        

        mysqli_query($link,"UPDATE nota SET  baja ='".$_POST['baja']."', autorizado ='".$_POST['autorizado']."', id_usuario ='".$_POST['id_usuario']."', fecha_baja = '".$_POST['fecha_baja']."' WHERE id_nota = '".$_POST['id_nota']."'");
        $var = "modificado";



        if ($_POST['id_empleado'] != "todo") {
            $sql2 = "SELECT * FROM nota WHERE (fecha_creacion BETWEEN '".$_POST['desde']."'  AND '".$_POST['hasta']."') AND id_empleado = '".$_POST['id_empleado']."'ORDER BY fecha_creacion";
        }else{
            $sql2 = "SELECT * FROM nota WHERE (fecha_creacion BETWEEN '".$_POST['desde']."'  AND '".$_POST['hasta']."') ORDER BY fecha_creacion";
        }
        

        //$sql2 = "SELECT * FROM nota WHERE ('".$_POST['desde']."') <=  fecha_creacion  AND  fecha_creacion <='".$_POST['hasta']."'";

        $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

        $cont = 0;
        $total = 0.0;
        //recorrido de los datos de la tabla
        while($row = mysqli_fetch_array($result2)) {

            $total = $total + round($row['monto'], 1);
            $json_grid[$cont]['id_nota'] = $row['id_nota'];
            $json_grid[$cont]['cliente'] = $row['cliente'];
            $json_grid[$cont]['empresa'] = $row['empresa'];     
            $json_grid[$cont]['autorizado'] = $row['autorizado'];       
            $json_grid[$cont]['vendedor']= $row['vendedor'];
            $json_grid[$cont]['fecha_creacion'] = $row['fecha_creacion'];
            $json_grid[$cont]['monto'] = $row['monto'];
            $json_grid[$cont]['baja'] = $row['baja'];
            $json_grid[$cont]['id_nota_papel'] = $row['id_nota_papel'];
            //$json_grid[$cont]['tc'] = $row['tc'];
            //$json_grid[$cont]['deposito'] = $row['deposito'];
            $json_grid[$cont]['tc'] = "";
            $json_grid[$cont]['deposito'] = "";
            $json_grid[$cont]['fecha_baja'] = $row['fecha_baja'];

            //echo json_encode($json_grid[$cont]['sexo']);
            $cont++;
        }

    }
    $json_grid[0]['total_monto'] = round($total, 1);

    header('Content-type: application/json; charset=utf-8');
    //echo json_encode($json_grid, JSON_FORCE_OBJECT);
    echo json_encode($json_grid);


    mysqli_close($link);        
?>