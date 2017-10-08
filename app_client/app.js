(function () {

    angular.module('calendarApp', ['ngRoute', 'ui.bootstrap', 'angularMoment']);

    function run($rootScope, $location) {
        // Setting current year and month at rootscope for global scope variable
        $rootScope.currentYear = moment().format("Y");
        $rootScope.currentMonth = moment().format("M") - 1;
        $rootScope.baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    }

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/:year?/:month?', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl'
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    function factory($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                function wrapper() {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                }

                socket.on(eventName, wrapper);
                return function () {
                    socket.removeListener(eventName, wrapper);
                };
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }


    angular.module('calendarApp').config(['$routeProvider', '$locationProvider', config]);
    angular.module('calendarApp').run(['$rootScope', '$location', run]);
    angular.module('calendarApp').factory('socket', ['$rootScope', factory]);

})();