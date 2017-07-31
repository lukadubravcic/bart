"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var testing_1 = require("@angular/http/testing");
function fakeBackendFactory(backend, options) {
    // local storage za usere
    var users = JSON.parse(localStorage.getItem('users')) || [];
    // fake backend konfiguracija
    backend.connections.subscribe(function (connection) {
        // timeout simulacija api poziva
        setTimeout(function () {
            // autentifikacija
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === http_1.RequestMethod.Post) {
                // 
                var params_1 = JSON.parse(connection.request.getBody());
                var filteredUsers = users.filter(function (user) {
                    return user.username === params_1.username && user.password === params_1.password;
                });
                if (filteredUsers.length) {
                    // 200OK ako je login ispravan, vracaju se podaci usera
                    var user = filteredUsers[0];
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                }
                else {
                    // 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }
                return;
            }
            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === http_1.RequestMethod.Get) {
                // provjera laznog header auth tokena te vracanje usera
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: users
                    })));
                }
                else {
                    // 401 not authorised
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                }
                return;
            }
            // useri prema id-u
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === http_1.RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    var urlParts = connection.request.url.split('/');
                    var id_1 = parseInt(urlParts[urlParts.length - 1]);
                    var matchedUsers = users.filter(function (user) {
                        return user.id === id_1;
                    });
                    var user = matchedUsers.length ? matchedUsers[0] : null;
                    // 200 OK sa user podacima
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: user
                    })));
                }
                else {
                    // 401 not authorized ako je token null ili neispravan
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 401
                    })));
                }
                return;
            }
            // stvaranje usera
            if (connection.request.url.endsWith('/api/users') && connection.request.method === http_1.RequestMethod.Post) {
                // get user from post body
                var newUser_1 = JSON.parse(connection.request.getBody());
                // validacija
                var duplicateUser = users.filter(function (user) {
                    return user.username === newUser_1.username;
                }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser_1.username + '" is already taken'));
                }
                // spremanje novog usera
                newUser_1.id = users.length + 1;
                users.push(newUser_1);
                localStorage.setItem('users', JSON.stringify(users));
                // 200 OK respond
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    status: 200
                })));
                return;
            }
            // brisanje usera
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === http_1.RequestMethod.Delete) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // nadi usera prema id-u 
                    var urlParts = connection.request.url.split('/');
                    var id = parseInt(urlParts[urlParts.length - 1]);
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.id === id) {
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
                    // 200 OK
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 200
                    })));
                }
                else {
                    // 401 not authorised if token is null or invalid
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 401
                    })));
                }
                return;
            }
            // todo: prolaz prema "pravom" backendu
        }, 500);
    });
    return new http_1.Http(backend, options);
}
exports.fakeBackendFactory = fakeBackendFactory;
;
exports.fakeBackendProvider = {
    provide: http_1.Http,
    useFactory: fakeBackendFactory,
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions]
};
//# sourceMappingURL=fake-backend.js.map