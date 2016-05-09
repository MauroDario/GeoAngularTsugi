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

    return $http.get('http://geofutbol.azurewebsites.net/api/canchas/getCahchas/' + lat + '/' + lng + '/' + dist).then(requestSuccessful, requestSuccessful);

    function requestSuccessful(response) {
      //if (_.isEmpty(response.data)) throw new Error();

      Canchas.list = [{
        "nombre": "home",
        "direccion": "Yapeyu 200",
        "tel1": "1554444444",
        "tel2": "44445555",
        "email": "yape@gmail.com",
        "pisoCemento": true,
        "pisoParquet": false,
        "pisoBaldosa": false,
        "pisoTierra": false,
        "pisoCespedS": false,
        "pisoCespedN": false,
        "jugadores5": true,
        "jugadores6": false,
        "jugadores7": true,
        "jugadores8": false,
        "jugadores9": false,
        "jugadores11": false,
        "canchaAbierta": true,
        "canchaAbiertaLuz": true,
        "canchaTechada": false,
        "latitude": -34.61521,
        "longitude": -58.4216156,
        "ranking": null,
        "distancia": 0.034424971220876212
            }, {
        "nombre": "Maria Auxiliadora",
        "direccion": "Hipólito Yrigoyen 3999",
        "tel1": "1112222",
        "tel2": null,
        "email": null,
        "pisoCemento": false,
        "pisoParquet": true,
        "pisoBaldosa": true,
        "pisoTierra": false,
        "pisoCespedS": false,
        "pisoCespedN": false,
        "jugadores5": true,
        "jugadores6": false,
        "jugadores7": true,
        "jugadores8": false,
        "jugadores9": false,
        "jugadores11": false,
        "canchaAbierta": false,
        "canchaAbiertaLuz": false,
        "canchaTechada": true,
        "latitude": -34.6144,
        "longitude": -58.42286,
        "ranking": null,
        "distancia": 0.12416465843776053
            }, {
        "nombre": "subte",
        "direccion": "Rivadavia 4020",
        "tel1": null,
        "tel2": null,
        "email": null,
        "pisoCemento": false,
        "pisoParquet": false,
        "pisoBaldosa": false,
        "pisoTierra": false,
        "pisoCespedS": true,
        "pisoCespedN": false,
        "jugadores5": true,
        "jugadores6": false,
        "jugadores7": false,
        "jugadores8": false,
        "jugadores9": true,
        "jugadores11": true,
        "canchaAbierta": true,
        "canchaAbiertaLuz": true,
        "canchaTechada": true,
        "latitude": -34.6115379,
        "longitude": -58.42171,
        "ranking": 2,
        "distancia": 0.3736649078666115
            }, {
        "nombre": "Acatraz",
        "direccion": "Rivadavia 3620",
        "tel1": "44445566",
        "tel2": null,
        "email": "aca@traz.com",
        "pisoCemento": true,
        "pisoParquet": false,
        "pisoBaldosa": false,
        "pisoTierra": false,
        "pisoCespedS": false,
        "pisoCespedN": false,
        "jugadores5": true,
        "jugadores6": true,
        "jugadores7": true,
        "jugadores8": true,
        "jugadores9": true,
        "jugadores11": true,
        "canchaAbierta": false,
        "canchaAbiertaLuz": false,
        "canchaTechada": true,
        "latitude": -34.6110344,
        "longitude": -58.41768,
        "ranking": null,
        "distancia": 0.56210209565533376
            }];
    }

    function requestUnsuccessful() {
      throw new Error();
    }
  };
  return Canchas;
});

myApp.controller('geoCtrl', function ($scope, Canchas, ngToast, NgMap, $rootScope, $timeout) {
  $rootScope.$on('$viewContentLoaded', function (event) {
    componentHandler.upgradeElements(document.querySelectorAll('.mdl-layout'));
  });

  $scope.$on("mapInitialized", function (event, map) {
    $scope.objMapa = map;
    google.maps.event.addListener(map, "click", function (event) {
      if ($scope.infowindow != null)
        $scope.infowindow.close();
    });

    // Fix para height del mapa: Height total - height del nav header
    $('#mapa').height($(window).height() - $('.mdl-layout__header-row').height());
    google.maps.event.trigger(map, 'resize');
  });

  $scope.showInfoWindow = function (event, p) {
    if ($scope.infowindow != null)
      $scope.infowindow.close();
    var infowindow = new google.maps.InfoWindow();
    $scope.infowindow = infowindow;
    var center = new google.maps.LatLng(p.latitude, p.longitude);
    $scope.objMapa.setCenter({lat:p.latitude, lng:p.longitude});
    var content = "<h5 class='greenText'>&quot;" + p.nombre + "&quot;</h5>";
    var futbolArray = [];
    if (p.jugadores6 == true) futbolArray.push("6");
    if (p.jugadores7 == true) futbolArray.push("7");
    if (p.jugadores5 == true) futbolArray.push("5");
    if (p.jugadores8 == true) futbolArray.push("8");
    if (p.jugadores9 == true) futbolArray.push("9");
    if (p.jugadores11 == true) futbolArray.push("11");

    content += "<p class='gp'>-Futbol: " + futbolArray.join() + "</p>";

    var cespedarray = [];
    if (p.pisoCespedS == true) cespedarray.push("Cesped Sintetico");
    if (p.pisoCespedN == true) cespedarray.push("Cesped");
    if (p.pisoCemento == true) cespedarray.push("Cemento");
    if (p.pisoParquet == true) cespedarray.push("Parquet");
    if (p.pisoBaldosa == true) cespedarray.push("Baldosa");
    if (p.pisoTierra == true) cespedarray.push("Tierra");

    if (cespedarray.length > 0)
      content += "<p class='gp'>-" + cespedarray.join("/") + "</p>";

    var luzArray = [];
    if (p.canchaAbierta == true) luzArray.push("Abierta");
    if (p.canchaAbiertaLuz == true) luzArray.push("Abierta con luz");
    if (p.canchaTechada == true) luzArray.push("Techada");

    if (luzArray.length > 0)
      content += "<p class='gp'>-" + luzArray.join("/") + "</p>"

    content += (p.email != null) ? "<div><a class='greenText' href='mailto:" + p.email + "'>" + p.email + "</a></div>" : "";
    content += (p.tel1 != null) ? "<div><a class='greenText' href='tel:" + p.tel1 + "'>" + p.tel1 + "</a></div>" : "";
    content += (p.tel2 != null) ? "<div><a class='greenText' href='tel:" + p.tel2 + "'>" + p.tel1 + "</a></div>" : "";

    content += (p.direccion != null) ? "<h5 class='mdl-typography--text-right'>" + p.direccion + "</h5>" : "";

    infowindow.setContent(content);

    google.maps.event.addListener(infowindow, 'domready', function () {

      // Reference to the DIV which receives the contents of the infowindow using jQuery
      var iwOuter = $('.gm-style-iw');

      /* The DIV we want to change is above the .gm-style-iw DIV.
       * So, we use jQuery and create a iwBackground variable,
       * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
       */
      var iwBackground = iwOuter.prev();

      // saca el display inline-block

      iwOuter.children().css({
        'display': 'block'
      });

      // Remove the background shadow DIV
      iwBackground.children(':nth-child(2)').css({
        'display': 'none'
      });

      // Remove the white background DIV
      iwBackground.children(':nth-child(4)').css({
        'display': 'none'
      });

      // Taking advantage of the already established reference to
      // div .gm-style-iw with iwOuter variable.
      // You must set a new variable iwCloseBtn.
      // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
      // Is this div that groups the close button elements.
      var iwCloseBtn = iwOuter.next();

      // Apply the desired effect to the close button
      iwCloseBtn.css({
        display: 'none',
        closeBoxURL: ""
      });
      // The API automatically applies 0.7 opacity to the button after the mouseout event.
      // This function reverses this event to the desired value.
      iwCloseBtn.mouseout(function () {
        $(this).css({
          opacity: '0',
          closeBoxURL: "",
          display: 'none',
        });

      });

    });


    infowindow.setPosition(center);
    infowindow.open($scope.objMapa);
  };

  $scope.showTipoPiso = false;
  $scope.showTipoCancha = false;
  $scope.showCantJug = false;

  $scope.toogleTipoPiso = function () {
    $scope.showTipoPiso = !$scope.showTipoPiso;
    $scope.showTipoCancha = false;
    $scope.showCantJug = false;
  };

  $scope.toogleTipoCancha = function () {
    $scope.showTipoCancha = !$scope.showTipoCancha;
    $scope.showTipoPiso = false;
    $scope.showCantJug = false;
  };

  $scope.toogleCantJug = function () {
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
    $scope.detalle = angular.copy($scope.detalle);
    $timeout(function () {}, 0);
    NgMap.getMap("mapa").then(function (map) {
      $rootScope.map = map;

      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });


  }
});