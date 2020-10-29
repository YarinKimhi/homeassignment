import React, { Component } from 'react';
import './App.css';
import {redisGet} from './Components/GET';
import {redisSet} from './Components/SET';
import {redisDel} from './Components/DEL';
import {redisKeys} from './Components/KEYS';
import {redisExpire} from './Components/EXPIRE';
import {redisExist} from  './Components/EXIST';




class App extends Component {
    
    
    containsWord(str:string, word:string) {
        return str.match(new RegExp("\\b" + word + "\\b")) != null;
      }

    parserTextBox(textbox:string){

        let Command;
        textbox = textbox.trim();     // remove spaces from begining and end
        textbox = textbox.replace(/\s\s+/g, ' '); // remove extra spaces between words
        let upperCaseTextBox =textbox.toLocaleUpperCase()
        
        Command = (this.containsWord(upperCaseTextBox, 'GET') && (upperCaseTextBox.indexOf('GET') === 0))? 
        'GET' :
        (this.containsWord(upperCaseTextBox, 'SET') && (upperCaseTextBox.indexOf('SET') === 0))? 
        'SET': 
        (this.containsWord(upperCaseTextBox, 'KEYS') && (upperCaseTextBox.indexOf('KEYS') === 0)) ? 
        'KEYS':
        (this.containsWord(upperCaseTextBox, 'EXPIRE') && (upperCaseTextBox.indexOf('EXPIRE') === 0)) ?
        'EXPIRE': 
        (this.containsWord(upperCaseTextBox, 'DEL') && (upperCaseTextBox.indexOf('DEL') === 0)) ?
        'DEL':
        (this.containsWord(upperCaseTextBox, 'EXIST') && (upperCaseTextBox.indexOf('EXIST') === 0))?
        'EXIST': -1;        

        switch(Command){
            case 'GET':
                return redisGet(textbox);

            case 'SET':
                return redisSet(textbox);
              
            case 'DEL':
                return redisDel(textbox);
                
            case 'KEYS':
                return redisKeys(textbox);
            
            case 'EXPIRE':
                return redisExpire(textbox)
            
            case 'EXIST':
                return redisExist(textbox)    

            default:
                return "invalid command"  
        }
    }

    handleClick(){
        let messages=document.getElementById("messages")
        let textbox=(document.getElementById("textBox")as HTMLInputElement)?.value;
        let newmessage=document.createElement("p")
        let newmessageSec=document.createElement("p")
        let returnVal="";

        newmessageSec.innerHTML = "> "+ textbox;
        messages?.appendChild(newmessageSec);
        if(textbox!=="")
            returnVal = (this.parserTextBox(textbox)); 
        newmessage.innerHTML = returnVal
        messages?.appendChild(newmessage);
        newmessage?.scrollIntoView({block: "end"});

        (document.getElementById("textBox") as HTMLInputElement ).value="";
    }
    

    render() {
        return (
            <div> 
                <div className="div" id="messages"></div>
                <input placeholder="Command" className="input" id="textBox" type="text" name="name" onKeyPress={ e => {if (e.key === 'Enter') {this.handleClick()}}}/>
                <p>{(document.getElementById("textBox")as HTMLInputElement)?.value}</p>
            </div>
            );
 }
}
export default App;

