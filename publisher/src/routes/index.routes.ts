import { Router } from 'express';
import { container } from '../config/inversify.config';
import PublisherController from '../controllers/PublisherController';
import SubscriberController from '../controllers/SubscriberController';
import { validateSchema } from '../middlewares/validator.middleware';
import { publishSchema, subcriberSchema } from '../validations/validationSchema';

export const routes = (): Router => {
  const router = Router();

  const publisherContainer = container.get(PublisherController);
  router.post('/publish/:topic', validateSchema(publishSchema), publisherContainer.publish);

  const subscriberContainer = container.get(SubscriberController);
  router.post('/subscribe/:topic', validateSchema(subcriberSchema), subscriberContainer.subscribe);

  return router;
};
