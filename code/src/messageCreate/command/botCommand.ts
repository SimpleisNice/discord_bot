import { Message, MessageEmbed, ColorResolvable } from "discord.js";

const COLOR_LIST: { [key: string]: ColorResolvable } = {
  DEEP_PINK: '#FF1493',
  LIGHT_PINK: '#FFB6C1',
  BLACK: '#000000'
}
const RANDOM_SEED_NUMBER: number = 100;

function helpCommand(message: Message): void {
  const helpMessage = new MessageEmbed()
    .setColor(COLOR_LIST['DEEP_PINK'])
    .setTitle('[도움말]')
    .setDescription('☆도움말☆')
    .addFields(
      { name: '$$ help', value: '도움말' },
      { name: '$$ operator', value: '운영진' },
      { name: '$$ random', value: '무작위 숫자(1~100)'}
    );
  message.channel.send({ embeds: [helpMessage]})
}

function operatorCommand(message: Message): void {
  const operatorMessage = new MessageEmbed()
  .setColor(COLOR_LIST['LIGHT_PINK'])
  .setTitle('[운영진]')
  .setDescription('OPERATOR')
  .addFields(
    { name: 'TEST1', value: 'TEST1' },
    { name: 'TEST2', value: 'TEST2'}
  );
  message.channel.send({ embeds: [operatorMessage]});
}

function randomNumberCommand(message: Message): void {
  const randomNumber: number = Math.floor(Math.random() * RANDOM_SEED_NUMBER + 1);
  const randomNumberMessage = new MessageEmbed()
    .setColor(COLOR_LIST['BLACK'])
    .setTitle('[RANDOM NUMBER]')
    .setDescription('1 이상 100 이하의 숫자가 무작위로 나옵니다.')
    .addField('RANDOM NUMBER', `${randomNumber}`);
  message.channel.send({ embeds: [randomNumberMessage]});
}

export {
  helpCommand,
  operatorCommand,
  randomNumberCommand,
}