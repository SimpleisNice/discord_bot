import { Client, TextChannel  } from 'discord.js';
import * as schedule from 'node-schedule';

const SCHEDULE_TIME_RUNE: { [key: string]: number } = {
  HALF_HOUR: 40,
}

function everyHalfHourAlert(client: Client, channelName: string, channelId: string, noticeMessage: string): void {
  const flagRule: schedule.RecurrenceRule = new schedule.RecurrenceRule();

  // set rule
  flagRule.minute = SCHEDULE_TIME_RUNE['HALF_HOUR'];

  schedule.scheduleJob(flagRule, (): void => {
    const targetChannel: TextChannel | undefined = client?.channels?.cache?.get(channelId) as TextChannel;
    
    console.log('EVERY HALF HOUR ALERT > ', channelName, channelId, noticeMessage)
    if (!targetChannel) {
      console.log(`WARN: The ${channelId} dose not exist!`);
      return;
    }
    
    targetChannel.send(`TEST SEND MESSAGE: ${noticeMessage}`);
  });
}

export {
  everyHalfHourAlert,
}