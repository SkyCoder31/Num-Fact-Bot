
import {Client, Interaction} from 'discord.js';
import dotenv from 'dotenv';
import replyFact from './Reply.js';
dotenv.config()

const client= new Client({ 
    intents:['GUILDS', 'GUILD_MESSAGES'],
});

client.on('ready', ()=>{
    console.log(`${client.user.tag} is ready!`);
    const guildID='509975723784536065';
    const guild= client.guilds.cache.get(guildID);
    let commands;
    if(guild){
        commands=guild.commands;
    }
    else{
        commands=client.application?.commands;
    }
    commands.create({
        name:'hi',
        description:'Replies with Konichiwa',
    });
    commands.create({
        name:'fact',
        description:'Gives a trivia for the entered number',
        options:[{
            name:'number',
            description: 'number for the fact',
            required: true,
            type:'NUMBER'
        }]
    });
    commands.create({
        name:'math-fact',
        description:'Gives a mathematical fact for the entered number',
        options:[{
            name:'number',
            description: 'number for the math fact',
            required: true,
            type:'NUMBER'
        }]
    });
    commands.create({
        name:'year-fact',
        description:'Gives any year fact for the entered number',
        options:[{
            name:'number',
            description: 'number for the year fact',
            required: true,
            type:'NUMBER'
        }]
    });
});

client.on('interactionCreate', interaction =>{
    if(!interaction.isCommand())return;
    const { commandName }= interaction;
    if(commandName=='hi'){
        interaction.reply({
            content:'konichiwa!',
        });
    }
});
client.on('interactionCreate', async interaction =>{
    if(!interaction.isCommand())return;
    const { commandName, options }= interaction;
    const number=options.getNumber('number');
    if(commandName=='fact'){
       replyFact(number, 'trivia',interaction);
    }else if(commandName=='math-fact'){
        replyFact(number,'math', interaction);
     }else if(commandName=='year-fact'){
        replyFact(number, 'year', interaction);
     }
});


client.login(process.env.BOT_TOKEN);