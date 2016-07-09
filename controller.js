angular
  .controller('tuintraplayersCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', '$filter'];

function loadFunction($http, $scope, structureService, $location, $filter){

  structureService.registerModule($location, $scope, "tuintraplayers");

  $scope.isBusy = true;

  var moduleConfig = $scope.tuintraplayers.modulescope;
  if(!moduleConfig.clubDomain || moduleConfig.clubDomain === ''){
    showError('tuintraplayers.error-not-set');
  } else {
    var params = {};
    if (moduleConfig.playerId)  params.playerId  = moduleConfig.playerId;
    if (moduleConfig.teamId)    params.teamId    = moduleConfig.teamId;
    if (moduleConfig.birthYear) params.birthYear = moduleConfig.birthYear;
    if (moduleConfig.gender)    params.gender    = moduleConfig.gender;

    $http.get('http://pepocivs.com:4000/public/'+moduleConfig.clubDomain+'/getPeople', {params})
    .success(function(data){
      $scope.players = prepareData(data);
      $scope.isBusy = false;
    }).error(function(){
      showError('tuintraplayers.error-loading');
    });
  }

  function showError(message) {
    $scope.error = $filter('translate')(message);
    $scope.isBusy = false;
  }

  function prepareData(data) {
    data.forEach(function(player) {
      player.birthDate = moment(player.birthDate).format('DD/MM/YYYY');
    });
    return data;
  }

}
