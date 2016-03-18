/**
 * Created by ayed.h on 15/03/2016.
 */
'use strict';

angular.module('aajbApp')

/**
 * This service will deal with the RESTfull web service calls for login and logout features only.
 */
    .service('UserService',function ($http, messagesProvider) {
        //this wil represent the connected user if any
        var connectedUser = undefined;
        var service = {};

        /**
         * Try to login user using its username and password.
         * If the server accepts the user credentials, the user will be saved in connectedUser object.
         * @param username: the user's username
         * @param password: the user's password
         * @return promise
         */
        service.login = function (username, password) {
            //set connected user to null !!
            connectedUser = undefined;

            //returns the promise now !!
            return $http.get('/apiaajb/api/login?login='+username+"&password="+password)

                .then(
                    function (response) {
                        //not problem user is successfully log-in
                        connectedUser = response.data;
                    },
                    function (httpError) {
                        //somthing wrong 4xx --> faillure log-in, 5xx serveur error
                        var code = httpError.status.toString().charAt(0);
                        switch (code) {
                            case '4': throw messagesProvider.getMessage(101);
                            case '5': throw messagesProvider.getMessage(102);
                            default: throw messagesProvider.getMessage(100);
                        }
                    }
                );
        };

        /**
         * Checks if the one user is connected or not !!
         * @returns {boolean|*} true: one user is connect, false otherwise
         */
        service.isConnected = function () {
            return angular.isDefined(connectedUser);
        };


        return service;
    })


;