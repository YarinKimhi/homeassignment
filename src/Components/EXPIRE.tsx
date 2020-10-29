import {countWords} from './GET'

export function redisExpire (textbox:string) {
    let key, keyValuestr,ttl=0;
    const now=new Date()
    if (countWords(textbox) === 3){
        keyValuestr = textbox.slice(textbox.indexOf(' ')+1,)
        key = keyValuestr.slice(0,keyValuestr.indexOf(' '))
        const value=window.localStorage.getItem(key)
        if(value !== null){
            try{
                const storageItem=JSON.parse(value)
                ttl = Number(keyValuestr.slice(keyValuestr.indexOf(' ')+1,))
                const item = {
                    value: storageItem.value,
                    expiry: now.getTime() + ttl,
                }
                localStorage.setItem(key, JSON.stringify(item))
                return "1";
            }
            catch(e){
                ttl = Number(keyValuestr.slice(keyValuestr.indexOf(' ')+1,))
                const item = {
                    value: value,
                    expiry: now.getTime() + ttl,
                }
                localStorage.setItem(key, JSON.stringify(item))
                return "1";
            }
        }
        return "0";
    }
    return "wrong number of arguments"
    
}