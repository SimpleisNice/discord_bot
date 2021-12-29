import { Client } from 'discord.js';
import { everyHalfHourAlert } from './botAlert';

const TARGET_MAIN_CHANNEL: string = '채팅 채널';
const EVERY_DAY: { [key: string]: { name: string; message: string; type: string }} = {
  FLAG: { name: '봇알림', message: 'FLAG TIME', type: 'HALF_HOUR_ALERT' },
}
const ALERT_FUNC: { [key: string]: Function } = {
  'HALF_HOUR_ALERT': everyHalfHourAlert,
}

class Notice {
  static classInstance: Notice | undefined;

  channelList: { [key: string]: { name: string, id: string } } = {};
  client: Client | undefined;

  constructor() {
    if (Notice.classInstance) {
      return Notice.classInstance;
    }

    Notice.classInstance = this;
  }

  init(client: Client): void {
    this.client = client;
    this.setChannelList(client);
    this.runSchedule();
  }

  /**
   * channels 에서는 clinet 의 모든 채널 정보를 가지고옴 
   */
  setChannelList(client: Client): void {
    const tempList: { [key: string]: { id: string, name: string }[] } = {};
    let firstParentId: string = '';
    try {
      client?.channels?.cache?.forEach((value: any): void => {
        const id: string = value?.id || '';
        const name: string = value?.name || '';
        const parentId: string | null = value.parentId;

        if (!id || !name) {
          return;
        }
        
        if (!parentId) {
          if (!firstParentId && name === TARGET_MAIN_CHANNEL) {
            firstParentId = id;
          }
          return;
        }
        if (!Array.isArray(tempList[parentId])) {
          tempList[parentId] = [];
        }

        tempList[parentId].push({ id, name });
      });
      
      if (!firstParentId) {
        return;
      }

      tempList[firstParentId].forEach((value: { id: string, name: string }) => {
        this.channelList[value.name] = { name: value.name, id: value.id };
      });
      console.log('NOTICE SET CHANNEL > ', this.channelList);

    } catch(e: any) {
      console.error('NOTICE SET CHANNEL ERROR >', e.toString());
    }
  }

  runSchedule(): void {
    Object.keys(EVERY_DAY).forEach((value: string): void => {
      const { name, message, type } = EVERY_DAY[value];
      const channelId: string = this.channelList[name]?.id ?? '';

      ALERT_FUNC[type](this.client, name, channelId, message);
    })
  }
}

export default Notice;