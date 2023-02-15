import { User } from "./userModel";
import { Post } from "./postModel";
import { Comment } from "./commentModel";

User.hasMany(Post)
Post.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

// Comment.hasMany(Comment)


export {User, Post, Comment}