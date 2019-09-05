import {PURL_SERVER} from './config'

export function getDiscDetail(id) {
    let promise = new Promise((resolve, reject) => {
        fetch(PURL_SERVER + "/rankDetail/?id="+id)
            .then(body => {
                return body.json();
            })
            .then(res => {
                resolve(res);
            })
            .catch(e => {
                reject(e);
            });
    });
    return promise;
}