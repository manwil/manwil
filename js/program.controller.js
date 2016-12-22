var app = angular.module('program', ['ngGrid' , 'ngRoute']);


//***************************************controller*******************************
app.controller("productoCtrl", function($scope, $http, $location) {
    console.log(sessionStorage.getItem("activo"));
    $scope.datoElimina = "";
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    //dimension de json
    //$http.get('largeLoad.json').success(function (largeLoad) {      
      //  $scope.total=largeLoad.length; 
        //console.log($scope.total);
    //});  

    $scope.pagingOptions = {
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        //$(".carga-info").css("display", "block");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                // la URL para la petición
                url : 'php/producto.listar.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { id : 123 },
 
                // especifica si será una petición POST o GET
                type : 'POST',
 
                // el tipo de información que se espera de respuesta
                dataType : 'json',
 
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(largeLoad) {
                data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                    //$(".carga-info").css("display", "none");
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
                }
            });

                /////////////////////////////////////////////////////////////////////

                //$http.post('../php/producto.listar.php').success(function (largeLoad) {      
                  //  data = largeLoad.filter(function(item) {
                    //    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //});
                    //$scope.setPagingData(data,page,pageSize);
               // });        
            } else {
                $http.post('php/producto.listar.php').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                    $(".carga-info").css("display", "none");
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    $scope.gridOptions = {
        i18n:'es',
        data: 'myData',
        enablePaging: true,
        enableRowSelection: false,
        enableColumnResize:true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [
                     {field: 'id_producto', displayName:'', cellTemplate: '<div ng-click="producto_modificar(row.entity.id_producto)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'id_producto', displayName:'', cellTemplate: '<div ng-click="producto_eliminar(row.entity.id_producto)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'id_producto', displayName: 'Codigo', width:100}, 
                     {field: 'nombre', displayName: 'NOMBRE', width:150},
                     {field:'precio_fabrica', displayName:'Bs. c/fact.', width: 150}, 
                     {field:'precio_sinFactura', displayName:'Bs. s/fact.', width:150},
                     {field:'precio_preventista', displayName:'PREVENTISTA', width:150},
                     {field:'precio_megas', displayName:'MEGAS', width:150},
                     {field:'observacion', displayName:'OBSERVACION', width:100}
                     ]

    };
    //////////////////////////////////////////////////////////////////////
    //modificar
    $scope.producto_modificar = function(a){
        localStorage.setItem("id_modifica", a);
        console.log(localStorage.getItem('id_modifica'));
        location.href='#/producto_modificar';  
    };
    /////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //funcion para eliminar en base de datos
    $scope.producto_eliminar = function(a) {
        localStorage.setItem("id_borrar", a);
        $("#myModal").modal();  
    };
    ///////////////////////////////////////////////

    $scope.producto_eliminar_modal = function(data) {
        $('#myModal').modal('hide');
        var id_borra = localStorage.getItem("id_borrar");
        //$(".carga-info").css("display", "block");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/producto.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //$scope.$apply();
                //$(".carga-info").css("display", "none");
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
                location.reload(); 
            }
        });

        /////////////////////////////////////////////////////////////////////
    };

});

app.controller("productoAgregarCtrl", function($scope, $http) {
    $scope.producto_codigo = "";
    $scope.producto_nombre = "";
    $scope.precio_preventista = "";
    $scope.precio_sinFactura = "";
    $scope.producto_precioFabrica = "";
    $scope.producto_observacion = "";
    $scope.precio_megas = "";

    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.producto_guardar = function() {
        $.ajax({
            // la URL para la petición
            url : 'php/producto.agregar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.producto_codigo,
                nombre : $scope.producto_nombre,
                precio_sinFactura : $scope.precio_sinFactura,
                precio_megas : $scope.precio_megas,
                precio_preventista : $scope.precio_preventista,
                precio : $scope.producto_precioFabrica,
                observacion : $scope.producto_observacion

            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
               location.href='#/producto';
            }
        });
    };
    /////////////////////////////////////////////////////////////////////
    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});

app.controller("productoModificarCtrl", function($scope, $http) {


    $scope.producto_codigo = localStorage.getItem("id_modifica");
    $(".carga-info").css("display", "block");
    $.ajax({
            // la URL para la petición
            url : 'php/producto.listar.uno.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.producto_codigo
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);

                $(".codigo_pro").val(data[0].id_producto);
                $(".nombre_pro").val(data[0].nombre);
                $(".precio_sinFact").val(data[0].precio_sinFactura);
                $(".precio_pre").val(data[0].precio_preventista);
                $(".precio_pro").val(data[0].precio_fabrica);
                $(".precio_me").val(data[0].precio_megas);
                $(".observacion_pro").val(data[0].observacion);


                $scope.producto_nombre = data[0].nombre;
                $scope.precio_sinFactura = data[0].precio_sinFactura;
                $scope.precio_preventista = data[0].precio_preventista;
                $scope.producto_precioFabrica = data[0].precio_fabrica;
                $scope.producto_observacion = data[0].observacion;
                $scope.precio_megas = data[0].precio_megas;


                $(".carga-info").css("display", "none");
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
               //location.href='#/producto';
            }
        });


    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.producto_modificar_btn = function() {
        //console.log($scope.producto_nombre);

        $.ajax({
            // la URL para la petición
            url : 'php/producto.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.producto_codigo,
                nombre : $scope.producto_nombre,
                precio_sinFactura : $scope.precio_sinFactura,
                precio_preventista : $scope.precio_preventista,
                precio_megas : $scope.precio_megas,
                precio : $scope.producto_precioFabrica,
                observacion : $scope.producto_observacion
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
               location.href='#/producto';
            }
        });
    };
    /////////////////////////////////////////////////////////////////////
    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});

//----------- CLIENTE
/////////////////////*************--------**********/////////////////
app.controller("clienteListarCtrl", function($scope, $http, $location) {
    $scope.datoElimina = "";
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    //dimension de json
    //$http.get('largeLoad.json').success(function (largeLoad) {      
      //  $scope.total=largeLoad.length; 
        //console.log($scope.total);
    //});  

    $scope.pagingOptions = {
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        //$(".carga-info").css("display", "block");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                // la URL para la petición
                url : 'php/cliente.listar.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { id : 123 },
 
                // especifica si será una petición POST o GET
                type : 'POST',
 
                // el tipo de información que se espera de respuesta
                dataType : 'json',
 
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(largeLoad) {
                data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                    $(".carga-info").css("display", "none");
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
                }
            });

            /////////////////////////////////////////////////////////////////////
              //$http.post('../php/producto.listar.php').success(function (largeLoad) {      
                  //  data = largeLoad.filter(function(item) {
                    //    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //});
                    //$scope.setPagingData(data,page,pageSize);
               // });        
            } else {
                $http.post('php/cliente.listar.php').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                    //$(".carga-info").css("display", "none");
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    $scope.gridOptions = {
        i18n:'es',
        data: 'myData',
        enablePaging: true,
        enableRowSelection: false,
        enableColumnResize: true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [
                     {field:'id_cliente', displayName:'', cellTemplate: '<div ng-click="cliente_modificar(row.entity.id_cliente)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field:'id_cliente', displayName:'', cellTemplate: '<div ng-click="cliente_eliminar(row.entity.id_cliente)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field:'nombre', displayName: 'NOMBRE APELLIDO',width:150}, 
                     {field:'nombre_empresa', displayName:'EMPRESA',width:150},
                     {field:'nombre_empleado', displayName:'VENDEDOR',width:150},
                     {field:'razon_social', displayName:'RAZON SOCIAL',width:150},
                     {field:'nit', displayName:'NIT',width:150},
                     {field:'direccion', displayName:'DIRECCION',width:150},
                     {field:'celular', displayName:'TELEFONO',width:150},
                     {field:'observacion', displayName:'OBSERVACION',width:150}                     
                     ]

    };
    //////////////////////////////////////////////////////////////////////
    //modificar
    $scope.cliente_modificar = function(a){
        localStorage.setItem("id_modifica", a);
        console.log(localStorage.getItem('id_modifica'));
        location.href='#/cliente_modificar';  
    };
    /////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //funcion para eliminar en base de datos
    $scope.cliente_eliminar = function(a) {
        localStorage.setItem("id_borrar", a);
        $("#myModal").modal();  
    };
    ///////////////////////////////////////////////

    $scope.cliente_eliminar_modal = function(data) {
        $('#myModal').modal('hide');
        var id_borra = localStorage.getItem("id_borrar");
        //$(".carga-info").css("display", "block");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/cliente.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //$scope.$apply();
                //$(".carga-info").css("display", "none");
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
                location.reload(); 
            }
        });

        /////////////////////////////////////////////////////////////////////
    };

});

app.controller("clienteAgregarCtrl", function($scope, $http) {
    $scope.cliente_codigo = "";
    $scope.cliente_nombre = "";
    $scope.cliente_apellido = "";
    $scope.cliente_nombreE = "";
    $scope.cliente_nit = "";
    $scope.cliente_direccion = "";
    $scope.cliente_celular = "";
    $scope.cliente_observacion = "";
    $scope.cliente_razonSocial = "";
    $scope.cliente_id_empleado = "";
    $scope.cliente_nombreEmpleado = "";


    $(".carga-info").css("display", "block");
    //**-----------llenar vendedores a cliente
    ////carga de vendedor para llenar nota
    $.ajax({
            // la URL para la petición
            url : 'php/cliente.vendedor.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                cargo: "Vendedor"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $scope.datacv = {
                        availableOptionsClienteVendedor: dataUser
                };
                $scope.selectedClienteVendedor = dataUser;
                /*for(i=0; i<dataUser.length;i++){
                    if ( dataUser[i].id_empleado == $scope.formDataNotaModificar.id_empleado) {
                        $scope.selectedVendedor = dataUser[i];
                    };
                };*/
                $scope.$apply();
                $(".carga-info").css("display", "none");
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
            }
        });

    //**-------funcion para anadir los vendedores a la tabla cliente
    $scope.hasChangedClienteVendedor = function() {
        $scope.cliente_id_empleado = $scope.selectedClienteVendedor.id_empleado;
        $scope.cliente_nombreEmpleado = $scope.selectedClienteVendedor.nombre;
        //console.log($scope.selectedClienteVendedor.id_empleado + $scope.selectedClienteVendedor.nombre);
    };

    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.cliente_guardar = function() {
        $.ajax({
            // la URL para la petición
            url : 'php/cliente.agregar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                //codigo : $scope.cliente_codigo,
                nombre : $scope.cliente_nombre,
                apellido : $scope.cliente_apellido,
                nombreE : $scope.cliente_nombreE,
                nit : $scope.cliente_nit,
                direccion : $scope.cliente_direccion,
                celular : $scope.cliente_celular,
                observacion : $scope.cliente_observacion,
                razon_social : $scope.cliente_razonSocial,
                id_empleado : $scope.cliente_id_empleado,
                nombre_empleado : $scope.cliente_nombreEmpleado
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
               location.href='#/cliente';
            }
        });
    };
    /////////////////////////////////////////////////////////////////////

    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});

app.controller("clienteModificarCtrl", function($scope, $http) {
    $scope.cliente_codigo = localStorage.getItem("id_modifica");
    $(".carga-info").css("display", "block");
    $.ajax({
            // la URL para la petición
            url : 'php/cliente.listar.uno.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.cliente_codigo
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);

                $(".codigo_pro").val(data[0].id_cliente);
                $(".nombre_pro").val(data[0].nombre);
                $(".apellido_pro").val(data[0].apellido);
                $(".nombreE_pro").val(data[0].nombre_empresa);
                $(".nit_pro").val(data[0].nit);
                $(".direccion_pro").val(data[0].direccion);
                $(".celular_pro").val(data[0].celular);
                $(".observacion_pro").val(data[0].observacion);
                $(".c_razonSocial").val(data[0].razon_social);

                $scope.cliente_nombre = data[0].nombre;
                $scope.cliente_apellido = data[0].apellido;
                $scope.cliente_nombreE = data[0].nombre_empresa;
                $scope.cliente_nit = data[0].nit;
                $scope.cliente_direccion = data[0].direccion;
                $scope.cliente_celular = data[0].celular;
                $scope.cliente_observacion = data[0].observacion;
                $scope.cliente_razonSocial = data[0].razon_social;
                $scope.cliente_id_empleado = data[0].id_empleado;
                $scope.cliente_nombreEmpleado = data[0].nombre_empleado;

                /********/
                //**-----------llenar vendedores a cliente
                ////carga de vendedor para llenar nota
                $.ajax({
                        // la URL para la petición
                        url : 'php/cliente.vendedor.listar.php',
 
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            cargo: "Vendedor"
                        },
 
                        // especifica si será una petición POST o GET
                        type : 'POST',
 
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
 
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(dataUser) {
                            //console.log(dataUser);
                            $scope.datacv = {
                                    availableOptionsClienteVendedor: dataUser
                            };
                            //$scope.selectedClienteVendedor = dataUser[0];
                            for(i=0; i<dataUser.length;i++){
                                if ( dataUser[i].id_empleado == $scope.cliente_id_empleado) {
                                    $scope.selectedClienteVendedor = dataUser[i];
                                };
                            };
                            $scope.$apply();
                            $(".carga-info").css("display", "none");

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
                        }
                    });

            /************************/
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
               //location.href='#/producto';
            }
        });

    
    //**-------funcion para anadir los vendedores a la tabla cliente
    $scope.hasChangedClienteVendedor = function() {
        $scope.cliente_id_empleado = $scope.selectedClienteVendedor.id_empleado;
        $scope.cliente_nombreEmpleado = $scope.selectedClienteVendedor.nombre;
        //console.log($scope.selectedClienteVendedor.id_empleado + $scope.selectedClienteVendedor.nombre);
    };



    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.cliente_modificar_btn = function() {
        //console.log($scope.producto_nombre);

        $.ajax({
            // la URL para la petición
            url : 'php/cliente.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.cliente_codigo,
                nombre : $scope.cliente_nombre,
                apellido : $scope.cliente_apellido,
                nombreE : $scope.cliente_nombreE,
                nit : $scope.cliente_nit,
                direccion : $scope.cliente_direccion,
                celular : $scope.cliente_celular,
                observacion : $scope.cliente_observacion,
                razon_social : $scope.cliente_razonSocial,
                id_empleado : $scope.cliente_id_empleado,
                nombre_empleado : $scope.cliente_nombreEmpleado
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
               location.href='#/cliente';
            }
        });
    };

    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };
});
//////////////////

///----------- EMPLEADO
app.controller("empleadoListarCtrl", function($scope, $http) {
    //funcionamiento de la session
    console.log(sessionStorage.getItem("activo")+ " empleado");

    ///ng grid v1******************** 
    $scope.datoElimina = "";
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        //$(".carga-info").css("display", "block");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                    // la URL para la petición
                    url : 'php/empleado.listar.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { id : 123 },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                    $scope.setPagingData(data,page,pageSize);
                    //$(".carga-info").css("display", "none");
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
                    }
                });

                /////////////////////////////////////////////////////////////////////

                //$http.post('../php/producto.listar.php').success(function (largeLoad) {      
                  //  data = largeLoad.filter(function(item) {
                    //    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //});
                    //$scope.setPagingData(data,page,pageSize);
               // });        
            } else {
                $http.post('php/empleado.listar.php').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                    $(".carga-info").css("display", "none");
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    //////// configuracion de las columnas del ng grid
    $scope.gridOptions = {
        i18n:'es',
        data: 'myData',
        enablePaging: true,
        enableRowSelection: false,
        enableColumnResize : true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [
                     {field: 'id_empleado', displayName:'', cellTemplate: '<div ng-click="empleado_modificar(row.entity.id_empleado)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width: 30},
                     {field: 'id_empleado', displayName:'', cellTemplate: '<div ng-click="empleado_eliminar(row.entity.id_empleado)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width: 30},
                     {field: 'nombre', displayName: 'NOMBRE', width: 150}, 
                     {field: 'apellido', displayName: 'APELLIDO', width: 150},
                     {field:'direccion', displayName:'DIRECCIÓN', width:100},
                     {field:'sexo', displayName:'SEXO', width:100}, 
                     {field:'fecha_nacimiento', displayName:'FECHA NACIMIENTO',width: 100},
                     {field:'ci', displayName:'C.I.', width:100},
                     {field:'tel_Cel', displayName:'TEL. / Cel.', width:100},
                     {field:'fecha_ingreso', displayName:'COMENZO', width:100},
                     {field:'fecha_retiro', displayName:'TERMINO', width:100},
                     {field:'horario', displayName:'HORARIO', width:150},
                     {field:'cargo', displayName:'CARGO', width:100},
                     {field:'garante', displayName:'GARANTE', width:100},
                     {field:'hoja_vida', displayName:'C.V.', width:100},
                     {field:'observacion', displayName:'OBSERVACION',width:100}                     
                     ]

    };
    //////////////////////////////////////////////////////////////////////
    //modificar
    $scope.empleado_modificar = function(a){
        localStorage.setItem("id_modifica", a);
        console.log(localStorage.getItem('id_modifica'));
        location.href='#/empleado_modificar';  
    };
    /////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////
    //funcion para eliminar en base de datos
    $scope.empleado_eliminar = function(a) {
        localStorage.setItem("id_borrar", a);
        $("#myModal").modal();  
    };
    ///////////////////////////////////////////////
    $scope.empleado_eliminar_modal = function() {
        $('#myModal').modal('hide');
        var id_borra = localStorage.getItem("id_borrar");
        //$(".carga-info").css("display", "block");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/empleado.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //$scope.$apply();
                //$(".carga-info").css("display", "none");
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
                location.reload(); 
            }
        });
        /////////////////////////////////////////////////////////////////////
    };    
});
//////////////////////AGREGAR EMPEADO**********************
app.controller("empleadoAgregarCtrl", function($scope, $http) {
    $scope.formData = {};

    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.empleado_agregar = function() {
        $.ajax({
            // la URL para la petición
            url : 'php/empleado.agregar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formData,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
               location.href='#/empleado_listar';
            }
        });
    };
    /////////////////////////////////////////////////////////////////////
    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };
});
////////////////////////////////****************************

///////EMPLEADO MODIFIACAR*****************************
app.controller("empleadoModificarCtrl", function($scope, $http) {
    $scope.formData = {};
    $scope.formDataSend = {};
    $scope.empleado_codigo = localStorage.getItem("id_modifica");
    $(".carga-info").css("display", "block");
    $.ajax({
            // la URL para la petición
            url : 'php/empleado.listar.uno.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.empleado_codigo
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);

                $(".emp_co").val(data[0].id_empleado);
                $(".emp_no").val(data[0].nombre);
                $(".emp_ap").val(data[0].apellido);
                $(".emp_fn").val(data[0].fecha_nacimiento);
                $(".emp_ci").val(data[0].ci);
                $(".emp_te").val(data[0].tel_Cel);
                $(".emp_fi").val(data[0].fecha_ingreso);
                $(".emp_fr").val(data[0].fecha_retiro);
                $(".emp_ho").val(data[0].horario);
                $(".emp_ca").val(data[0].cargo);
                $(".emp_ga").val(data[0].garante);
                $(".emp_hv").val(data[0].hoja_vida);
                $(".emp_ob").val(data[0].observacion);
                $(".emp_se").val(data[0].sexo);
                $(".emp_di").val(data[0].direccion);

                $scope.formData.empleado_codigo = data[0].id_empleado;
                //$scope.formData2.empleado_nombre = data[0].nombre;
                //$scope.formData2.empleado_apellido = data[0].apellido;
                //$scope.formData2.empleado_fechaNacimiento = data[0].fecha_nacimiento;
                //$scope.formData2.empleado_ci = data[0].ci;
                //$scope.formData2.empleado_telCel = data[0].tel_Cel;
                //$scope.formData2.empleado_fechaIngreso = data[0].fecha_ingreso;
                //$scope.formData2.empleado_fechaRetiro = data[0].fecha_retiro;
                //$scope.formData2.empleado_horario = data[0].horario;
                //$scope.formData2.empleado_cargo = data[0].cargo;
                //$scope.formData2.empleado_garante = data[0].garante;
                //$scope.formData2.empleado_hojaVida = data[0].hoja_vida;
                //$scope.formData2.empleado_observacion = data[0].observacion;
                //$scope.formData2.empleado_sexo = data[0].sexo;
                //$scope.formData2.empleado_direccion = data[0].direccion;
                $(".carga-info").css("display", "none");

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
               //location.href='#/producto';
            }
        });


    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.empleado_modificar_btn = function() {
        console.log($scope.formData);
        $scope.formDataSend.empleado_codigo = $(".emp_co").val();
        $scope.formDataSend.empleado_nombre = $(".emp_no").val();
        $scope.formDataSend.empleado_apellido = $(".emp_ap").val();
        $scope.formDataSend.empleado_fechaNacimiento = $(".emp_fn").val();
        $scope.formDataSend.empleado_ci = $(".emp_ci").val();
        $scope.formDataSend.empleado_telCel = $(".emp_te").val();
        $scope.formDataSend.empleado_fechaIngreso = $(".emp_fi").val();
        $scope.formDataSend.empleado_fechaRetiro = $(".emp_fr").val();
        $scope.formDataSend.empleado_horario = $(".emp_ho").val();
        $scope.formDataSend.empleado_cargo = $(".emp_ca").val();
        $scope.formDataSend.empleado_garante = $(".emp_ga").val();
        $scope.formDataSend.empleado_hojaVida = $(".emp_hv").val();
        $scope.formDataSend.empleado_observacion = $(".emp_ob").val();
        $scope.formDataSend.empleado_sexo = $(".emp_se").val();
        $scope.formDataSend.empleado_direccion = $(".emp_di").val();

        $.ajax({
            // la URL para la petición
            url : 'php/empleado.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formDataSend,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
                location.href='#/empleado_listar';
            }
        });
    };
    /////////////////////////////////////////////////////////////////////

    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };
});
/////**************************************************

///----------- USUARIO
app.controller("usuarioListarCtrl", function($scope, $http) {
    //funcionamiento de la session
    console.log(sessionStorage.getItem("activo")+ " usuario");

    ///ng grid v1******************** 
    $scope.datoElimina = "";
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        //$(".carga-info").css("display", "block");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                    // la URL para la petición
                    url : 'php/usuario.listar.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { id : 123 },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                    $scope.setPagingData(data,page,pageSize);
                    //$(".carga-info").css("display", "none");
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
                    }
                });

                /////////////////////////////////////////////////////////////////////

                //$http.post('../php/producto.listar.php').success(function (largeLoad) {      
                  //  data = largeLoad.filter(function(item) {
                    //    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //});
                    //$scope.setPagingData(data,page,pageSize);
               // });        
            } else {
                $http.post('php/usuario.listar.php').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                    $(".carga-info").css("display", "none");
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    //////// configuracion de las columnas del ng grid
    $scope.gridOptions = {
        i18n:'es',
        data: 'myData',
        enablePaging: true,
        enableRowSelection: false,
        enableColumnResize : true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [{field: 'id_usuario', displayName:'', cellTemplate: '<div ng-click="usuario_modificar(row.entity.id_usuario)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>', width: 30},
                     {field: 'id_usuario', displayName:'', cellTemplate: '<div ng-click="usuario_eliminar(row.entity.id_usuario)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>', width: 30},
                     {field: 'id_usuario', displayName: 'USUARIO', width: 100}, 
                     {field:'nombre', displayName:'Nombre', width: 170},
                     {field:'correo', displayName:'CORREO', width: 170},
                     {field:'rol', displayName:'ROL', width: 100},
                     {field:'observacion', displayName:'OBSERVACION', width: 150}
                     ]

    };
    //////////////////////////////////////////////////////////////////////
    //modificar
    $scope.usuario_modificar = function(a){
        localStorage.setItem("id_modifica", a);
        console.log(localStorage.getItem('id_modifica'));
        location.href='#/usuario_modificar';  
    };
    /////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////
    //funcion para eliminar en base de datos
    $scope.usuario_eliminar = function(a) {
        localStorage.setItem("id_borrar", a);
        $("#myModal").modal();  
    };
    ///////////////////////////////////////////////
    $scope.usuario_eliminar_modal = function() {
        $('#myModal').modal('hide');
        var id_borra = localStorage.getItem("id_borrar");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/usuario.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //$scope.$apply();
                //$(".carga-info").css("display", "none");
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
                location.reload(); 
            }
        });
        /////////////////////////////////////////////////////////////////////
    };    
});
app.controller("usuarioAgregarCtrl", function($scope, $http) {
    $(".carga-info").css("display", "block");
    ////carga de empleados para llenar usuario
    $.ajax({
            // la URL para la petición
            url : 'php/usuario.empleado.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                id: 123
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $scope.data = {
                        availableOptions: dataUser,
                        selectedOption: {id_empleado: '106', nombre: 'ivan pro' , ci: '888862 LP'} //This sets the default value of the select in the ui
                    };

                $scope.$apply();
                $(".carga-info").css("display", "none");
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
            }
        });
    ////////////////////////////////////////////////////////////
    $scope.agregarUsuarioForm = function(dato){
        console.log(dato);
        ////carga de empleados para llenar usuario
        $.ajax({
            // la URL para la petición
            url : 'php/usuario.agregar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : dato,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                console.log(dataUser);
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
               location.href='#/usuario_listar';
            }
        });
    }

    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };
});
app.controller("usuarioModificarCtrl", function($scope, $http) {
    $scope.formData = {};
    $scope.formDataSend = {};
    $scope.usuario_codigo = localStorage.getItem("id_modifica");
    var conteo = 0;

    $(".carga-info").css("display", "block");
    $.ajax({
            // la URL para la petición
            url : 'php/usuario.listar.uno.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.usuario_codigo
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);

                $(".id_usuario_u").val(data[0].id_usuario);
                $(".nombre_usuario").val(data[0].nombre);
                $(".usuario_im").val(data[0].imagen);
                $(".usuario_ob").val(data[0].observacion);
                $(".usuario_co").val(data[0].password);
                $(".correo_u").val(data[0].correo);

                if (data[0].rol == "administrador") {
                    $(".admin").prop("checked", true);
                }else{
                    $(".otros").prop("checked", true);
                };
                
                $scope.formDataSend.id_empleado = data[0].id_empleado;
                $scope.formDataSend.id_usuario = data[0].id_usuario;
                $scope.$apply();
                $(".carga-info").css("display", "none");
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
               //location.href='#/producto';
            }
        });


    //////////////////////////////////////////////////////////////////////
    //funcion para guardar en base de datos
    $scope.usuario_modificar_btn = function() {
        console.log($scope.formData);
              
        $scope.formDataSend.nombre = $(".nombre_usuario").val();
        $scope.formDataSend.imagen = $(".usuario_im").val();
        $scope.formDataSend.observacion = $(".usuario_ob").val();
        $scope.formDataSend.password = $(".usuario_co").val();
        $scope.formDataSend.correo = $(".correo_u").val();
        $scope.formDataSend.rol = $('input[name=rol]:checked').val();

        $.ajax({
            // la URL para la petición
            url : 'php/usuario.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formDataSend,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);
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
                location.href='#/usuario_listar';
            }
        });
    };
    /////////////////////////////////////////////////////////////////////
    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };
    // funcion para ocultar el password
     
    $scope.mostrar_password=function(){
        //alert ("presiono boton");
    ///$scope.click(mostrar_password=function() { //Funcion del Click
    if(conteo == 0) { //Si la variable es igual a 0
        conteo = 1; //La cambiamos a 1
        $("#pass").removeAttr("type", "password"); //Removemos el atributo de Tipo Contraseña
        $("#pass").prop("type", "text"); 
         }//Agregamos el atributo de Tipo Texto(Para que se vea la Contraseña escribida)
    else{ //En caso contrario
        conteo = 0; //La cambiamos a 0
        $("#pass").removeAttr("type", "text"); //Removemos el atributo de Tipo Texto
        $("#pass").prop("type", "password"); //Agregamos el atributo de Tipo Contraseña
        } //Cierre del Else
    };
});

/////*****************************************


///------------ NOTA
/////LISTAR
app.controller("notaListarCtrl", function($scope, $http) {
    //funcionamiento de la session
    //console.log(sessionStorage.getItem("activo")+ " empleado");

    ///ng grid v1******************** 
    $scope.datoElimina = "";
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        //$(".carga-info").css("display", "block");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                    // la URL para la petición
                    url : 'php/nota.listar.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { id : 123 },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                    $scope.setPagingData(data,page,pageSize);
                    //$(".carga-info").css("display", "none");
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
                    }
                });

                /////////////////////////////////////////////////////////////////////

                //$http.post('../php/producto.listar.php').success(function (largeLoad) {      
                  //  data = largeLoad.filter(function(item) {
                    //    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //});
                    //$scope.setPagingData(data,page,pageSize);
               // });        
            } else {
                $http.post('php/nota.listar.php').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                    //$(".carga-info").css("display", "none");
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    //////// configuracion de las columnas del ng grid
    $scope.gridOptions = {
        i18n:'es',
        data: 'myData',
        enablePaging: true,
        enableRowSelection: false,
        enableColumnResize : true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [{field: 'id_nota', displayName:'', cellTemplate: '<div ng-click="nota_imprimir(row.entity.id_nota)""><span class="glyphicon glyphicon-print imprime_css" title="IMPRIMIR" aria-hidden="true"></span></div>',width:30},
                     {field: 'id_nota', displayName:'', cellTemplate: '<div ng-click="nota_modificar(row.entity.id_nota)""><span class="glyphicon glyphicon-pencil edita_css" title="EDITAR" aria-hidden="true"></span></div>',width: 30},
                     {field: 'id_nota', displayName:'', cellTemplate: '<div ng-click="nota_eliminar(row.entity.id_nota)"><span class="glyphicon glyphicon-remove elimina_css" title="ELIMINAR" aria-hidden="true"></span></div>',width: 30},
                     {field:'baja', displayName:'ESTADO',width:100},
                     {field: 'id_nota', displayName: 'Nº NOTA', width: 70}, 
                     {field: 'cliente', displayName: 'CLIENTE', width: 150},
                     {field:'empresa', displayName:'EMPRESA', width:100},
                     {field:'autorizado', displayName:'AUTORIZADO', width:100}, 
                     {field:'vendedor', displayName:'VENDEDOR',width: 100},
                     {field:'fecha_creacion', displayName:'FECHA DE CREACIÓN', width:150},
                     {field:'fecha_baja', displayName:'FECHA DE BAJA', width:150},
                     {field:'monto', displayName:'TOTAL', width:100},
                     {field: 'id_nota_papel', displayName: 'Nº NOTA MANUAL', width: 120},
                     {field:'observacion', displayName:'OBSERVACIÓN', width:100}
                     ]

    };
    //////////////////////////////////////////////////////////////////////
    //modificar
    $scope.nota_modificar = function(a){
        localStorage.setItem("id_modifica", a);
        console.log(localStorage.getItem('id_modifica'));
        location.href='#/nota_modificar';  
    };
    /////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////
    //funcion para eliminar en base de datos
    $scope.nota_eliminar = function(a) {
        localStorage.setItem("id_borrar", a);
        $("#myModal").modal();  
    };
    ///////////////////////////////////////////////
    $scope.nota_eliminar_modal = function() {
        $('#myModal').modal('hide');
        var id_borra = localStorage.getItem("id_borrar");
        //$(".carga-info").css("display", "block");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //$scope.$apply();
                //$(".carga-info").css("display", "none");
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
                location.reload(); 
            }
        });
        /////////////////////////////////////////////////////////////////////
    };

    //--------IMPRIMIR NOTA EN AGREGAR-------
    $scope.nota_imprimir = function(a){
        if (a != "") {
            localStorage.setItem("id_nota",a);
            location.href='imprime_nota.html';
        }
    };
});
////AGREGAR
app.controller("notaAgregarCtrl", function($scope, $http) {
    $("#focus-ini").focus();
    $("body").keyup(function(event){
        if(event.keyCode == 119){
            $scope.imprimirNota();
            return false;
        }
    });
    ////carga de cliente para llenar nota
    $scope.notaPedido_cantidad = "";
    $scope.notaPedido_precioEdit = "";
    $scope.notaPedido_resultado = 0;
    $scope.notaPedido_total = 0;
    $scope.notaPedido_entregado = 0; 
    $scope.notaPedidoForm= {};
    $scope.formDataNota= {};
    $scope.checkboxModelBaja = [{valor:"CANCELADO"},{valor:"DEBE"}];
    $scope.checkboxModel = [{value2: "si"},{value2: "no"}];
    


    $scope.dataF = [{valor: "contado",nombre: "CONTADO"},{valor: "credito",nombre: "CREDITO" }];
    $scope.selectedFormaPago = $scope.dataF;            


    ////carga de vendedor para llenar nota
    $.ajax({
            // la URL para la petición
            url : 'php/empleado.listar.nota.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "vendedor"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $scope.datav = {
                        availableOptionsVendedor: dataUser
                };
                $scope.selectedVendedor = dataUser;
                $scope.formDataNota.baja = "DEBE";
                $scope.checkboxModelBaja.valor = "DEBE";
                $(".bandera").css("color", "red");
                //**---lenar hora y taza de cambio
                $scope.$apply();
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
                var meses = new Array ("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
                var f=new Date();
                //document.write(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());   
                //$(".n_fechaCreacion").val(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());
                $(".n_fechaCreacion").val(f.getFullYear() + "-" +(f.getMonth() + 1 )+ "-" +f.getDate());
                $(".notaPedido_ma").val("Kg.");
                //$(".nota_cam").val("6.97");
            }
        });
    ////carga de usuario para llenar nota
    /*$.ajax({
            // la URL para la petición
            url : 'php/usuario.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "usuario"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $scope.datau = {
                        availableOptionsUsuario: dataUser
                };
                $scope.selectedUsuario = dataUser;
                $scope.$apply();
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
            }
        });*/

    ////carga de productos para llenar nota
    $.ajax({
            // la URL para la petición
            url : 'php/producto.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "producto"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);

                $scope.datap = {
                        availableOptionsProducto: dataUser
                };
                $scope.selectedPrecio = dataUser;
                $scope.$apply();

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
            }
        });

    $scope.datoNotaPedido = "";
    $scope.listPrecio=[{
                id:"1",
                value:""
            }   
        ];

    ////agregar pedido checkbox
    $scope.editarPrecio = function(){
         if($scope.checkboxModel.value2 == "si"){//esta marcado
           //posibilita editar
           $(".notaPedido_pr").css("display","none");
           $(".np_precioS").css("display","block");  

           $(".notaPedido_su").css("display","block");
           $(".notaPedido_suEdit").css("display","none");
           $(".notaPedido_caSi").css("display","none");
           $(".notaPedido_caNo").css("display","block");
       };
       if($scope.checkboxModel.value2 == "no"){//no esta marcado
           //posibilita editar
           $(".notaPedido_pr").css("display","block");
           $(".np_precioS").css("display","none");

           $(".notaPedido_su").css("display","none");
           $(".notaPedido_suEdit").css("display","block");
           $(".notaPedido_caSi").css("display","block");
           $(".notaPedido_caNo").css("display","none");
       };
    };

    ////agregar cliente checkbox
    $scope.editarCliente = function(){
        if($scope.checkboxModelCliente.value == "si"){//esta marcado
           //posibilita editar
           $(".n_cliente").css("display","none");
           $(".crea_cliente").css("display","block");
        };
        if($scope.checkboxModelCliente.value == "no"){//no esta marcado
           //no posibilita editar
           $(".n_cliente").css("display","block");
           $(".crea_cliente").css("display","none");
        };
    };

    //********checkbox DADO DE BAJA
    $scope.n_dadoBaja = function(){
        if($scope.checkboxModelBaja.valor == "CANCELADO"){
            //console.log("si");//esta marcado
            $scope.formDataNota.baja = "CANCELADO";
            $(".bandera").css("color", "green");
        };
        if($scope.checkboxModelBaja.valor == "DEBE"){
            //console.log("no");//no esta marcado
            $scope.formDataNota.baja = "DEBE";  
            $(".bandera").css("color", "red");
        };
    };

    //********select escoger Forma de pago
    $scope.hasChangedFormaPago = function() {
        //console.log($scope.selectedFormaPago.nombre);
        $scope.formDataNota.forma_pago = $scope.selectedFormaPago.valor;
        console.log($scope.selectedFormaPago.valor);
    };
    //********select escoger Cliente
    $scope.hasChangedCliente = function() {
        console.log($scope.selectedCliente.nombre);
        console.log($scope.selectedCliente.nombre_real +" nombre real");
        $scope.formDataNota.cliente = $scope.selectedCliente.nombre_real;
        $scope.formDataNota.empresa = $scope.selectedCliente.nombre_empresa;
        $scope.formDataNota.id_cliente = $scope.selectedCliente.id_cliente;

    };
    //********select escoger Autorizado
    /*$scope.hasChangedUsuario = function() {
        //console.log($scope.selectedUsuario.nombre);  
        $scope.formDataNota.autorizado =  $scope.selectedUsuario.nombre;
        $scope.formDataNota.id_usuario =  $scope.selectedUsuario.id_usuario;
        //sessionStorage.getItem("user")
    };*/
    //********select escoger Vendedor
    $scope.hasChangedVendedor = function() {
        $(".carga-info").css("display", "block");
        //console.log($scope.selectedVendedor.nombre);
        $scope.formDataNota.vendedor = $scope.selectedVendedor.nombre;
        $scope.formDataNota.id_empleado = $scope.selectedVendedor.id_empleado;

        //****-------ajax pra llenar cliente ///ajax para llenar el formulario de modificar nota
                $.ajax({
                    // la URL para la petición
                    url : 'php/cliente.listar.nota.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { 
                        id_empleado: $scope.selectedVendedor.id_empleado
                    },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dataUser) {
                        //console.log(dataUser);
                        $scope.datac = {
                            availableOptionsCliente: dataUser
                        };
                        $scope.selectedCliente = dataUser;
                        /*for(i=0; i<dataUser.length;i++){
                            if ( dataUser[i].id_cliente == $scope.formDataNotaModificar.id_cliente) {
                                $scope.selectedCliente = dataUser[i];
                            };
                        };*/
                        $scope.$apply();
                        $(".carga-info").css("display", "none");
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
                });//fin de ajax para llenar cliente
    };

    ////-----------------GUARDAR NOTA EN BASE DE DATOS------
    $scope.guardar_nota = function(){
        //$scope.formDataNota.id_nota = $(".n_numero").val();

        $scope.formDataNota.id_usuario = sessionStorage.getItem("id_user");
        $scope.formDataNota.autorizado = sessionStorage.getItem("user");
        $scope.formDataNota.fecha_creacion = $(".n_fechaCreacion").val();
        $scope.formDataNota.monto = $(".notaPedido_to").val();
        //$scope.formDataNota.tc = $(".nota_cam").val();
        //$scope.formDataNota.deposito = $(".n_deposito").val();
        //$(".n_numero").val("000001");
        //$(".pedido_nota_css").css("display", "block");

        //**********enviar para agregar*****/
        $(".carga-info").css("display", "block");
        ////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.agregar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formDataNota,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                //$(".guardar_nota").css("background", "#CDF6B4");
                //setTimeout(function() {
                  //  $(".content").fadeOut(1500);
                //},3000);
                $(".n_numero").val(dataUser[0].id_nota);
                $(".pedido_nota_css").css("display", "block");
                $(".pedido_nota_css_2").css("display","block");
                $(".btn_desaparece").css("display", "none");
                $scope.$apply();
                $(".carga-info").css("display", "none");
                $("#id_notaPedido_productoS").focus();           
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
               //location.href='#/nota_listar';
              
            }
        });

    };

    //select de producto para llenar json de precio
    $scope.hasChanged = function() {
        //alert($scope.selectedPrecio.precio_fabrica);
        $scope.listPrecio=[{
                id:$scope.selectedPrecio.precio_fabrica,
                value:$scope.selectedPrecio.precio_fabrica+"--Precio con factura"
            },{
                id:$scope.selectedPrecio.precio_sinFactura,
                value:$scope.selectedPrecio.precio_sinFactura+"--Precio sin factura" 
            },{
                id:$scope.selectedPrecio.precio_preventista,
                value:$scope.selectedPrecio.precio_preventista +"--Precio preventista"
            },{
                id:$scope.selectedPrecio.precio_megas,
                value:$scope.selectedPrecio.precio_megas +"--Precio megas"
            }   
        ];

        $scope.selectedPrecioSelect = $scope.listPrecio;
        $scope.notaPedidoForm.notaPedido_codigo = $scope.selectedPrecio.id_producto;
        $scope.notaPedidoForm.notaPedido_descripcion = $scope.selectedPrecio.nombre;
    };
    $scope.hasChangedPrecioSelect = function(){
        $scope.notaPedido_resultado = $scope.notaPedido_cantidadNo * $scope.selectedPrecioSelect.id;
        $scope.notaPedidoForm.notaPedido_subtotal = $scope.notaPedido_resultado;
        $scope.notaPedidoForm.notaPedido_cantidad = $scope.notaPedido_cantidadNo;
        $scope.notaPedidoForm.notaPedido_precio = $scope.selectedPrecioSelect.id;
    };
    /**funcion para responder cuando NO se marco editar precio**/
    $scope.escribePrecioNo = function(){
        $scope.notaPedido_resultado = $scope.notaPedido_cantidadNo * $scope.selectedPrecioSelect.id;
        $scope.notaPedidoForm.notaPedido_subtotal = $scope.notaPedido_resultado;
        $scope.notaPedidoForm.notaPedido_cantidad = $scope.notaPedido_cantidadNo;
        $scope.notaPedidoForm.notaPedido_precio = $scope.selectedPrecioSelect.id;
        $scope.notaPedidoForm.notaPedido_entregado = $scope.notaPedido_cantidadNo;
    };
    /**funcion para responder cuando SI se marco editar precio**/
    $scope.escribePrecioSi = function(){
        $scope.notaPedido_resultadoEdit = $scope.notaPedido_cantidadSi * $scope.notaPedido_precioEdit;
        $scope.notaPedidoForm.notaPedido_subtotal = $scope.notaPedido_resultadoEdit;
        $scope.notaPedidoForm.notaPedido_cantidad = $scope.notaPedido_cantidadSi;
        $scope.notaPedidoForm.notaPedido_precio = $scope.notaPedido_precioEdit;
        $scope.notaPedidoForm.notaPedido_entregado = $scope.notaPedido_cantidadSi;
    };
    $scope.agregarPedidoNota = function(){
        $scope.notaPedidoForm.id_nota = $(".n_numero").val();
        $scope.notaPedidoForm.notaPedido_masa = $(".notaPedido_ma").val();
        //$scope.notaPedidoForm.notaPedido_entregado = $(".notaPedido_en").val();
        //$scope.notaPedidoForm.notaPedido_entregado = $(".notaPedido_ca").val();

        if ($(".notaPedido_suEdit").val() != "0"  || $(".notaPedido_su").val() != "0") {
                //$(".carga-info").css("display", "block");
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                    // la URL para la petición
                    url : 'php/nota.pedido.agregar.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : $scope.notaPedidoForm,

                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dato) {
                        $scope.datoNotaPedidos = dato;
                        $(".notaPedido_to").val($scope.datoNotaPedidos[0].total);
                        $scope.$apply();
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
                        
                    }
                });
                /////////////////////////////////////////////////////////////////////
                $scope.checkboxModel.value2 = "no";
                $(".notaPedido_pr").css("display","block");
                $(".np_precioS").css("display","none");
                $(".pedido_nota_css_2").css("display","block");
                $(".notaPedido_su").css("display","none");
                $(".notaPedido_suEdit").css("display","block");

                $(".notaPedido_en").val("0");
                //$(".notaPedido_ma").val("");
                $(".notaPedido_caSi").val("");
                $(".notaPedido_caNo").val("");
                $(".notaPedido_pr").val("");
                $(".notaPedido_su").val("0");
                $(".notaPedido_suEdit").val("0");
                $(".notaPedido_caSi").css("display","block");
                $(".notaPedido_caNo").css("display","none");

                /****carga todo por defecto vacio****/   
                $scope.notaPedido_cantidadNo = "";
                $scope.notaPedido_cantidadSi = "";
                $scope.notaPedido_precioEdit = "";
                $("#id_notaPedido_productoS").focus();
                //$(".carga-info").css("display", "none");
        }else{
            $("#myModalProgramError").modal("show");
        }

    };

    //********eliminar pedido***************
    $scope.pedido_eliminar = function(a){
        console.log(a);
        var idNota = $(".n_numero").val();
        var id_borra = a;

        //$(".carga-info").css("display", "block");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.pedido.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra ,id_nota: idNota},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.datoNotaPedidos = dato;
                $(".notaPedido_to").val($scope.datoNotaPedidos[0].total);  
                $scope.$apply();
                //$(".carga-info").css("display", "none");
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
                //location.reload(); 
                $(".notaPedido_en").val("0");
                //$(".notaPedido_ma").val("");
                $(".notaPedido_ca").val("");
                $(".notaPedido_pr").val("");
                $(".notaPedido_su").val("0");
                $(".notaPedido_suEdit").val("0");
            }
        });
        /////////////////////////////////////////////////////////////////////
    };
    //--------IMPRIMIR NOTA EN AGREGAR-------
    $scope.imprimirNota = function(){
        if ($(".n_numero").val() != "") {
            localStorage.setItem("id_nota",$(".n_numero").val());
            location.href='imprime_nota.html';
        }
    };

    //---------- AGREGAR NUEVO CLIENTE --------
    $scope.agregar_nuevoCliente = function(){
        var cliente = $(".agregar_cliente_nuevo").val();
        var clienteVector = cliente.toString().split(' ');
        var id_vendedor = $scope.selectedVendedor.id_empleado;
        var nombre_vendedor = $scope.selectedVendedor.nombre;

        console.log(cliente);
        console.log(clienteVector[0]);
        console.log(clienteVector[1]);
        console.log(id_vendedor);

        $(".carga-info").css("display", "block");
        //---ajax para llenar cliente
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/agregar.nuevo.cliente.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { nombre : clienteVector[0], apellido: clienteVector[1], id_empleado: id_vendedor, nombre_empleado: nombre_vendedor},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.datac = {
                            availableOptionsCliente: dato
                };
                $scope.selectedCliente = dato;
                $scope.checkboxModelCliente.value = "no";
                $(".n_cliente").css("display","block");
                $(".crea_cliente").css("display","none");
                console.log("aplico cambio");
                $(".carga-info").css("display", "none");
                //$scope.$apply();


                /****nueva consulta de cliente****/
                //****-------ajax pra llenar cliente ///ajax para llenar el formulario de modificar nota
                $.ajax({
                    // la URL para la petición
                    url : 'php/cliente.listar.nota.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { 
                        id_empleado: id_vendedor
                    },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dataUser) {
                        //console.log(dataUser);
                        $scope.datac = {
                            availableOptionsCliente: dataUser
                        };
                        $scope.selectedCliente = dataUser;
                        /*for(i=0; i<dataUser.length;i++){
                            if ( dataUser[i].id_cliente == $scope.formDataNotaModificar.id_cliente) {
                                $scope.selectedCliente = dataUser[i];
                            };
                        };*/
                        $scope.$apply();
                        $(".carga-info").css("display", "none");
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
                });//fin de ajax para llenar cliente
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
    };

    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };



    ////-----------------GUARDAR NOTA EN BASE DE DATOS------
    $scope.modificar_nota = function(){
        $scope.formDataNota.id_usuario = sessionStorage.getItem("id_user");
        $scope.formDataNota.autorizado = sessionStorage.getItem("user");
        $scope.formDataNota.id_nota = $(".n_numero").val();
        $scope.formDataNota.fecha_creacion = $(".n_fechaCreacion").val();
        $scope.formDataNota.monto = $(".notaPedido_to").val();
        //$scope.formDataNota.tc = $(".nota_cam").val();
        //$scope.formDataNota.deposito = $(".n_deposito").val();

        $(".carga-info").css("display", "block");
        //**********enviar para agregar*****/
        ////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formDataNota,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);

                //$(".guardar_nota").css("background", "#90EE90");
                //$(".boton_cambio").removeClass("btn_super");
                $(".boton_cambio").removeClass("btn_super");
                $(".boton_cambio").addClass("btn_agregar_positivo");
                $scope.$apply();
                $(".carga-info").css("display", "none");
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
               //location.href='#/nota_listar';
            }
        });

    };

});
////MODIFICAR
app.controller("notaModificarCtrl", function($scope, $http) {
    $("#focus-ini").focus();
    $("body").keyup(function(event){
        if(event.keyCode == 119){
            $scope.imprimirNota();
            return false;
        }
    });

    
    ////declarar valores por defecto
    $scope.notaPedido_cantidad = "";
    $scope.notaPedido_precioEdit = "";
    $scope.notaPedido_resultado = 0;
    $scope.notaPedido_total = 0;
    $scope.notaPedido_entregado = 0; 
    $scope.notaPedidoForm= {};
    $scope.formDataNota= {};
    $scope.formDataNotaModificar= {};
    $scope.formDataNota.baja = "DEBE";
    $scope.dataF = [{valor: "contado",nombre: "CONTADO"},{valor: "credito",nombre: "CREDITO" }];
    $scope.checkboxModelBaja = [{valor:"CANCELADO"},{valor:"DEBE"}];
    $scope.checkboxModel = [{value2: "si"},{value2: "no"}];
                

    ////cargar el formulario de modificar nota CON ID_NOTA
    $scope.formDataNotaModificar.id_nota = localStorage.getItem("id_modifica");
    
    $(".carga-info").css("display", "block");
    //ajax para llenar num nota fecha deposito  vendedor autorizado cliente de nota
    $.ajax({
            // la URL para la petición
            url : 'php/nota.listar.uno.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                id_nota: $scope.formDataNotaModificar.id_nota
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $(".n_numero").val(dataUser[0].id_nota); //id_nota
                $(".n_fechaCreacion").val(dataUser[0].fecha_creacion); //fecha de creacion de nota
                //$(".n_deposito").val(dataUser[0].deposito); // deposito de nota
                //$(".nota_cam").val(dataUser[0].tc); // cifra de cambio de moneda nacional a doal americano
                $(".notaPedido_ma").val("Kg.");
                $(".n_observacion ").val(dataUser[0].observacion);
                $(".id_nota_p").val(dataUser[0].id_nota_papel);

                $scope.formDataNotaModificar.forma_pago = dataUser[0].forma_pago;
                $scope.formDataNotaModificar.id_cliente = dataUser[0].id_cliente;
                $scope.formDataNotaModificar.id_usuario = dataUser[0].id_usuario;
                $scope.formDataNotaModificar.id_empleado = dataUser[0].id_empleado;
                $scope.checkboxModelBaja.valor = dataUser[0].baja;
                $scope.nota_observacion = dataUser[0].observacion;
                $scope.id_nota_papel = dataUser[0].id_nota_papel;

                //$scope.selectedFormaPago = $scope.dataF;
                if ( $scope.dataF[0].valor == $scope.formDataNotaModificar.forma_pago) {
                        $scope.selectedFormaPago = $scope.dataF[0];
                };
                if ( $scope.dataF[1].valor == $scope.formDataNotaModificar.forma_pago) {
                        $scope.selectedFormaPago = $scope.dataF[1];
                };

                ///POR DEFECTO DATOS EN CASO DE NO HABER CAMBIOS
                $scope.formDataNota.forma_pago = $scope.formDataNotaModificar.forma_pago;
                $scope.formDataNota.id_cliente = $scope.formDataNotaModificar.id_cliente;
                $scope.formDataNota.id_usuario = $scope.formDataNotaModificar.id_usuario;
                $scope.formDataNota.id_empleado = $scope.formDataNotaModificar.id_empleado;
                $scope.formDataNota.baja = $scope.checkboxModelBaja.valor;

                if ($scope.formDataNota.baja == "CANCELADO") {
                    $(".bandera").css("color", "green");
                };
                if ($scope.formDataNota.baja == "DEBE") {
                    $(".bandera").css("color", "red");
                };
                

                $scope.formDataNota.autorizado = dataUser[0].autorizado;
                $scope.formDataNota.cliente = dataUser[0].cliente;
                $scope.formDataNota.empresa = dataUser[0].empresa;
                $scope.formDataNota.vendedor = dataUser[0].vendedor;
                $(".carga-info").css("display", "none");

                //****-------ajax pra llenar cliente ///ajax para llenar el formulario de modificar nota
                $.ajax({
                    // la URL para la petición
                    url : 'php/cliente.listar.nota.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { 
                        id_empleado: $scope.formDataNota.id_empleado
                    },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dataUser) {
                        //console.log(dataUser);
                        $scope.datac = {
                            availableOptionsCliente: dataUser
                        };
                        $scope.selectedCliente = dataUser;
                        for(i=0; i<dataUser.length;i++){
                            if ( dataUser[i].id_cliente == $scope.formDataNotaModificar.id_cliente) {
                                $scope.selectedCliente = dataUser[i];
                            };
                        };
                        $scope.$apply();
                        $(".carga-info").css("display", "none");
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
                });//fin de ajax para llenar cliente


                /************************************************************///
                ////carga de vendedor para llenar nota
                $.ajax({
                    // la URL para la petición
                    url : 'php/empleado.listar.nota.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { 
                        codigo: "vendedor"
                    },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dataUser) {
                        //console.log(dataUser);
                        $scope.datav = {
                            availableOptionsVendedor: dataUser
                        };
                        //$scope.selectedVendedor = dataUser;
                        for(i=0; i<dataUser.length;i++){
                            if ( dataUser[i].id_empleado == $scope.formDataNotaModificar.id_empleado) {
                                $scope.selectedVendedor = dataUser[i];
                            };
                        };
                        $scope.$apply();
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
                    }
                });///fin de ajax vendedor
                /******************************/


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
    
    ////carga de usuario para llenar nota
    /*$.ajax({
            // la URL para la petición
            url : 'php/usuario.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "usuario"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $scope.datau = {
                        availableOptionsUsuario: dataUser
                };
                //$scope.selectedUsuario = dataUser[1];
                for(i=0; i<dataUser.length;i++){
                    if ( dataUser[i].id_usuario == $scope.formDataNotaModificar.id_usuario) {
                        $scope.selectedUsuario = dataUser[i];
                    };
                };

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
            }
        });*/
    ////carga de usuario para llenar nota
    $.ajax({
            // la URL para la petición
            url : 'php/producto.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "producto"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);

                $scope.datap = {
                        availableOptionsProducto: dataUser
                };
                $scope.selectedPrecio = dataUser;
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
            }
        });

    //////////////////////////////////////////////////////////////////////
    ///*****ajax para llenar pedidos
    $.ajax({
        // la URL para la petición
        url : 'php/nota.pedido.listar.php',
 
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : {
                    id_nota: $scope.formDataNotaModificar.id_nota
        },

        // especifica si será una petición POST o GET
        type : 'POST',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',
 
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(dato) {
            $scope.datoNotaPedidos = dato;
                $(".notaPedido_to").val($scope.datoNotaPedidos[0].total);  
                $scope.$apply();
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
            $(".notaPedido_en").val("0");
            //$(".notaPedido_ma").val("");
            $(".notaPedido_ca").val("");
            $(".notaPedido_pr").val("");
            $(".notaPedido_su").val("0");
            $(".notaPedido_suEdit").val("0");
        }
    });
    /////////////////////////////////////////////////////////////////////

    $scope.datoNotaPedido = "";
    $scope.listPrecio=[{
                id:"1",
                value:""
            }   
        ];

    ////agregar cliente checkbox
    $scope.editarCliente = function(){
        if($scope.checkboxModelCliente.value == "si"){//esta marcado
           //posibilita editar
           $(".n_cliente").css("display","none");
           $(".crea_cliente").css("display","block");
        };
        if($scope.checkboxModelCliente.value == "no"){//no esta marcado
           //no posibilita editar
           $(".n_cliente").css("display","block");
           $(".crea_cliente").css("display","none");
        };
    };
    ////agregar pedido checkbox
    $scope.editarPrecio = function(){
        if($scope.checkboxModel.value2 == "no"){//esta marcado
           //posibilita editar
           $(".notaPedido_pr").css("display","block");
           $(".np_precioS").css("display","none");

           $(".notaPedido_su").css("display","none");
           $(".notaPedido_suEdit").css("display","block");
           $(".notaPedido_caSi").css("display","block");
           $(".notaPedido_caNo").css("display","none");
       };
       if($scope.checkboxModel.value2 == "si"){//no esta marcado
           //posibilita editar
           $(".notaPedido_pr").css("display","none");
           $(".np_precioS").css("display","block");  

           $(".notaPedido_su").css("display","block");
           $(".notaPedido_suEdit").css("display","none");
           $(".notaPedido_caSi").css("display","none");
           $(".notaPedido_caNo").css("display","block");
       };
    };

    //********checkbox DADO DE BAJA
    $scope.n_dadoBaja = function(){
        if($scope.checkboxModelBaja.valor == "CANCELADO"){
            //console.log("si");//esta marcado
            $scope.formDataNota.baja = "CANCELADO";
            $(".bandera").css("color", "green");
        };
        if($scope.checkboxModelBaja.valor == "DEBE"){
            //console.log("no");//no esta marcado
            $scope.formDataNota.baja = "DEBE";
            $(".bandera").css("color", "red");  
        };
    };

    //********select escoger Forma de pago
    $scope.hasChangedFormaPago = function() {
        //console.log($scope.selectedFormaPago.nombre);
        $scope.formDataNota.forma_pago = $scope.selectedFormaPago.valor;
        console.log($scope.selectedFormaPago.valor);
    };
    //********select escoger Cliente
    $scope.hasChangedCliente = function() {
        console.log($scope.selectedCliente.nombre);
        $scope.formDataNota.cliente = $scope.selectedCliente.nombre_real;
        $scope.formDataNota.empresa = $scope.selectedCliente.nombre_empresa;
        $scope.formDataNota.id_cliente = $scope.selectedCliente.id_cliente;

    };
    //********select escoger Autorizado
    /*$scope.hasChangedUsuario = function() {
        //console.log($scope.selectedUsuario.nombre);  
        $scope.formDataNota.autorizado =  $scope.selectedUsuario.nombre;
        $scope.formDataNota.id_usuario =  $scope.selectedUsuario.id_usuario;
    };*/
    //********select escoger Vendedor
    $scope.hasChangedVendedor = function() {
        $(".carga-info").css("display", "block");
        //console.log($scope.selectedVendedor.nombre);
        $scope.formDataNota.vendedor = $scope.selectedVendedor.nombre;
        $scope.formDataNota.id_empleado = $scope.selectedVendedor.id_empleado;

        //****-------ajax pra llenar cliente ///ajax para llenar el formulario de modificar nota
                $.ajax({
                    // la URL para la petición
                    url : 'php/cliente.listar.nota.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { 
                        id_empleado: $scope.selectedVendedor.id_empleado
                    },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dataUser) {
                        //console.log(dataUser);
                        $scope.datac = {
                            availableOptionsCliente: dataUser
                        };
                        $scope.selectedCliente = dataUser;
                        /*for(i=0; i<dataUser.length;i++){
                            if ( dataUser[i].id_cliente == $scope.formDataNotaModificar.id_cliente) {
                                $scope.selectedCliente = dataUser[i];
                            };
                        };*/
                        $scope.$apply();
                        $(".carga-info").css("display", "none");
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
                });//fin de ajax para llenar cliente
    };

    ////-----------------GUARDAR NOTA EN BASE DE DATOS------
    $scope.modificar_nota = function(){

        $scope.formDataNota.id_usuario = sessionStorage.getItem("id_user");
        $scope.formDataNota.autorizado = sessionStorage.getItem("user");
        $scope.formDataNota.id_nota = $(".n_numero").val();
        $scope.formDataNota.fecha_creacion = $(".n_fechaCreacion").val();
        $scope.formDataNota.monto = $(".notaPedido_to").val();
        $scope.formDataNota.observacion = $(".n_observacion").val();
        $scope.formDataNota.id_nota_papel =$(".id_nota_p").val();

        //$scope.formDataNota.tc = $(".nota_cam").val();
        //$scope.formDataNota.deposito = $(".n_deposito").val();

        $(".carga-info").css("display", "block");
        //**********enviar para agregar*****/
        ////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formDataNota,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);

                //$(".guardar_nota").css("background", "#90EE90");
                $(".boton_cambio").removeClass("btn_super");
                $(".boton_cambio").addClass("btn_agregar_positivo");
                $scope.$apply();
                $(".carga-info").css("display", "none");

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
               //location.href='#/nota_listar';
            }
        });

    };

    //select de producto para llenar json de precio
    $scope.hasChanged = function() {
        //alert($scope.selectedPrecio.precio_fabrica);
        $scope.listPrecio=[{
                id:$scope.selectedPrecio.precio_fabrica,
                value:$scope.selectedPrecio.precio_fabrica+"--Precio con factura"
            },{
                id:$scope.selectedPrecio.precio_sinFactura,
                value:$scope.selectedPrecio.precio_sinFactura+"--Precio sin factura" 
            },{
                id:$scope.selectedPrecio.precio_preventista,
                value:$scope.selectedPrecio.precio_preventista +"--Precio preventista"
            },{
                id:$scope.selectedPrecio.precio_megas,
                value:$scope.selectedPrecio.precio_megas +"--Precio megas"
            }      
        ];

        $scope.selectedPrecioSelect = $scope.listPrecio;
        $scope.notaPedidoForm.notaPedido_codigo = $scope.selectedPrecio.id_producto;
        $scope.notaPedidoForm.notaPedido_descripcion = $scope.selectedPrecio.nombre;
    };
    $scope.hasChangedPrecioSelect = function(){
        $scope.notaPedido_resultado = $scope.notaPedido_cantidadNo * $scope.selectedPrecioSelect.id;
        $scope.notaPedidoForm.notaPedido_subtotal = $scope.notaPedido_resultado;
        $scope.notaPedidoForm.notaPedido_cantidad = $scope.notaPedido_cantidadNo;
        $scope.notaPedidoForm.notaPedido_precio = $scope.selectedPrecioSelect.id;
    };
    /**funcion para responder cuando NO se marco editar precio**/
    $scope.escribePrecioNo = function(){
        $scope.notaPedido_resultado = $scope.notaPedido_cantidadNo * $scope.selectedPrecioSelect.id;
        $scope.notaPedidoForm.notaPedido_subtotal = $scope.notaPedido_resultado;
        $scope.notaPedidoForm.notaPedido_cantidad = $scope.notaPedido_cantidadNo;
        $scope.notaPedidoForm.notaPedido_precio = $scope.selectedPrecioSelect.id;
        $scope.notaPedidoForm.notaPedido_entregado = $scope.notaPedido_cantidadNo;
    };
    /**funcion para responder cuando SI se marco editar precio**/
    $scope.escribePrecioSi = function(){
        $scope.notaPedido_resultadoEdit = $scope.notaPedido_cantidadSi * $scope.notaPedido_precioEdit;
        $scope.notaPedidoForm.notaPedido_subtotal = $scope.notaPedido_resultadoEdit;
        $scope.notaPedidoForm.notaPedido_cantidad = $scope.notaPedido_cantidadSi;
        $scope.notaPedidoForm.notaPedido_precio = $scope.notaPedido_precioEdit;
        $scope.notaPedidoForm.notaPedido_entregado = $scope.notaPedido_cantidadSi;
    };
    $scope.agregarPedidoNota = function(){
        $scope.notaPedidoForm.id_nota = $(".n_numero").val();
        $scope.notaPedidoForm.notaPedido_masa = $(".notaPedido_ma").val();
        //$scope.notaPedidoForm.notaPedido_entregado = $(".notaPedido_en").val();
        //$scope.notaPedidoForm.notaPedido_entregado = $(".notaPedido_ca").val();
        //console.log($(".notaPedido_suEdit").val());
        //console.log($(".notaPedido_su").val());
        if ($(".notaPedido_suEdit").val() != "0"  || $(".notaPedido_su").val() != "0") {
                //$(".carga-info").css("display", "block");
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                    // la URL para la petición
                    url : 'php/nota.pedido.agregar.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : $scope.notaPedidoForm,

                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dato) {
                        $scope.datoNotaPedidos = dato;
                        $(".notaPedido_to").val($scope.datoNotaPedidos[0].total);
                        $scope.$apply();
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
                        
                    }
                });
                /////////////////////////////////////////////////////////////////////
                $scope.checkboxModel.value2 = "no";
                $(".notaPedido_pr").css("display","block");
                $(".np_precioS").css("display","none");
                $(".pedido_nota_css_2").css("display","block");
                $(".notaPedido_su").css("display","none");
                $(".notaPedido_suEdit").css("display","block");

                $(".notaPedido_en").val("0");
                //$(".notaPedido_ma").val("");
                $(".notaPedido_caSi").val("");
                $(".notaPedido_caNo").val("");
                $(".notaPedido_pr").val("");
                $(".notaPedido_su").val("0");
                $(".notaPedido_suEdit").val("0");
                $(".notaPedido_caSi").css("display","block");
                $(".notaPedido_caNo").css("display","none");

                /****carga todo por defecto vacio****/   
                $scope.notaPedido_cantidadNo = "";
                $scope.notaPedido_cantidadSi = "";
                $scope.notaPedido_precioEdit = "";
                $("#id_notaPedido_productoS").focus();
                //$(".carga-info").css("display", "none");
        }else{
            $("#myModalProgramError").modal("show");
        }
    };

    //********eliminar pedido***************
    $scope.pedido_eliminar = function(a){
        console.log(a);
        var idNota = $(".n_numero").val();
        var id_borra = a;
        //$(".carga-info").css("display", "block");
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.pedido.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { codigo : id_borra ,id_nota: idNota},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.datoNotaPedidos = dato;
                $(".notaPedido_to").val($scope.datoNotaPedidos[0].total);  
                $scope.$apply();
                //$(".carga-info").css("display", "none");
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
                //location.reload(); 
                $(".notaPedido_en").val("0");
                //$(".notaPedido_ma").val("");
                $(".notaPedido_ca").val("");
                $(".notaPedido_pr").val("");
                $(".notaPedido_su").val("0");
                $(".notaPedido_suEdit").val("0");
            }
        });
        /////////////////////////////////////////////////////////////////////
    };



    /////////****------PARA IMPRIMIR NOTA-----******///////
    //--------IMPRIMIR NOTA EN AGREGAR
    $scope.imprimirNota = function(){
        if ($(".n_numero").val() != "") {
            localStorage.setItem("id_nota",$(".n_numero").val());
            location.href='imprime_nota.html';
        }
    };

     //---------- AGREGAR NUEVO CLIENTE --------
    $scope.agregar_nuevoCliente = function(){
        var cliente = $(".agregar_cliente_nuevo").val();
        var clienteVector = cliente.toString().split(' ');
        var id_vendedor = $scope.selectedVendedor.id_empleado;
        var nombre_vendedor = $scope.selectedVendedor.nombre;

        //console.log(cliente);
        //console.log(clienteVector[0]);
        //console.log(clienteVector[1]);
        //console.log(id_vendedor);
        $(".carga-info").css("display", "block");
        //---ajax para llenar cliente
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/agregar.nuevo.cliente.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { nombre : clienteVector[0], apellido: clienteVector[1], id_empleado: id_vendedor, nombre_empleado: nombre_vendedor},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.datac = {
                            availableOptionsCliente: dato
                };
                $scope.selectedCliente = dato;
                $scope.checkboxModelCliente.value = "no";
                $(".n_cliente").css("display","block");
                $(".crea_cliente").css("display","none");
                //$scope.$apply();
                //$(".carga-info").css("display", "none");
                /****nueva consulta de cliente****/
                //****-------ajax pra llenar cliente ///ajax para llenar el formulario de modificar nota
                $.ajax({
                    // la URL para la petición
                    url : 'php/cliente.listar.nota.php',
 
                    // la información a enviar
                    // (también es posible utilizar una cadena de datos)
                    data : { 
                        id_empleado: id_vendedor
                    },
 
                    // especifica si será una petición POST o GET
                    type : 'POST',
 
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
 
                    // código a ejecutar si la petición es satisfactoria;
                    // la respuesta es pasada como argumento a la función
                    success : function(dataUser) {
                        //console.log(dataUser);
                        $scope.datac = {
                            availableOptionsCliente: dataUser
                        };
                        $scope.selectedCliente = dataUser;
                        /*for(i=0; i<dataUser.length;i++){
                            if ( dataUser[i].id_cliente == $scope.formDataNotaModificar.id_cliente) {
                                $scope.selectedCliente = dataUser[i];
                            };
                        };*/
                        $scope.$apply();
                        $(".carga-info").css("display", "none");
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
                });//fin de ajax para llenar cliente
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
    };

    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});
//////////*********************************/////////////////////


//***----------- REPORTE 
app.controller("reporteAgregarCtrl", function($scope, $http) {

    /*********************CARGA DATA PICKER**************************/
    $( ".date_desde" ).datepicker({
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        dateFormat: "yy-mm-dd"
    });
    $( ".date_hasta" ).datepicker({
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        dateFormat: "yy-mm-dd"
    });

     ////carga de vendedor para llenar REPORTE
    $(".carga-info").css("display", "block");
    $.ajax({
            // la URL para la petición
            url : 'php/empleado.listar.nota.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "vendedor"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);
                $scope.datav = {
                        availableOptionsVendedor: dataUser
                };
                $scope.selectedVendedor = dataUser;
                /*for(i=0; i<dataUser.length;i++){
                    if ( dataUser[i].id_empleado == $scope.formDataNotaModificar.id_empleado) {
                        $scope.selectedVendedor = dataUser[i];
                    };
                };*/
                $scope.$apply();
                $(".carga-info").css("display", "none");
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
            }
        });
    //FUNCION ENCARGAD DE DEVOLVER EL VENDEDOR Y SU ID PARA EL REPORTE
    $scope.hasChangedVendedor = function() {
        //console.log($scope.selectedVendedor.nombre);
        localStorage.setItem("id_vendedor",$scope.selectedVendedor.id_empleado);
        localStorage.setItem("nombre_vendedor",$scope.selectedVendedor.nombre);
    };

    //funcion para crear    REPORTE
    $scope.crear_reporte = function(){
        localStorage.setItem("fecha_d",$(".f_d").val());
        localStorage.setItem("fecha_h",$(".f_h").val());
        location.href = '#/reporte_listar';
    };
    /////////////////////////////////////////////////////////////////////
    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});

app.controller("reporteListarCtrl", function($scope, $http) {

    //declaracion de variables segun lo guardado
    $scope.reporte_fecha_desde = localStorage.getItem("fecha_d");
    $scope.reporte_fecha_hasta = localStorage.getItem("fecha_h");
    $scope.reporte_nombre_vendedor =  localStorage.getItem("nombre_vendedor");
    $scope.reporte_id_vendedor = localStorage.getItem("id_vendedor");

    //ajax para cargar los datos del reporte
    $(".carga-info").css("display", "block");
    //---ajax para filtrar nota
    //////////////////////////////////////////////////////////////////////
    $.ajax({
        // la URL para la petición
        url : 'php/nota.reporte.listar.todo.php',
 
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { desde : $scope.reporte_fecha_desde, hasta: $scope.reporte_fecha_hasta, id_empleado: $scope.reporte_id_vendedor},
 
        // especifica si será una petición POST o GET
        type : 'POST',
 
        // el tipo de información que se espera de respuesta
        dataType : 'json',
 
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(dato) {
            $scope.dataReporte = dato;
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
            $(".carga-info").css("display", "none");
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
            }
        });
        /////////////////////////////////////////////////////////////////////

    ///funcion para MODIFICAR TOTAL
    $scope.guardar_total_modificado = function(id_nota_reporte){
        var id_nota = id_nota_reporte;
        var id_usuario =  sessionStorage.getItem("id_user");
        var nombre_usuario =  sessionStorage.getItem("user");
        var total = $("#nt_"+id_nota).val();

        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.reporte.listar.todo.modificar.total.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { desde : $scope.reporte_fecha_desde, hasta: $scope.reporte_fecha_hasta, id_empleado: $scope.reporte_id_vendedor, id_nota : id_nota , total: total, id_usuario: id_usuario, nombre_usuario: nombre_usuario},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.dataReporte = dato;
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
                $("#nt_"+id_nota).val("");
                $scope.$apply();
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
            }
        });
        /////////////////////////////////////////////////////////////////////
    };


    ///funcion para DAR DE BAJA A LAS NOTAS
    $scope.nota_debe = function(id_nota_reporte){
        var id_usuario = sessionStorage.getItem("id_user");
        var nombre_usuario = sessionStorage.getItem("user");

        var d = new Date();
        var fecha_baja =  d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.reporte.listar.todo.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { desde : $scope.reporte_fecha_desde, hasta: $scope.reporte_fecha_hasta, id_empleado: $scope.reporte_id_vendedor, id_nota : id_nota_reporte , baja: "CANCELADO", autorizado: nombre_usuario, id_usuario: id_usuario, fecha_baja: fecha_baja},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.dataReporte = dato;
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
            }
        });
    /////////////////////////////////////////////////////////////////////
    };

    ///funcion para DAR DE BAJA A LAS NOTAS
    $scope.nota_cancelado = function(id_nota_reporte){
        var id_usuario = sessionStorage.getItem("id_user");
        var nombre_usuario = sessionStorage.getItem("user");

        var fecha_baja =  null;
      //////////////////////////////////////////////////////////////////////
        $.ajax({
            // la URL para la petición
            url : 'php/nota.reporte.listar.todo.modificar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { desde : $scope.reporte_fecha_desde, hasta: $scope.reporte_fecha_hasta, id_empleado: $scope.reporte_id_vendedor, id_nota : id_nota_reporte , baja: "DEBE", autorizado: nombre_usuario, id_usuario: id_usuario, fecha_baja: fecha_baja},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.dataReporte = dato;
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
            }
        });
    /////////////////////////////////////////////////////////////////////      
    };


    //funcion para imprimir reporte_imprime_nuevo
    $scope.imprimir_reporte = function (){
        
        location.href = 'imprime_reporte.html';
    };


    /////////////////////////////////////////////////////////////////////
    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});

//-------------- ALMACEN
app.controller("almacenListarCtrl", function($scope, $http) {
    //declaracion de variables 
    $scope.dataInventa = {};
    //fecha
    //var date = new Date();
    var d = new Date();
    $scope.fecha =  d.getDate() + " - " + d.getMonth() + " - " + d.getFullYear();

    /*-----------------------------------------------------------------*/
    ////
    $.ajax({
            // la URL para la petición
            url : 'php/almacen.producto.nota.pedido.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "nota_pedido_producto"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //console.log(dataUser);
                $scope.dataInventario = data;
                //$scope.selectedProducto = dataUser;
                $scope.$apply();

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
                //location.href='#/usuario_listar';
            }
        });
    /*-----------------------------------------------------------------*/


});

app.controller("almacenAgregarCtrl", function($scope, $http) {
    //focus en donde empieza
    $("#id_notaPedido_productoS").focus();
    //declaracion de variables
    $scope.formAlmacen = {};
    //$scope.u_barra = "";
    //$scope.u_kg = "";
    var id_usuario_1 = sessionStorage.getItem("id_user");
    var f1=new Date();
    var fecha1 =f1.getFullYear() + "-" +(f1.getMonth() + 1 )+ "-" +f1.getDate();
    $scope.a_cantidad = 0;
    $scope.a_unidad = 0;
    $scope.a_rango1 = 0;
    $scope.a_rango2 = 0;
    
    //Convertidor de barra

    ////carga de productos para llenar almacen
    $.ajax({
            // la URL para la petición
            url : 'php/producto.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo: "producto"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dataUser) {
                //console.log(dataUser);

                $scope.datap = {
                        availableOptionsProducto: dataUser
                };
                $scope.selectedProducto = dataUser;
                $scope.$apply();

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
            }
        });
    
 
    ////carga de productos para llenar almacen
    $.ajax({
            // la URL para la petición
            url : 'php/almacen.agregar.listar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { id_usuario: id_usuario_1, fecha: fecha1},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                //console.log(dataUser);

                $scope.datoAlmacenProducto = dato;

                //$(".almacen_to").val(dato[0].total);
                $scope.$apply();

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
            }
        });
    /*-----------------------------------------------------------------*/

    //fecha de ingresdo de almacen automatico
    var f=new Date();
    //document.write(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());   
    //$(".n_fechaCreacion").val(f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear());
    $(".almacen_fe").val(f.getFullYear() + "-" +(f.getMonth() + 1 )+ "-" +f.getDate());

    //funcion para escoger producto y llenado de formulario para enviar.
    $scope.hasChangedProducto = function(){
        $scope.nombre_producto = $scope.selectedProducto.nombre;
        $scope.formAlmacen.id_producto = $scope.selectedProducto.id_producto;
        //console.log($scope.selectedProducto.nombre);
        $scope.formAlmacen.nombre_producto = $scope.selectedProducto.nombre;
        //console.log($scope.formAlmacen.nombre_producto + $scope.formAlmacen.id_producto);
        $scope.a_cantidad = $scope.selectedProducto.cantidad;
        $scope.a_unidad = $scope.selectedProducto.unidad;
        $scope.a_rango1 = $scope.selectedProducto.rango_1;
        $scope.a_rango2 = $scope.selectedProducto.rango_2;


        //console.log($scope.formAlmacen.nombre_producto);
        $scope.formAlmacen.descripcion = "Almacen";


    };

    //boton funcion para adicionar producto al almacen
    $scope.agregarAlmacen = function(){
        //////////////////////////////////////////////////////////////////////
        //var f2=new Date();
        //var fecha2 = f2.getHours() + ":" + f2.getMinutes() + ":" + f2.getSeconds();
        $scope.formAlmacen.fecha = $(".almacen_fe").val();
        $scope.formAlmacen.peso = $(".almacen_pe").val();
        $scope.formAlmacen.id_usuario = sessionStorage.getItem("id_user");
        $scope.formAlmacen.usuario = sessionStorage.getItem("user");

        //ajax para llenado de lista de productos
        $.ajax({
            // la URL para la petición
            url : 'php/almacen.agregar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : $scope.formAlmacen,
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.datoAlmacenProducto = dato;
                $("#id_notaPedido_productoS").focus();
                //$(".almacen_to").val(dato[0].total);
                $scope.$apply();
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
                $(".almacen_pe").val("");
            }
        });
        /////////////////////////////////////////////////////////////////////    
    };

    // eliminar producto de almacen
    $scope.almacen_eliminar = function(id_alm){

        var id_us = sessionStorage.getItem("id_user");
        var f=new Date();
        var fec =f.getFullYear() + "-" +(f.getMonth() + 1 )+ "-" +f.getDate();
        //ajax para mandar peticion de eliminacion de producto de almacen
        $.ajax({
            // la URL para la petición
            url : 'php/almacen.eliminar.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { id_almacen: id_alm , id_usuario: id_us, fecha: fec},
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(dato) {
                $scope.datoAlmacenProducto = dato;

                //$(".almacen_to").val(dato[0].total);
                $scope.$apply();
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
            }
        });
        /////////////////////////////////////////////////////////////////////  
    };
    /////////////////////////////////////////////////////////////////////


    //converitr de barra a kg
    /*$scope.convertir_barra_kg = function(){
        $scope.u_kg = Math.round10(($scope.u_barra * $scope.a_rango1), -1);
    }
    //converitr de kg a barra
    $scope.convertir_kg_barra = function(){
        if( $scope.a_rango1 <= $scope.u_kg <= $scope.a_rango2){
            $scope.u_barra = 1;       
        }
        if( $scope.a_rango2 <$scope.u_kg ){
            $scope.u_barra = Math.round10(($scope.u_kg / $scope.a_rango1), 0);
        }
    }*/


    //**-------botón volver atrás-----***
    $scope.volver = function(){
        window.history.back();       
    };

});

app.controller("almacenModificarCtrl", function($scope, $http) {

});

//*******************************************************************
//***************************************controller*******************************
//***************************************router*******************************
app.config(function($routeProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "template/main.html"
    })
    .when("/main", {
        templateUrl : "template/main.html"
    })
    .when("/almacen_listar", {
        templateUrl : "template/almacen_listar.html",
        controller : "almacenListarCtrl"
    })
    .when("/almacen_agregar", {
        templateUrl : "template/almacen_agregar.html",
        controller : "almacenAgregarCtrl"
    })
    .when("/alamacen_modificar", {
        templateUrl : "template/almacen_modificar.html",
        controller : "almacenModificarCtrl"
    })
    .when("/nota_listar", {
        templateUrl : "template/nota_listar.html",
        controller : "notaListarCtrl"
    })
    .when("/nota_agregar", {
        templateUrl : "template/nota_agregar.html",
        controller : "notaAgregarCtrl"
    })
    .when("/nota_modificar", {
        templateUrl : "template/nota_modificar.html",
        controller : "notaModificarCtrl"
    })
    .when("/reporte_listar", {
        templateUrl : "template/reporte_listar.html",
        controller : "reporteListarCtrl"
    })
    .when("/reporte_agregar", {
        templateUrl : "template/reporte_agregar.html",
        controller : "reporteAgregarCtrl"
    })
    .when("/producto", {
        templateUrl : "template/producto_listar.html",
        controller : "productoCtrl"
    })
    .when("/producto_agrega", {
        templateUrl : "template/producto_agrega.html",
        controller : "productoAgregarCtrl"
    })
    .when("/producto_modificar", {
        templateUrl : "template/producto_modificar.html",
        controller : "productoModificarCtrl"
    })
    .when("/cliente", {
        templateUrl : "template/cliente_listar.html",
        controller : "clienteListarCtrl"
    })
    .when("/cliente_modificar", {
        templateUrl : "template/cliente_modificar.html",
        controller : "clienteModificarCtrl"
    })
    .when("/cliente_agrega", {
        templateUrl : "template/cliente_agrega.html",
        controller : "clienteAgregarCtrl"
    })
    .when("/usuario_listar", {
        templateUrl : "template/usuario_listar.html",
        controller : "usuarioListarCtrl"
    })
    .when("/usuario_agregar", {
        templateUrl : "template/usuario_agregar.html",
        controller : "usuarioAgregarCtrl"
    })
    .when("/usuario_modificar", {
        templateUrl : "template/usuario_modificar.html",
        controller : "usuarioModificarCtrl"
    })
    .when("/empleado_listar", {
        templateUrl : "template/empleado_listar.html",
        controller : "empleadoListarCtrl"
    })
    .when("/empleado_agregar", {
        templateUrl : "template/empleado_agregar.html",
        controller : "empleadoAgregarCtrl"
    })
    .when("/empleado_modificar", {
        templateUrl : "template/empleado_modificar.html",
        controller : "empleadoModificarCtrl"
    });
});
