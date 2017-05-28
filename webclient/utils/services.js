import { forEachObjIndexed } from 'ramda';

const base = 'http://localhost:3000';

const decorateService = ({ url, method, headers }) =>
    ({ params, body } = {}) => {
        const req = { method, headers };
        let targetUrl = url;

        if (params) {
            forEachObjIndexed((value, key) => targetUrl = url.replace(`:${key}`, value), params);
        }

        if (body) {
            req.body = JSON.stringify(body);
        }

        return fetch(targetUrl, req)
            .then(res => {
                if (res.status >= 400) {
                    return Promise.reject(res.statusText);
                }

                return res.json();
            })
            .catch(err => console.error(err))
    };

const services = [
    {
        url: `${base}/api/todos`,
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        name: 'getTodos'
    },
    {
        url: `${base}/api/todos/:username`,
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        name: 'getUserTodos'
    },
    {
        url: `${base}/api/todo`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        name: 'addTodo'
    },
    {
        url: `${base}/api/todo/:id`,
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        name: 'editTodo'
    },
    {
        url: `${base}/api/todo/:id`,
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
        name: 'removeTodo'
    },
    {
        url: `${base}/api/register`,
        method: 'POST',
        headers:  {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        name: 'register'
    },
    {
        url: `${base}/api/login`,
        method: 'POST',
        headers:  {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        name: 'login'
    },
    {
        url: `${base}/chat-api/messages`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        name: 'getChatMessages'
    }
];

export default services.reduce((services, service) => {
    services[service.name] = decorateService(service);

    return services;
}, {});


