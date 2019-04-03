'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post,{ foreignKey: "post_id"});
  };
  return Comment;
};