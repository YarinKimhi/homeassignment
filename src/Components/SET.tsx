import {countWords} from './GET'
 
export function redisSet (textbox:string) {
    let key, value, keyValuestr;
    if (countWords(textbox) === 3){
        keyValuestr = textbox.slice(textbox.indexOf(' ')+1,)
        key = keyValuestr.slice(0,keyValuestr.indexOf(' '))
        value = keyValuestr.slice(keyValuestr.indexOf(' ')+1,)
        window.localStorage.setItem(key,value);
        if(window.localStorage.getItem(key) !== null){
            return "OK";    
        }
        return "can't set key"
    }else{
        return "wrong number of arguments";
    }
    
}


/*const countWords = (str:string)=>{
    return str.split(" ").length;
}*/