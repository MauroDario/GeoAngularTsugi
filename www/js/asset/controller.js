myApp.controller('geoCtrl', function($scope, canchasFactory){
    var lat = -34.614901;
    var long = -58.421647;

    //llamada a la factory
/*
    canchasFactory.getCanchas(lat, long, 5).then(function(response){

        canchas = response;
        console.log(canchas);

        $scope.canchas = _.filter(canchas, {'jugadores5':true,'pisoCespedS':true});


    });
*/

    $scope.canchas = function(){
       canchasFactory.getDataFromServer(lat, long, 3);
    };

});