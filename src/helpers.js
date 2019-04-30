import Alert from 'react-s-alert';
import $ from "jquery";

const alertConfigs = {
    position: 'top-right',
    effect: 'slide',
    beep: false,
    timeout: 4000
};

export function alertError(message) {
    Alert.error(message, alertConfigs);
}

export function alertSuccess(message) {
    Alert.success(message, alertConfigs)
}

export function beautifyName(name) {
    if (typeof name === 'string') {
        let newName = [];
        name = name.split('_');
        name.map(value => newName.push(value.charAt(0).toUpperCase() + value.slice(1)));
        return newName.join(' ')
    }
    return name
}

export function beautifyDate(date) {
    if (date.toString().length === 10) date = date*1000;
    return new Date(date).toISOString().replace('T', ' - ').slice(0, -5)
}

export const delay = (() => {
    let timer = 0;
    return (callback, ms) => {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
})();

export function clone(obj, blacklist) {
    let newObj = {...obj};
    blacklist.forEach((item) => {
        delete newObj[item];
    });
    return newObj
}

export function removeEmptyKeys(obj) {
    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    return obj;
}

let flashErrorsTimeoutID = null;
export const flashErrors = (component, errors, fadeAfter = 5000, name="errors") => {
    component.setState({[name]: (errors || {})});
    $('.error-row').fadeIn('fast', () => {
        if (flashErrorsTimeoutID) {
            clearTimeout(flashErrorsTimeoutID);
            flashErrorsTimeoutID = null;
        }
        flashErrorsTimeoutID = setTimeout(() => {
            flashErrorsTimeoutID = null;
            $('.error-row').fadeOut(1000, () => {
                component.setState({[name]: {}})
            });
        }, fadeAfter)
    });
};


export function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

export function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

export function booleanOptions () {
    return [
        trueBooleanOption(),
        falseBooleanOption()
    ]
}

export function falseBooleanOption() {
    return {label: 'No', value: false}
}

export function trueBooleanOption() {
    return {label: 'Yes', value: true}
}