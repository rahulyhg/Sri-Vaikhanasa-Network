var app = angular.module('svnUiApp', ['google-signin']);
 
app.config(['GoogleSigninProvider', function(GoogleSigninProvider) {
     GoogleSigninProvider.init({
        client_id: 'YOUR_CLIENT_ID',
     });
}]);
 
app.controller('AuthCtrl', ['$scope', 'GoogleSignin', function ($scope, 
GoogleSignin) {
    $scope.login = function () {
        GoogleSignin.signIn().then(function (user) {
            console.log(user);
        }, function (err) {
            console.log(err);
        });
    };
}]);