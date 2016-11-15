module.exports = (seq, Seq) => {
  return seq.define("user", {

    email: {
    	type: Seq.STRING,
    	allowNull: false,
    	validate: {
                    notEmpty: true,
                    isEmail: true
                }
    },
    password: {
    	type: Seq.STRING,
    	allowNull: false,
    	validate: {notEmpty: true}
    },
    username: {
    	type: Seq.STRING,
    	allowNull: false,
    	validate: {notEmpty: true}
    }
  }, {
    classMethods: {
      relate: (models) => {
/*
        models.Blog.hasMany(models.File);
        models.Blog.hasMany(models.Post);
        models.Blog.hasMany(models.Category);
        models.Blog.hasMany(models.Comment);

        models.Blog.belongsTo(models.Post, {as: 'aboutPost', constraints: false, foreignKey: 'fk_about_post_blog_id'});
        models.Blog.belongsTo(models.File, {as: 'logoFile', constraints: false, foreignKey: 'fk_logo_file_blog_id'});
 */
      }
    }
  });
};