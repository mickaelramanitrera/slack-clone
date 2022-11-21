export default {
  port: parseInt(process.env.NATS_PORT) || 4222,
  host: process.env.NATS_HOST,
  isProduction: process.env.NATS_IS_PRODUCTION || false
} as const;
