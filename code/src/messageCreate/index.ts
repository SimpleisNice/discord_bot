import { Message, MessageEmbed, ColorResolvable } from "discord.js";

const CALL_COMMAND_PREFIX: string = '$$';
const COLOR_LIST: { [key: string]: ColorResolvable } = {
  help: '#FF1493',
  operator: '#FFB6C1'
}
const botCommandList: { [key: string]: Function } = {
  help: (message: Message): void => {
    const helpMessage = new MessageEmbed()
      .setColor(COLOR_LIST['help'])
      .setTitle('[BOT COMMAND LIST]')
      .setDescription('별담 BOT COMMAND LIST 입니다.')
      .addFields(
        { name: '$$ help', value: 'SHOW COMMAND LIST' },
        { name: '$$ operator', value: 'SHOW GUILD OPERATOR LIST' }
      );
    message.channel.send({ embeds: [helpMessage]})
  },
  operator: (message: Message): void => {
    const operatorMessage = new MessageEmbed()
      .setColor(COLOR_LIST['help'])
      .setTitle('[OPERATOR]')
      .setDescription('별담 운영진 리스트 입니다.')
      .addFields(
        { name: '길드 마스터', value: '치즈유즈' },
      );
    message.channel.send({ embeds: [operatorMessage]})
  }
}


function messageCreate(message: Message): void {
  // stop bot from replying to itself
  if (message.author.bot) {
    return;
  }

  const messageContent: string = message.content.toLocaleLowerCase();
  const messageContentList: string[] = messageContent.split(' ');

  if (!isCorrectToCallTheBot(messageContent)) {
    console.warn('not correct message');
    return;
  }

  callMessageCommand(message, messageContentList);
}

function isCorrectToCallTheBot(messageContent: string): boolean {
  if (!messageContent) {
    return false;
  }
  return messageContent.startsWith(CALL_COMMAND_PREFIX);
}

function callMessageCommand(message: Message, messageContentList: string[]): void {
  const userInputCommand: string = messageContentList[1] || '';
  const hasCommand: boolean = !!botCommandList[userInputCommand];

  if (messageContentList.length === 1) {
    botCommandList['help'](message);
    return;
  }

  if (!hasCommand) {
    console.warn(`${userInputCommand} is not correct command`);
    return;
  }

  botCommandList[userInputCommand](message);
}

export {
  messageCreate
}