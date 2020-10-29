
 export function countWords (str:string){
    return str.split(" ").length;
}

export function redisGet (textbox:string) {
    let key ,Dummy;
    if (countWords(textbox) === 2){
        key = textbox.slice(textbox.indexOf(' ')+1,);
        Dummy = window.localStorage.getItem(key)
        if (Dummy !== null){
            try{
                const itemValues = JSON.parse(Dummy) // need to check if dummy is json
                console.log(itemValues)
                const getnow = new Date()
                 if (getnow.getTime() > itemValues.expiry) {
                    localStorage.removeItem(key)
                    return "nil";
                }else{
                    return itemValues.value
                }  
            }
            catch(e){ // not a valid json
                return Dummy;
            }
        }
        return "nil"
    }else{
        return "wrong number of arguments"
    }
}