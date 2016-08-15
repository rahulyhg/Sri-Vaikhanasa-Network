angular.module('svnUiApp')
    .controller('google.signin.controller', function ($scope, $localStorage) {

        $scope.isSignedIn = function () {
            return $localStorage.isSignedIn;
        }

        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log('Signed in!');
            if (authResult.hg['access_token']) {
                $localStorage.isSignedIn = true;
            } else if (!authResult.hg['access_token']) {
                $localStorage.isSignedIn = false;
            }
        });

        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
        });

        $scope.signOut = signOut;

        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                $localStorage.isSignedIn = false;
            });
        };

    });