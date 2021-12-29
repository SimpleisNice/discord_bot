import { Client, Intents } from 'discord.js';
import dotenv, { DotenvConfigOutput } from 'dotenv';

import { messageCreate } from '../messageCreate/command'
import Notice from '../messageCreate/notice/Notice';

const ENV_CONFIG: DotenvConfigOutput = dotenv.config();
const TOKEN: string = ENV_CONFIG?.parsed?.DISCORD_TOKEN ?? '';

// create a new client instance ( SET INTENTS )
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const notice = new Notice();

export default function initClient(): void {
  client.on('ready', () => {
    console.log('Ready!');
    console.log(`Logged in as ${client?.user?.tag}`);

    notice.init(client);

  });
  
  client.on('messageCreate', messageCreate);
  // start
  client.login(TOKEN);
}