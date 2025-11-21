const { User } = require("../models/model");

exports.username = async (req, res, next)=>{
    try{
        // # req.query 
        // : url에 ?key=value의 형태로 담는다
        const username = req.query.username;
        
        // patt : username으로 '시작'하는 패턴을 만든다
        const patt = new RegExp("^"+ username);

        // 쿼리
        const users = await User.find({     // User.find : User model을 자동으로 import 해준다
            username : {$regex : patt}      // $regex : mongoose에 전달하는 쿼리
        });
        // console.log(patt)

        res.json(users);    // 일치하는 user를 모두 보여준다

    }catch(error){
        next(error)
    }
}