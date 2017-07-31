import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {

    // local storage za usere
    let users: any [] = JSON.parse(localStorage.getItem('users')) || [];

    // fake backend konfiguracija
    backend.connections.subscribe((connection: MockConnection) => {
        // timeout simulacija api poziva
        setTimeout(() => {

            // autentifikacija
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // 
                let params = JSON.parse(connection.request.getBody());

                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password
                });

                if (filteredUsers.length) {
                    // 200OK ako je login ispravan, vracaju se podaci usera
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));                    
                }
                return;
            }

            // get users
            if(connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // provjera laznog header auth tokena te vracanje usera
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: users
                    })));
                } else {
                    // 401 not authorised
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }

            // useri prema id-u
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { 
                        return user.id === id;
                    })
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // 200 OK sa user podacima
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: user
                    })));
                } else {
                    // 401 not authorized ako je token null ili neispravan
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 401
                    })));
                }

                return;
            }

            // stvaranje usera
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get user from post body
                let newUser = JSON.parse(connection.request.getBody());

                // validacija
                let duplicateUser = users.filter( user => {
                    return user.username === newUser.username;
                }).length;

                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                }

                // spremanje novog usera
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // 200 OK respond
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200
                })));

                return;
            }

            // brisanje usera
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete){
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // nadi usera prema id-u 
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                } else {
                    // 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 401
                    })));
                }
                return;
            }

            // todo: prolaz prema "pravom" backendu

        }, 500);
    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
