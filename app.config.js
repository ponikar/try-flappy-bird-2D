const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

console.log("CONFIGURED DOT ENV");
console.log(process.env.SENTRY_AUTH_TOKEN);
console.log(process.env.SENTRY_PROJECT);
console.log(process.env.SENTRY_ORG);
module.exports = {
  expo: {
    name: "Flappy Bird",
    slug: "flappy-bird",
    plugins: ["sentry-expo"],
    version: "0.0.1",
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  },
};
