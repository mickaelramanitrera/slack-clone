module.exports = {
  apps: [
    {
      name: 'nlc-realtime.master',
      script: 'dist/server.js',
      args: '--port 8080 --redis.uri 10.150.0.2:6378',
      instances: 2,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development',
        TZ: 'UTC',
      },
      env_production: {
        NODE_ENV: 'production',
        BASE_PATH: '/api',
      },
    },
  ],
};
