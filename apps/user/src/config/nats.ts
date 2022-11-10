export default {
  port: parseInt(process.env.NATS_PORT) || 4222,
  host: process.env.NATS_HOST
} as const;
