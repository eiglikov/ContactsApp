var contactsApp = angular.module('contactsApp', []);

contactsApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

    var refresh = function () {
        $http.get("/contactList").success(function (response) {
            console.log("REFRESH: Data requested is received");
            $scope.contactList = response;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addContact = function () {
        console.log("ADD: " + $scope.contact._id);


        $http.post('/contactList', $scope.contact).then(function (response) {
            console.log("ADD RESPONSE: " + response);
            refresh();
        });
    };

    /**
     * Remove ctrl. Handles call of remove function from ejs.
     * @param id
     */
    $scope.remove = function (id) {
        console.log(id);
        // call the proper router with id passed in Express
        $http.delete('/contactList/' + id).success(function (response) {
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log("contact id in edit is " + id + " " + $scope.contact.name);
        console.log($scope.contact);
        $http.get('/contactList/' + id).success(function (response) {
            $scope.contact = response;
        });
    };

    $scope.update = function () {
        console.log("UPDATE: _id + Name " + $scope.contact._id + " " + $scope.contact.name);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function (response) {
            refresh();
        });
    };

    $scope.deselect = function () {
        $scope.contact = "";
    };

    $scope.checkInput = function(){
        if($scope.contact.number == null || $scope.contact.email == null){
            console.log("IS FALSE!");
            return false;
        } else
            return true;
    };

    $scope.undo = function () {

    };

    $scope.pattern = /^\s*$/g;
}]);

