import db from "../config/database.js";
import { DataTypes } from "sequelize";
import Users from "./users.js";

const Cart = db.define('tb_cart',{
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
},{
    freezeTableName: true,
});

// Users.hasMany(Cart);
// Cart.belongsTo(Users, {foreignKey: 'userId'});

// Users.hasMany(Cart); // Menambahkan foreignKey pada relasi
// Cart.belongsTo(Users,{ foreignKey: 'userId', sourceKey: 'uuid' });

// Users.hasMany(Cart, {
//     foreignKey: {
//       name: 'uuid',
//       allowNull: false,
//     },
//   });
  
// Cart.belongsTo(Users, {
//     foreignKey: {
//         name: 'userId',
//         allowNull: false,
//     },
// });

export default Cart
