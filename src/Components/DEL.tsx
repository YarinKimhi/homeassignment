import {countWords} from './GET'


export function redisDel (textbox:string) {
    let  keyValuestr, deleteKey,counter=0;
    if (countWords(textbox) >= 2){   
        keyValuestr = textbox.slice(textbox.indexOf(' ')+1,) //will hold value of ths string without the command 
        while (keyValuestr.length>0) {
            if (keyValuestr.indexOf(' ')>0){
                deleteKey=keyValuestr.slice(0,keyValuestr.indexOf(' ')) // 
                if(window.localStorage.getItem(deleteKey) !== null) {
                    window.localStorage.removeItem(deleteKey)
                        counter++;  
                }
                keyValuestr = keyValuestr.slice(keyValuestr.indexOf(' ')+1,)
            }else{     // only one key left to delete
                if(window.localStorage.getItem(keyValuestr) !== null){
                    window.localStorage.removeItem(keyValuestr)
                        counter++;
                }
                break;
            }     
        }
        return counter.toString();
    }else
        return "wrong number of arguments"    
}