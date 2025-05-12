/**
 * @description 存储、获取、删除token
 */
const key = 'USER-TOKEN';

export function setToken(token: string) {
    localStorage.setItem(key, token);
}

export function getToken() {
    return localStorage.getItem(key) || '';
}

export function removeToken() {
    localStorage.removeItem(key);
}