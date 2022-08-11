import logger from 'pino';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

export default log;
