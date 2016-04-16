var myApp = angular.module('starter', ['ngRoute', 'ngToast', 'ngMap'])

myApp.config(function ($routeProvider) {

    var promiseGetServer = ['Canchas', function (Canchas) {
        return Canchas.getDataFromServer();
    }];

    $routeProvider
        .when('/', {
        templateUrl: 'templates/datos.html',
        controller: 'geoCtrl',
        resolve: [promiseGetServer]
    })
        .otherwise({
        redirectTo: '/'
    });
})

myApp.factory('Canchas', function ($http) {

    var Canchas = {};
    Canchas.list = [];


    Canchas.getDataFromServer = function getDataFromServer() {

        var lat = -34.614901;
        var lng = -58.421647;
        var dist = 90;


        if (!_.isEmpty(Canchas.list)) return;

        return $http.get('http://localhost:6318/api/canchas/getCahchas/' + lat + '/' + lng + '/' + dist).then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response) {
            if (_.isEmpty(response.data)) throw new Error();

            Canchas.list = [{"nombre":"home","direccion":"Yapeyu 200","tel1":"1554444444","tel2":"44445555","email":"yape@gmail.com","pisoCemento":true,"pisoParquet":false,"pisoBaldosa":false,"pisoTierra":false,"pisoCespedS":false,"pisoCespedN":false,"jugadores5":true,"jugadores6":false,"jugadores7":true,"jugadores8":false,"jugadores9":false,"jugadores11":false,"canchaAbierta":true,"canchaAbiertaLuz":true,"canchaTechada":false,"latitude":-34.61521,"longitude":-58.4216156,"ranking":null,"distancia":0.034424971220876212},{"nombre":"Maria Auxiliadora","direccion":"Hipólito Yrigoyen 3999","tel1":"1112222","tel2":null,"email":null,"pisoCemento":false,"pisoParquet":true,"pisoBaldosa":true,"pisoTierra":false,"pisoCespedS":false,"pisoCespedN":false,"jugadores5":true,"jugadores6":false,"jugadores7":true,"jugadores8":false,"jugadores9":false,"jugadores11":false,"canchaAbierta":false,"canchaAbiertaLuz":false,"canchaTechada":true,"latitude":-34.6144,"longitude":-58.42286,"ranking":null,"distancia":0.12416465843776053},{"nombre":"subte","direccion":"Rivadavia 4020","tel1":null,"tel2":null,"email":null,"pisoCemento":false,"pisoParquet":false,"pisoBaldosa":false,"pisoTierra":false,"pisoCespedS":true,"pisoCespedN":false,"jugadores5":true,"jugadores6":false,"jugadores7":false,"jugadores8":false,"jugadores9":true,"jugadores11":true,"canchaAbierta":true,"canchaAbiertaLuz":true,"canchaTechada":true,"latitude":-34.6115379,"longitude":-58.42171,"ranking":2,"distancia":0.3736649078666115},{"nombre":"Acatraz","direccion":"Rivadavia 3620","tel1":"44445566","tel2":null,"email":"aca@traz.com","pisoCemento":true,"pisoParquet":false,"pisoBaldosa":false,"pisoTierra":false,"pisoCespedS":false,"pisoCespedN":false,"jugadores5":true,"jugadores6":true,"jugadores7":true,"jugadores8":true,"jugadores9":true,"jugadores11":true,"canchaAbierta":false,"canchaAbiertaLuz":false,"canchaTechada":true,"latitude":-34.6110344,"longitude":-58.41768,"ranking":null,"distancia":0.56210209565533376}];
        }

        function requestUnsuccessful() {
            throw new Error();
        }
    };
    return Canchas;
});

myApp.controller('geoCtrl', function ($scope, Canchas, ngToast, NgMap, $rootScope) {

    $scope.popup = function(id) {
        NgMap.getMap("mapa").then(function (map) {
            map.showInfoWindow(id);
        });        
    };

    $scope.showTipoPiso = false;
    $scope.showTipoCancha = false;
    $scope.showCantJug = false;

    $scope.toogleTipoPiso = function() {
        $scope.showTipoPiso = !$scope.showTipoPiso;
        $scope.showTipoCancha = false;
        $scope.showCantJug = false;
    };

    $scope.toogleTipoCancha = function() {
        $scope.showTipoCancha = !$scope.showTipoCancha;
        $scope.showTipoPiso = false;
        $scope.showCantJug = false;
    };

    $scope.toogleCantJug = function() {
        $scope.showCantJug = !$scope.showCantJug;
        $scope.showTipoCancha = false;
        $scope.showTipoPiso = false;
    };

    $scope.oneAtATime = true;

    var reglasFiltro = {};

    $scope.detalle = Canchas.list;

    $scope.reglasFiltro = function () {

        //PISOS
        reglasFiltro['pisoCemento'] = $scope.pisoC === true;
        reglasFiltro['pisoParquet'] = $scope.pisoP === true;
        reglasFiltro['pisoBaldosa'] = $scope.pisoB === true;
        reglasFiltro['pisoTierra'] = $scope.pisoT === true;
        reglasFiltro['pisoCespedS'] = $scope.pisoCS === true;
        reglasFiltro['pisoCespedN'] = $scope.pisoCN === true;

        if ($scope.pisoC == false || $scope.pisoC == undefined) {
            delete reglasFiltro.pisoCemento;
        }
        if ($scope.pisoP == false || $scope.pisoP == undefined) {
            delete reglasFiltro.pisoParquet;
        }
        if ($scope.pisoB == false || $scope.pisoB == undefined) {
            delete reglasFiltro.pisoBaldosa;
        }
        if ($scope.pisoT == false || $scope.pisoT == undefined) {
            delete reglasFiltro.pisoTierra;
        }
        if ($scope.pisoCS == false || $scope.pisoCS == undefined) {
            delete reglasFiltro.pisoCespedS;
        }
        if ($scope.pisoCN == false || $scope.pisoCN == undefined) {
            delete reglasFiltro.pisoCespedN;
        }

        //JUGADORES
        reglasFiltro['jugadores5'] = $scope.j5 === true;
        reglasFiltro['jugadores6'] = $scope.j6 === true;
        reglasFiltro['jugadores7'] = $scope.j7 === true;
        reglasFiltro['jugadores8'] = $scope.j8 === true;
        reglasFiltro['jugadores9'] = $scope.j9 === true;
        reglasFiltro['jugadores11'] = $scope.j11 === true;

        if ($scope.j5 == false || $scope.j5 == undefined) {
            delete reglasFiltro.jugadores5;
        }
        if ($scope.j6 == false || $scope.j6 == undefined) {
            delete reglasFiltro.jugadores6;
        }
        if ($scope.j7 == false || $scope.j7 == undefined) {
            delete reglasFiltro.jugadores7;
        }
        if ($scope.j8 == false || $scope.j8 == undefined) {
            delete reglasFiltro.jugadores8;
        }
        if ($scope.j9 == false || $scope.j9 == undefined) {
            delete reglasFiltro.jugadores9;
        }
        if ($scope.j11 == false || $scope.j11 == undefined) {
            delete reglasFiltro.jugadores11;
        }

        //CANCAHAS
        reglasFiltro['canchaAbierta'] = $scope.canchaA === true;
        reglasFiltro['canchaAbiertaLuz'] = $scope.canchaAL === true;
        reglasFiltro['canchaTechada'] = $scope.canchaT === true;

        if ($scope.canchaA == false || $scope.canchaA == undefined) {
            delete reglasFiltro.canchaAbierta;
        }
        if ($scope.canchaAL == false || $scope.canchaAL == undefined) {
            delete reglasFiltro.canchaAbiertaLuz;
        }
        if ($scope.canchaT == false || $scope.canchaT == undefined) {
            delete reglasFiltro.canchaTechada;
        }

        var detalles = _.filter(Canchas.list, reglasFiltro);

        if (_.isEmpty(detalles)) {
            ngToast.create({
                className: 'warning',
                content: '<b>No se han encontrado items</b>'
            });
        }
        //[{"latitude":56.94742425328988,"longitude":-105.16961585240858,"title":"m0","id":0}
        console.clear();
        _.forEach(detalles, function (value) {
            console.log(value.latitude + "," + value.longitude);
        });

        $scope.detalle = detalles;

        NgMap.getMap("mapa").then(function (map) {
            $rootScope.map = map;
            /*angular.forEach($scope.detalle, function (k, v) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: v.latitude,
                        lng: v.longitude
                    },
                    map: map,
                    title: v.nombre
                });

            });*/
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

    }
});