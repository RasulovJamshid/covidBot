const telegram = require("node-telegram-bot-api");
// const express =require("express");
const fetch = require('node-fetch');

const token = '1121537720:AAFTR52S42OG6WcPA1s-DgJ56IrAKKGVx24';
const bot = new telegram(token, {polling: true});
// const app =express();
let data=null;

fetch( 'https://coronavirus-19-api.herokuapp.com/countries')
    .then(res => res.json())
    .then(json => {data=json;});



bot.on('message', (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  let timeInMs = Date();
  data.forEach((elem,i)=>{
    if(elem.country.toLowerCase()==msg.text.toLowerCase()){
        bot.sendMessage(chatId, `<u>${data[i].country.toUpperCase()}</u> 
        \n cases : <code>${data[i].cases}</code>
        \n today : <code>${data[i].todayCases}</code>
        \n active : <code>${data[i].active}</code>
        \n recovered : <code>${data[i].recovered}</code>
        \n critical : <code>${data[i].critical}</code>
        \n deaths : <code>${data[i].deaths}</code>
        \n today deaths : <code>${data[i].todayDeaths}</code>
        \n cases per one million : <code>${data[i].casesPerOneMillion}</code>
        \n <code>${timeInMs}</code>
        \n \n <i>Wear a Mask to Protect You Against the Coronavirus</i>
        \n <i>Stay at Home</i>
        \n <a href="tg://user?id=1121537720">COVID_BOT(unofficial)</a>
        `

          ,
          {parse_mode:"HTML",  
          // reply_markup:{keyboard:[["eng","рус","o'zb"].map(i=>({"text":i,}))],resize_keyboard:true,one_time_keyboard:true}  
          }
          );
    }
    else if(data.length==i){
      bot.sendMessage(chatId,"Country NOT FOUND")
    }
  }); 
});

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Please type county");
});

bot.onText(/\/all/, (msg) => {
  let allInfo="";
  data.forEach((elem)=>{
    allInfo+=`${elem.country}  :  <code>${elem.cases}</code> \n \n`
  })
  allInfo+='\n\n <u>Type coutry name to get all Info</u>\n\n\n'
  bot.sendMessage(msg.chat.id, allInfo,{parse_mode:"HTML"});
});


bot.onText(/\/info/, (msg) => {
  let timeInMs = Date();
  let allInfo="";
  let quantity=0,deaths=0,active=0,recovered=0,today=0;

  data.forEach((elem)=>{
    quantity+=parseInt(elem.cases);
    active+=parseInt(elem.active);
    today+=parseInt(elem.todayCases);
    recovered+=parseInt(elem.recovered);
    deaths+=parseInt(elem.deaths);
  })
  allInfo=`Infected : <code>${quantity}</code> \n\nActive : <code>${active}</code> \n\nToday : <code>${today}</code>\n\nRecovered : <code>${recovered}</code> \n\nDeaths : <code>${deaths}</code> \n\n\n <code>${timeInMs}</code>\n\n\n<i>Wear a Mask😷 to Protect You Against the Coronavirus🦠</i>
        \n<i>Stay at Home🏠</i> \n\n Type coutry name to get all Info\n\n\n<a href="tg://user?id=1121537720">COVID_BOT(unofficial)</a>`;
  bot.sendMessage(msg.chat.id, allInfo,{parse_mode:"HTML"});
});



