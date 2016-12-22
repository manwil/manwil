/*********************************************/
//controlador de angular js
/*********************************************/
var imprimir_nota = angular.module('print_note',['ngRoute']);
imprimir_nota.controller('Ctrl',function($scope, $http){
	

	//console.log(Math.ceil(2.3)); test de redondeo hacia arriba
	//declarar variables utilizadas para imprimir nota
	$scope.formNotaPedido = {};
	$scope.nota_id = localStorage.getItem("id_nota");
	//$scope.nota_id = "0007";
	$scope.cantidad = 0;
	$scope.cantidad = "";
	$scope.numero_n = 15;//numero limite de regstros que se muetran
	$scope.numero_N = 0;//numero de registros que devuelve la consulta en pedidos
	$scope.numero_NOTAS = 0; /// cuantas impresiiones de la nota se hara
	//ajax para llenar num nota fecha deposito  vendedor autorizado cliente de nota
    $.ajax({
        // la URL para la petición
        url : 'php/nota.listar.uno.php',
 
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { 
        	       id_nota: $scope.nota_id
        },
 
        // especifica si será una petición POST o GET
        type : 'POST',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',
 
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(dataUser) {
           	//llenar cabecera

            $scope.nota_fecha = dataUser[0].fecha_creacion;
            $scope.nota_deposito = dataUser[0].deposito;
            $scope.nota_empresa = dataUser[0].empresa;
            $scope.nota_id = dataUser[0].id_nota;
            
            $scope.nota_tc = dataUser[0].tc;
            $scope.nota_cliente = dataUser[0].cliente;
            $scope.nota_usuario = dataUser[0].autorizado;
            $scope.nota_vendedor = dataUser[0].vendedor;
            $scope.nota_total = dataUser[0].monto;
            $scope.nota_elaborado = sessionStorage.getItem("user");
            $scope.razon_social = dataUser[0].razon_social;
            $scope.nit = dataUser[0].nit;
            $scope.nota_total = dataUser[0].monto;

            if (dataUser[0].forma_pago == "contado") {
            	$scope.nota_formaPago = "CONTADO";
                $scope.fecha_vencimiento = dataUser[0].fecha_creacion;
            };
            if (dataUser[0].forma_pago == "credito") {
            	$scope.nota_formaPago = "CRÉDITO";
                var date = new Date();
                var d = new Date();
                d.setDate(date.getDate() + 15);
                var meses = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
                //var f=new Date();
                //document.write(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());
                $scope.fecha_vencimiento =  d.getDate() + " - " + meses[d.getMonth()] + " - " + d.getFullYear();
            };

            //$scope.nota_total = "25.5";
            $scope.$apply();
            //console.log($scope.nota_fecha);
            ///-----------------------------------------------------------------
    //////////////////////////////////////////////////////////////////////
    ///*****ajax para llenar pedidos
    $.ajax({
        // la URL para la petición
        url : 'php/nota.pedido.listar.php',
 
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : {
                    id_nota: $scope.nota_id
        },

        // especifica si será una petición POST o GET
        type : 'POST',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',
 
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(dato) {
            $scope.items = dato.length;

            //cortar las notas segun el numero de notas a imprimir
            /*if ($scope.numero_n <= $scope.numero_N) {
                $scope.numero_NOTAS = ($scope.numero_N / $scope.numero_n);
                $scope.nota_numeroNotaTotal = $scope.numero_NOTAS;

            }else{
                $scope.formNotaPedido = dato;   
                $scope.nota_numeroNota = 1;
                $scope.nota_numeroNotaTotal = 1;
            };*/  //por desarrollar lo de corta notas

            $scope.nota_numeroNota = 1;
            $scope.nota_numeroNotaTotal = 1;
            $scope.formNotaPedido = dato;
            $scope.masa = dato[0].masa;

            //var numera = "25.9";

            $scope.nota_total = dato[0].total;

            var res2 = dato[0].total.toString().split('.');
            //var res2 = numera.toString().split('.');
            //console.log(res2);
            var val1 = res2[0] * 1;
            var val2 = res2[1] * 1;
            if (isNaN(val2)) { 
                $(".n_son").append('<strong class="sub_remove">'+Millones(val1)+' CON '+'00/100 BOLIVIANOS</strong>');
                
            }else{
                
                $(".n_son").append('<strong class="sub_remove">'+Millones(val1)+' CON '+val2+'0/100 BOLIVIANOS</strong>');
                
            };

            for (var i = 0; i < dato.length; i++) {
                $scope.cantidad =  ($scope.cantidad * 1) + (dato[i].cantidad * 1);
            }
            $scope.cantidad =  Math.round10($scope.cantidad, -2);
            ///------divide facturas
            $scope.numero_N = $scope.items;


            $scope.$apply();
            /*verifica las salidas*/
            setTimeout(function() {
                window.history.back();
            }, 2000);
            window.print();

        },
 
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
            console.log('Disculpe, existió un problema');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {

        }
    });
    /////////////////////////////////////////////////////////////////////
        },
 
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
            console.log('Disculpe, existió un problema');
        },
 
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //console.log('Petición realizada');
            //location.href='#/usuario_listar';
            //var meses = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
            //var f=new Date();
            //document.write(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());   
            //$(".n_fechaCreacion").val(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());
        }
    });

    



    



























	$scope.n_detalle_pedido_1 = "";
	$scope.n_detalle_pu_1 = "";
	$scope.n_detalle_pedido_2 = "";
	$scope.n_detalle_pu_2 = "";
	$scope.n_detalle_pedido_3 = "";
	$scope.n_detalle_pu_3 = "";
	$scope.n_total = "";
	var cont = 0;

	//seccion de testeo///////////
	/*
	console.log(34564);
	console.log(Millones(34564));

	console.log(55.552222);
	console.log(Math.round10(55.55, -1)+"0");

	var val = 0;
	var value = 55.60
	value = value.toString().split('.');
	console.log(value);
	console.log(value[1]);

	val = value[1] * 1;
	val = val + 1;
	if(value[1] === "6"){
		console.log("funcion!!! " + val);
	}*/
	//////////////////////////////////


	//funcion total
	$( ".btn_total" ).click(function() {
		var num1 = 0;
		var num2 = 0;
		var num3 = 0;
		var num1_show = "";
		var num2_show = "";
		var num3_show = "";

		num1 = $(".sub_1").val() * 1;
		num2 = $(".sub_2").val() * 1;
		num3 = $(".sub_3").val() * 1;
		num1_show = $(".sub_1_show").val();
		num2_show = $(".sub_2_show").val();
		num3_show = $(".sub_3_show").val();

		$(".sub_remove").remove();

		var res = num1 + num2 + num3;
		res = Math.round10(res, -1);
  		
  		var res2 = res.toString().split('.');
  		//console.log(res2);
		var val1 = res2[0] * 1;
		var val2 = res2[1] * 1;
		if (isNaN(val2)) { 
			$(".total_nota").append( '<strong class="sub_remove">'+res+'.00'+'</strong>');
			$(".n_son").append('<strong class="sub_remove">'+Millones(val1)+' CON '+'00/100 BOLIVIANOS</strong>');
			$(".input_total").val(res+'.00');
		}else{
			$(".total_nota").append( '<strong class="sub_remove">'+res+'0'+'</strong>');
			$(".n_son").append('<strong class="sub_remove">'+Millones(val1)+' CON '+val2+'0/100 BOLIVIANOS</strong>');
			$(".input_total").val(res+'0');
		};
  		if (num1 > 0) {$(".sub_1").append( '<strong class="sub_remove">'+num1_show+'</strong>'); cont++;};
  		if (num2 > 0) {$(".sub_2").append( '<strong class="sub_remove">'+num2_show+'</strong>'); cont++;};
  		if (num3 > 0) {$(".sub_3").append( '<strong class="sub_remove">'+num3_show+'</strong>'); cont++;};
  		$(".n_item").append( '<strong class="sub_remove">'+cont+'</strong>');

  		num1 = $(".pedido_1").val() * 1;
		num2 = $(".pedido_2").val() * 1;
		num3 = $(".pedido_3").val() * 1;

		res = num1 + num2 + num3;
		$(".n_cantidad").append( '<strong class="sub_remove">'+res+'</strong>');
		$(".n_cantidad_u").append(' '+'<strong class="sub_remove">'+$(".n_cantidad_u_m").val()+'</strong>');
		
		

		


  		/*var numeroLiteral = new aLiteral("23");
		console.log(numeroLiteral); // veintitrés*/

  		
	});

});

  