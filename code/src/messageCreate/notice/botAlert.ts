import { Client, TextChannel  } from 'discord.js';
import * as schedule from 'node-schedule';

const SCHEDULE_TIME_RUNE: { [key: string]: number } = {
  HALF_HOUR: 30,
}

function everyHalfHourAlert(client: Client, channelId: string): void {
  const flagRule: schedule.RecurrenceRule = new schedule.RecurrenceRule();

  // set rule
  flagRule.minute = SCHEDULE_TIME_RUNE['HALF_HOUR'];

  schedule.scheduleJob(flagRule, (): void => {
    const targetChannel: TextChannel  | undefined = client?.channels?.cache?.get(channelId) as TextChannel;
    if (!targetChannel) {
      console.log(`WARN: The ${channelId} dose not exist!`);
      return;
    }

    targetChannel.send('TEST SEND MESSAGE');
  });
}

export {
  everyHalfHourAlert,
}