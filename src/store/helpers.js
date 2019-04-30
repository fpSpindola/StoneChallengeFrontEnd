import {store} from './index.js';

export function isAuthenticated() {
    return !!getUser();
}

export function isAuthorized(path, method='GET') {
    let user = getUser();
    if (!user) {
        return false;
    }
    let permissions = user.permissions;
    if (!permissions) {
        return false;
    }
    for (let i=0; i<permissions.length; i++) {
        let p = permissions[i];
        console.log(path, p.route, path.match(p.route));
        if (path.match(p.route) && p.methods.some(m => method.match(m))) {
            return true;
        }
    }
    return false;
}

export function getUser() {
    return store.getState().auth.user
}