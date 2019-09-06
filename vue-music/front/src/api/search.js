import { PURL_SERVER} from './config'

export function getHotKey(){
    let promise = new Promise((resolve,reject)=>{
        fetch(PURL_SERVER+'/hotkey').then(res=>res.json()).then(res=>{
            resolve(res)
        }).catch(e=>{
            reject(e)
        })
    })
    return promise
}

export function getSearchResult(w) {
    let promise = new Promise((resolve, reject) => {
        fetch(PURL_SERVER + '/search?w='+w).then(res => res.json()).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
    return promise
}