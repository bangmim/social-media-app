// # models/ 
// 데이터 베이스 구조를 정의한다

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({     //형식에 맞게 유저 데이터를 저장한다.(user data를 저장하는 방식)
    username:{type:String},
    email:{type:String},
    bio:{type:String},          //자기소개
    image:{type:String},
    password:{type:String},
    salt:{type:String},         //암호화
})

const followSchema=new Schema({     //(follow를 저장하는 방식)
    follower:{type:String, ref:'User'},
    following:{type:String, ref:'User'},
})

const articleSchema = new Schema({
    description : {type:String},
    photos:[{type:String}],
    created:{type:Date, default : Date.now},
    user:{type:Schema.ObjectId, ref:'User'},
    favoriteCount:{type:Number, default:0}
})

const favoriteSchema = new Schema({
    user:{type:Schema.ObjectId},
    article:{type:Schema.ObjectId}
})

const commentSchema=new Schema({
    content:{type:String},
    article:{type:Schema.ObjectId},
    user:{type:Schema.ObjectId,ref:'User'},
    created:{type:Date, default:Date.now},
    favoriteCount:{type:Number,default:0}
})

const favoriteCommentSchema=new Schema({
    user:{type:Schema.ObjectId},
    comment:{type:Schema.ObjectId}
})

//exports : 다른파일에서 import하면 사용할 수 있다.
exports.User=mongoose.model('User',userSchema)
exports.Follow=mongoose.model('Follow',followSchema)
exports.Article=mongoose.model('Article',articleSchema)
exports.Favorite=mongoose.model('Favorite',favoriteSchema)
exports.Comment=mongoose.model('Comment',commentSchema)
exports.FavoriteComment=mongoose.model('FavoriteComment',favoriteCommentSchema)