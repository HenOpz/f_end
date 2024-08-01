import Axios from 'axios'
import store from '/src/store'

var url;
if (store.state.mode == 'dev') {
    url = store.state.urlApi.dev;
}
else if (store.state.mode == 'prod') {
    url = store.state.urlApi.prod;
}

export const axios = Axios.create({
    baseURL: url,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    timeout: 60000,
})

export const axiosFileMaker = Axios.create({
    baseURL: store.state.urlApiFileMaker,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    timeout: 60000,
})

export const GET_DATA = (context = this, url, targetVariableOrCallback, callback = null, errorCallback = null) => {
    context.isLoading = true;
    axios({
        method: "get",
        url: url,
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
    })
        .then(res => {
            if (res.status == 200 && res.data) {
                if (typeof targetVariableOrCallback === 'function') {
                    targetVariableOrCallback(res.data);
                } else {
                    if (targetVariableOrCallback && typeof targetVariableOrCallback === 'string') {
                        const keys = targetVariableOrCallback.split('.');
                        let obj = context;
                        keys.slice(0, -1).forEach(key => {
                            obj = obj[key];
                        });
                        context.$set(obj, keys[keys.length - 1], res.data);
                    }
                    if (typeof callback === 'function') {
                        callback(res.data);
                    }
                }
            }
            else {
                console.log('status', res.status);
            }
        })
        .catch(error => {
            if (typeof errorCallback === 'function') {
                errorCallback(error);
            }
        })
        .finally(() => {
            context.isLoading = false;
        });
}

export const POST_DATA = (url, data, formOrCallback = null, callback = null) => {
    let header = { Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")) }
    if (typeof formOrCallback === 'boolean' && formOrCallback === true) {
        header = { ...header, "Content-Type": "multipart/form-data" }
    }
    axios({
        method: "post",
        url: url,
        headers: header,
        data: data
    })
        .then(res => {
            if (res.status == 201 || res.status == 200) {
                if (typeof formOrCallback === 'function') {
                    if (res.data) formOrCallback(res.data);
                    else formOrCallback();
                }
                else if (typeof callback === 'function') {
                    if (res.data) callback(res.data);
                    else callback();
                } 
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {});
}

export const PUT_DATA = (url, data, formOrCallback = null, callback = null) => {
    let header = { Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")) }
    if (typeof formOrCallback === 'boolean' && formOrCallback === true) {
        header = { ...header, "Content-Type": "multipart/form-data" }
    }
    axios({
        method: "put",
        url: url,
        headers: header,
        data: data
    })
        .then(res => {
            if (res.status == 204) {
                if (typeof formOrCallback === 'function') {
                    if (res.data) formOrCallback(res.data);
                    else formOrCallback();
                }
                else if (typeof callback === 'function') {
                    if (res.data) callback(res.data);
                    else callback();
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {});
}

export const DELETE_DATA = (url, callback) => {
    axios({
        method: "delete",
        url: url,
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
    })
        .then(res => {
            if (res.status == 204 || res.status == 201) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {});
}