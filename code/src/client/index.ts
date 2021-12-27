import { Client, Intents } from 'discord.js';
import dotenv, { DotenvConfigOutput } from 'dotenv';

import { messageCreate } from '../messageCreate/command'
// import Notice from '../messageCreate/notice';

const ENV_CONFIG: DotenvConfigOutput = dotenv.config();
const TOKEN: string = ENV_CONFIG?.parsed?.DISCORD_TOKEN ?? '';

// create a new client instance ( SET INTENTS )
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// const notice: Notice = new Notice();

export default function initClient(): void {
  client.on('ready', () => {
    console.log('Ready!');
    console.log(`Logged in as ${client?.user?.tag}`);

    // notice.init(client)
    // client.channels.cache.forEach(value => console.log(value))
  });
  
  client.on('messageCreate', messageCreate);
  // message create
  // client.on('messageCreate', (message: Message) => {
  //   if (message.author.bot) {
  //     return;
  //   }
  //   console.log(message.content);
  //   if(message.content.toLowerCase().includes('hey bot') || message.content.toLowerCase().includes('general kenobi')){
  //       message.channel.send('Hello there!');
  //   }
  
  //   if (message.content == '$listCommands') {
  //     const exampleEmbed = new MessageEmbed()
  //         .setColor('#ffd046')
  //         .setTitle('Server Commands')
  //         .setDescription('Here you can see the list of the commands used on the server: ')
  //         .addFields(
  //             { name: "`$like`", value: 'Likes the current message' },
  //             { name: "`$dislike`", value: 'Dislikes the current message'},
  //             { name: "`$random`", value: 'Returns a random number'},
  //         )
  //     message.channel.send({embeds: [exampleEmbed]})
  //   }
  
  //   if (message.content == '$like') {
  //       message.react('👍');
  //   }
  
  //   if (message.content == '$dislike') {
  //       message.react('👎');
  //   }
  
  //   if(message.content == '$random'){
  //       message.react('✅');
  //       let randomNumber = 555;
  //       message.reply(`Your random number is ${randomNumber}.`)
  //   }
  // });
  
  // start
  client.login(TOKEN);
}