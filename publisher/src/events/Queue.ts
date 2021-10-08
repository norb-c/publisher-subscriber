import { injectable } from 'inversify';

import amqplib, { Connection } from 'amqplib';
import logger from '../common/logger';
import { IPublishMessageProp } from '../interfaces/subscriber.interface';

@injectable()
export class Queue {
  private queue = 'test';

  private conn: Connection;

  private channel: amqplib.Channel;

  constructor() {}

  public async connect(): Promise<void> {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL);
    this.conn = connection;
    this.channel = await this.conn.createChannel();
    logger.info(`Connected to rabbit queue`);
  }

  public async publishMessage(message: IPublishMessageProp): Promise<void> {
    try {
      if (!this.conn) {
        await this.connect();
      }
      const messageToSend = JSON.stringify(message);
      this.channel.assertQueue(this.queue, { durable: true });
      this.channel.sendToQueue(this.queue, Buffer.from(messageToSend), { persistent: true });
      logger.info(`[x] Sent ${messageToSend} to ${this.queue}`);
    } catch (error) {
      logger.error(error);
    }
  }
}
