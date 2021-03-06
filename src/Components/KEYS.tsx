import {countWords} from './GET'

export function redisKeys (textbox:string) {
    let keyInput: string;
    if (countWords(textbox) >= 2){  
        let regex: RegExp,str: string | RegExp,returnValue="", index;

        keyInput = textbox.slice(textbox.indexOf(' ')+1,);
        if (keyInput.includes('?')){
            str = keyInput.split('?').join('.');
            regex =new RegExp(str) ;
            
        }else if (keyInput.includes('*') && keyInput.split("*").length-1 === 1){
            if (keyInput === '*'){
                Object.keys(localStorage).forEach(function(key){
                        returnValue=returnValue+ " "+ key
                    });
                return returnValue;  
                }
            
            index=keyInput.indexOf('*') // if key holds not only *
            str = keyInput.slice(0,((index-1)>=0 ? index : 1 )) + "." + keyInput.slice(index,)
            regex = new RegExp(str);
                
        }else if (keyInput.includes('[') && keyInput.includes(']') ){
            regex =new RegExp(keyInput);

        }else if ( keyInput.includes('*') && keyInput.split("*").length-1 === 2){
            str = keyInput.slice( keyInput.indexOf('*',0)+1 , (keyInput.indexOf('*',(keyInput.indexOf('*',0)+1))))
            Object.keys(localStorage).forEach(function(key){
                if( key.match(str)){
                    returnValue=returnValue+ " "+ key
                }
                });
             return returnValue;   
            }

        Object.keys(localStorage).forEach(function(key){
            try{
            if( regex.test(key)){
                returnValue=returnValue+ " "+ key
               }
            }catch(e){
                return "empty set "
            }
        });
        return returnValue;
    }else{
        return "wrong number of arguments" 
    }            
}