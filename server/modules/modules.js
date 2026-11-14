const db = require("../db.js");
const { DataTypes, UUIDV4 } = require("sequelize");

const User = db.define("user", {
    id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING }
});

const CodeStorage = db.define("codeStorage", {
    code: { type: DataTypes.STRING },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
});

module.exports = { User, CodeStorage };