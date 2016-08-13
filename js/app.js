var app = angular.module("svnUiApp", []);

app.controller("contactUsCtrl", function ($scope, $http) {

    $scope.reCaptchaResponse = "";
    $scope.setReCaptchaResponse = function (response) {
        alert(response);
        $scope.reCaptchaResponse = response;
    };

    $scope.submit = function () {

        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "subject": $scope.subject,
            "message": $scope.message,
            "g-recaptcha-response": $scope.reCaptchaResponse
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
