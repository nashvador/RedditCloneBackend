import { User } from "./userModel";
import { Post } from "./postModel";
import { Comment } from "./commentModel";
import { Saved } from "./savedModel";

User.hasMany(Post)
Post.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Saved)
Saved.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

// Comment.hasMany(Comment)


export {User, Post, Comment, Saved}