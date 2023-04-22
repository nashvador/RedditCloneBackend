import { User } from "./userModel";
import { Post } from "./postModel";
import { Comment } from "./commentModel";
import { Saved } from "./savedModel";
import { Like } from "./likeModel";
import { Chat } from "./chatModel";
import { Message } from "./messageModel";

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Saved);
Saved.belongsTo(User);

Comment.hasMany(Saved);
Saved.belongsTo(Comment);

Post.hasMany(Saved);
Saved.belongsTo(Post);

User.hasMany(Like);
Like.belongsTo(User);

Comment.hasMany(Like);
Like.belongsTo(Comment);

Post.hasMany(Like);
Like.belongsTo(Post);

User.belongsToMany(Chat, { through: "user_chats" });
Chat.belongsToMany(User, { through: "user_chats" });
Chat.hasMany(Message);
Message.belongsTo(Chat);

export { User, Post, Comment, Saved, Like, Chat, Message };
