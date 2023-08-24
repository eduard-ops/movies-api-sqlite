const app = require("./app");

const sequelize = require("./db");

const { serverPort } = require("./config");

const PORT = serverPort || 4000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
