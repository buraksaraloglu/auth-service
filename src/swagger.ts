import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.

    openapi: '3.0.0',
    info: {
      title: 'Movies Auth API',
      version: '0.1.0',
      description:
        'This is a sample authentication server. It validates a user token and returns a user object.',
      contact: {
        name: 'Burak Saraloglu',
        url: 'https://buraksaraloglu.com',
        email: 'buraksaraloglu1@gmail.com',
      },
    },
  },
  apis: ['./routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const serve = swaggerUi.serve;
export const setup = swaggerUi.setup(specs);
