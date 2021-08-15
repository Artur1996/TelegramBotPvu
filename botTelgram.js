const { Telegraf } = require('telegraf');

const bot = new Telegraf('1904121924:AAGXAqpJMWbEr8zjtG-r51kOIie-n97fbIw');
const moment=require('moment')
const cron = require('cron');
const PlantasData = require('./Plantas.json');

const date = require('date-and-time');

const time=new Date()





const CronJob = require('cron').CronJob;

function plantas(PlantasData,hour){
    let plantas=[]
    let cantidad =0

    for (planta of PlantasData){
        if (planta.HORA!=""){
            let hora= moment.utc(planta.HORA,"HH:mm:ss");
            let diferencia= moment.duration(hour.diff(hora))
            let minutos= parseInt(diferencia.asMinutes())
            if (minutos>-5 && minutos<=0)
                plantas.push(planta)
            
        }
    
    }
    return(plantas)
}





const createJob = async function(chatid) {
  return new CronJob('00 */3 * * * *', async function() {
    let hours=moment.utc()
    let timeplantas=plantas(PlantasData,hours)
    
    timeplantas.forEach(async function(elemento, indice, array) {
        await bot.telegram.sendMessage(chatid,'<b>HORA ' + elemento.HORA +'</b>' +'<b>   COORDENADAS ' + elemento.X +' , '+ elemento.Y +'</b>',
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"PLANTA", url:elemento.LINK},
                    {text:"LAND", url:elemento.LAND}
            ]
                ]
            },
            parse_mode:"HTML",
        } )
        sleep(1000)
    })


    
    console.log('Job running');

});
}



bot.command('comienzamrcalexis', async (ctx) => {
    const myNewJob = await createJob(ctx.chat.id)
    if(ctx.from.first_name!='Alexis'  && ctx.from.username!='Yolsas'){
        await bot.telegram.sendMessage(ctx.chat.id, `tu no eres el amo Alexis`);
    }
else{
    await bot.telegram.sendMessage(ctx.chat.id, `Listo amo Alexis`);
    myNewJob.start()
}

})

bot.launch()