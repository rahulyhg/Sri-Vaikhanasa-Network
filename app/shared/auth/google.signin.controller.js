angular.module('svnUiApp')
    .controller('google.signin.controller', function ($scope, $window, $http) {

        function saveUser(user) {
            $window.localStorage.setItem("user", angular.toJson(user));
        };

        function getUser() {
            var user = $window.localStorage.getItem("user");
            if (user) {
                return JSON.parse(user);
            }
            return null;
        };

        function removeUser() {
            $window.localStorage.removeItem("user");
        };

        function updateCurrentUser() {
            $scope.user = {
                name: "Guest",
                photo: null,
                email: null,
                access_token: null
            };
            $scope.isSignedIn = false;
            var user = getUser();
            if (user) {
                $scope.user = user;
                $scope.isSignedIn = true;
            }
        };

        function signIn(authResult) {
            saveUser({
                name: authResult.wc.wc,
                photo: authResult.wc.Ph,
                email: authResult.wc.hg,
                access_token: authResult.hg.access_token
            });
            updateCurrentUser();
        };

        function signOut() {

            var revokeUrl = "https://accounts.google.com/o/oauth2/revoke?token=" + $scope.user.access_token;
            // this part revokes token
            $http.jsonp(revokeUrl,
                {
                    params: {
                        callback: 'JSON_CALLBACK',
                        format: 'jsonp'
                    }
                }).success(function () {
                    console.log('User signed out');
                });

            // this part logs out from google account
            // $http.jsonp('https://accounts.google.com/logout');
            // https://security.google.com/settings/security/permissions

            removeUser();
            updateCurrentUser();

        };

        updateCurrentUser();
        console.log($scope.user.name);

        $scope.signOut = signOut;

        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log('Signed in!');
            signIn(authResult);
            $scope.$apply()
        });

        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
            signOut();
            $scope.$apply();
        });

        // $scope.$watch('isSignedIn', function (val) {
        //     alert('hey, isSignedIn has changed!' + val);
        // });
    });