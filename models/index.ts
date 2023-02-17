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

Comment.hasMany(Saved)
Saved.belongsTo(Comment)

Post.hasMany(Saved)
Saved.belongsTo(Post)


export {User, Post, Comment, Saved}