var app = angular.module('program', ['ngGrid']);

app.controller("productoCtrl", function($scope, $http) {
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
        pageSize: 10,
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
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.php('../php/producto.listar.php').success(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });        
            } else {
                $http.get('largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
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
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [{field: 'name', displayName: 'Nombre'}, 
                     {field:'allowance', displayName:'Precio', enableCellEdit: true},
                     {displayName:'Editar', cellTemplate: '<div><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>'},
                     {displayName:'Eliminar', cellTemplate: '<div><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>'}
                     ]

    };
});