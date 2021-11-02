export type Config = {
  port: string,
  mount: string,
  redis: {
    disabled: boolean,
    uri: string
  },
  jwt: {
    secretKey: string
  }
}

export default {
  port: 8080,
  mount: '/io',

  // just omit to disable redis adapter binding
  // or explicitly set --redis.disabled
  redis: {
    disabled: true,
    uri: process.env.REDIS_URI || 'localhost:36379'
  },

  // just omit to deactivate this option
  jwt: {
    secretKey: process.env.JWT_SECRET || '(void)'
  }
}