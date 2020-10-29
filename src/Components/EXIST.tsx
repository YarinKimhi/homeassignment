
export function redisExist (textbox:string) {
    let  keyValuestr,counter=0,existKey;
    keyValuestr = textbox.slice(textbox.indexOf(' ')+1,) //will hold value of ths string without the command 
    while (keyValuestr.length>0) {
        if (keyValuestr.indexOf(' ')>0){
            existKey=keyValuestr.slice(0,keyValuestr.indexOf(' ')) // 
            if(window.localStorage.getItem(existKey) !== null)
                counter++;
            keyValuestr = keyValuestr.slice(keyValuestr.indexOf(' ')+1,)
        }else{     // only one key left to check
            if(window.localStorage.getItem(keyValuestr) !== null)
                counter++;
            break;
         }     
    }
    return counter.toString();
}