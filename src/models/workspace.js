'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Workspace extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Workspace.init(
        {
            title: DataTypes.STRING,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Workspace',
        },
    );
    return Workspace;
};
