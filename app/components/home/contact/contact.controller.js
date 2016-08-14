var app = angular.module("svnUiApp");

app.controller("contact.controller", function ($scope, $http) {

    $scope.submit = function () {

        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "subject": $scope.subject,
            "message": $scope.message,
            "gRecaptchaResponse": $scope.gRecaptchaResponse
        };

        var config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        $http.put("http://api.srivaikhanasa.net/api/contactUs/submit", data, config)
            .then(
            function (response) {
                alert("Done");
            }, function (response) {
                alert("Error");
            }
            );
    };
});