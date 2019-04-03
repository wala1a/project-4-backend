'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {tableName: "posts"});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User,{ foreignKey: "user_id"});
    Post.hasMany(models.Comment);

   
  };
  return Post;
};