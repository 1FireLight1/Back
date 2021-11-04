//const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  port: 5433,
  dialect: 'postgres',
  host: 'localhost',
  database: 'jsproject',
  username: 'user',
  password: '12345',
  //models: [__dirname + '/models/*.model.*'],
});

// const initDB = async () => 
async function initDB(){
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sequelize was initialized');
  } 
  catch (error) {
    console.error(error);
    // process.exit();
  }
}

module.exports = {
  sequelize,
  initDB,
};