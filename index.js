const Discord = require('discord.js');
const Ytdl =require('ytdl-core');
const bot = new Discord.Client();
const token = ''
let estaPronta = false;
bot.login(token);

bot.on('ready', () => {
    console.log('Estou conectada');
});

bot.on('message', (msg) =>{
    // !join = Bot se junta ao canal de voz
    if (msg.content === '!join'){
        if(msg.member.voiceChannel){
            msg.member.voiceChannel.join();
            estaPronta = true;
        }
        else{
            msg.channel.send('Você precisa estar conectado a um canal de voz');
        }
    }
    //!leave = Bot sai do canal de voz
    else if (msg.content === '!leave'){
        if(msg.member.voiceChannel){
            msg.member.voiceChannel.leave();
            estaPronta = false;
        }
        else {
            msg.channel.send('Você precisa estar conectado a um canal de voz');
        }
    }
    //!play [link] = Bot toca músicas
  else if (msg.content.startsWith('!play ')) {
      if (estaPronta){
          let oQueTocar = msg.content.replace('!play ','');
          if(Ytdl.validateURL(oQueTocar)){
              msg.member.voiceChannel.connection.playStram(Ytdl(oQueTocar));
          } else {
              msg.channel.send('O link não é valido');
          }
      }
  }
});
