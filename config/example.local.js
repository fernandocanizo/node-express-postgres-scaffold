// Copy this file to `local.js`
// You can replace any configuration from `default.js` or add others here

module.exports = {
  // JSON Web Token
  jwt: {
    secret: process.env.JWT_SECRET || 'you should set this on production',
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30,
    resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || 10,
    verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES || 10,
  },
  email: {
    // SMTP configuration options for the email service
    // For testing, you can use a fake SMTP service like Ethereal:
    // https://ethereal.email/create

    smtp: {
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM || 'contact@example.com',
  },

  // Postgres connection settings using Postgres default environment
  // variables (See https://www.postgresql.org/docs/13/libpq-envars.html)
  postgres: {
    user: process.env.PGUSER || 'postgres',
    // Use of PGPASSWORD is discouraged as non-root users may be
    // able to see them on the process list
    // This default is provided for development convenience
    password: process.env.PGPASSWORD || '',
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || '5432',
    db: process.env.PGDATABASE || 'neps',
  },
};
