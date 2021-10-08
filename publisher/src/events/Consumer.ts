import amqplib, { Connection } from 'amqplib';
import axios from 'axios';
import logger from '../common/logger';
import { IPublishMessageProp } from '../interfaces/subscriber.interface';

export class Consumer {
  private queue: string = 'test';

  private conn: Connection;

  private channel: amqplib.Channel;

  constructor() {}

  public async start(): Promise<amqplib.Replies.Consume> {
    if (!this.conn) {
      await this.createConnection();
    }
    await this.channel.assertQueue(this.queue);
    logger.info(`Consumer listening on queue ${this.queue}`);
    const consumer = await this.channel.consume(this.queue, async msg => {
      try {
        const content = msg.content.toString();
        logger.info(`[Calling subscrbers] => ${content}`);

        const payload = JSON.parse(content) as IPublishMessageProp;

        await axios({
          method: 'POST',
          data: payload.body,
          url: payload.url
        });

        this.channel.ack(msg);
      } catch (error) {
        logger.error(error);
        this.channel.nack(msg, false, true);
      }
    });
    return consumer;
  }

  private async createConnection(): Promise<void> {
    this.conn = await amqplib.connect(process.env.RABBITMQ_URL);
    logger.info(`AMQP connected successfully`);
    this.channel = await this.conn.createChannel();
    this.channel.prefetch(50);
  }
}
