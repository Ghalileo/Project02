/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     isEmail:true
            // }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            // validate: {
            //     len: [3]
            //   }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: true,

        // },
        // street_address: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // unit:{
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        // city: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // state:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // zip_code: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // country_id:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        }
       
    });
    User.associate = function(models) {
        // Associating User with Subscription
        // When User is deleted, also delete any associated Subscriptions
        User.hasMany(models.Subscription, {
            onDelete: "cascade"
        });
    };
    // Creating a method that will check if the unhashed password  can be created to a previously created password
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Using a hook to automatically hash passwords
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};

/*

city_id:
CHANGE allowNull: true to false BEFORE PROD


Tables:

Address
    - street
    - unit
    - city_id
    - zip code
    - country_id

Country
    - name

City
    - name
    - country_id
 */