myApp.factory('canchasFactory', function($http){

    var Canchas = {};
    Canchas.list = [];


    Canchas.getDataFromServer = function getDataFromServer(lat, lng, dist){
        if(!_.isEmpty(Canchas.list)) return;

        return $http.get('http://localhost:6318/api/canchas/getCahchas/'+ lat +'/'+ lng +'/'+dist).then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response){
            if(_.isEmpty(response.data)) throw new Error();

            Canchas.list = response.data;
        }

        function requestUnsuccessful(){
            throw new Error();
        }
    };

    Usuarios.getFilterCanchas = function getFilterCanchas(nombre){
        return _.find(Canchas.list, {'nombre': nombre});
    };

    return Canchas;
});