/*********************************************/
//controlador de angular js para imprimir reporte
/*********************************************/
var imprimir_nota = angular.module('print_reporte',['ngRoute']);
imprimir_nota.controller('notaReporteCtrl',function($scope, $http){
	
    var Vdesde = localStorage.getItem("fecha_d");
    var Vhasta = localStorage.getItem("fecha_h");
    var id = localStorage.getItem("id_vendedor");
    var vendedor = localStorage.getItem("nombre_vendedor");

    $scope.fecha_desde = Vdesde;
    $scope.fecha_hasta = Vhasta;
    $scope.n_vendedor_nombre = vendedor;

    //---ajax para filtrar nota
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.reporte.listar.todo.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { desde : Vdesde, hasta: Vhasta, id_empleado: id},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.dataReporte = dato;
                $scope.nombre_vendedor = vendedor;
                $scope.todo_canceldo = {};
                $scope.todo_debe = {};
                contc = 0;
                contd = 0;
                $scope.total_totalesc = 0;
                $scope.total_totalesd = 0;
                for (var i = 0; i < dato.length; i++) {
                    if (dato[i].baja == "CANCELADO") {
                        $scope.todo_canceldo[contc] = dato[i];
                        $scope.todo_canceldo[contc].id = contc+1;
                        $scope.total_totalesc = ($scope.total_totalesc * 1) + (dato[i].monto * 1);
                        contc++;
                    }
                }
                for (var i = 0; i < dato.length; i++) {
                    if (dato[i].baja == "DEBE") {
                        $scope.todo_debe[contd] = dato[i];
                        $scope.todo_debe[contd].id = contd+1;
                        $scope.total_totalesd = ($scope.total_totalesd * 1) + (dato[i].monto * 1);
                        contd++;
                    }
                }
                $scope.$apply();

                window.print();
                window.history.back();
            },
            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error : function(xhr, status) {
                console.log('Disculpe, existió un problema');
            },
 
            // código a ejecutar sin importar si la petición falló o no
            complete : function(xhr, status) {
                console.log('Petición realizada');
                //location.reload(); 
                //$(".notaPedido_en").val("0");
                //$(".notaPedido_ma").val("");
                //$(".notaPedido_ca").val("0");
                //$(".notaPedido_pr").val("0");
                //$(".notaPedido_su").val("0");
                //$(".notaPedido_suEdit").val("0");
            }
        });
        /////////////////////////////////////////////////////////////////////
        //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };
});

  