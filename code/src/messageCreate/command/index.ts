import { Message } from "discord.js";
import * as messageCommand from './botCommand'

const CALL_COMMAND_PREFIX: string = '$$';
const botCommandList: { [key: string]: Function } = {
  help:     messageCommand.helpCommand,
  operator: messageCommand.operatorCommand,
  random:   messageCommand.randomNumberCommand,
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