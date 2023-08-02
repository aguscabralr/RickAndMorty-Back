require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;
const { usersMd, favoritesMd } = require('./models/index');

const database = new Sequelize(DB_DEPLOY,
   {
      logging: false,
      native: false,
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false
         }
      }
   }
);

// const database = new Sequelize(`postgres:${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//    { logging: false, native: false }
// );

usersMd(database);
//
favoritesMd(database);

const { User, Favorite } = database.models;
User.belongsToMany(Favorite, { through: 'UserFavorite', timestamps: false });
Favorite.belongsToMany(User, { through: 'UserFavorite', timestamps: false });


module.exports = { ...database.models, database };
