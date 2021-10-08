import { Segments, Joi, SchemaOptions } from 'celebrate';

export const publishSchema: SchemaOptions = {
  [Segments.PARAMS]: Joi.object().keys({
    topic: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().required()
};

export const subcriberSchema: SchemaOptions = {
  [Segments.PARAMS]: Joi.object().keys({
    topic: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    url: Joi.string().uri().required()
  })
};
