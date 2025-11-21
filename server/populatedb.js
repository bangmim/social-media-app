// argument vector : 샘플 데이터를 코드로 입력하여 저장
const userArgs = process.argv.slice(2);

if(!userArgs[0].startsWith('mongodb')){
    console.log('Error : You need to specify a valid mongodb URL as the first argument')
    return;
}

// populate 파일에 필요한 패키지 가져오기 (import와 비슷한 역할이다)
const mongoose = require("mongoose");
const mongoDB = userArgs[0];
const {User, Article, Follow} = require("./models/model");
const crypto = require("crypto");
const fs = require("fs");

// user 생성하는 함수
async function createUser(username, email, password = '123'){
    // 비밀번호 암호화
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000,32, "sha256")
    .toString("hex")

    // 프로필 이미지 생성
    const files = fs.readdirSync(`./seeds/profiles`);
    const file = files.find(file=> file.startsWith(username));
    const newFile = `${crypto.randomBytes(24).toString("hex")}.${file.split(".")[1]}`;

    const oldPath = `./seeds/profiles/${file}`;
    const newPath = `./data/users/${newFile}`;      

    fs.copyFileSync(oldPath, newPath);      // 데이터 경로 이동

    // DB 쿼리
    const user = new User({
        username,
        email,
        password : hashedPassword,
        salt,
        bio: `I'm ${username}`,
        image:newFile
    })

    await user.save();      // DB에 저장

    return console.log(user)
}

// 게시물 생성하는 함수
async function createArticle(username, postId){
    // user가 필요한 이유 : 앞으로 저장할 게시물의 작성자 (게시물의 작성자)
    const user = await User.findOne({username})
    
    // 이미지
    const files = fs.readdirSync(`./seeds/${username}/`);
    const fileList = files.filter(file=>file.startsWith(username + postId));
    
    const newFiles = fileList.map(file=>{
        const newFile = `${crypto.randomBytes(24).toString("hex")}.${file.split(".")[1]}`;
        
        const oldPath= `./seeds/${username}/${file}`;
        const newPath = `./data/articles/${newFile}`;
        fs.copyFileSync(oldPath, newPath);

        return newFile;
    })

    // DB 쿼리
    const article = new Article({
        description : `${username}'s photo!`,
        photos: newFiles,
        user: user._id,
        created: Date.now()
    })
    await article.save();

    return console.log(article);
}

// 팔로우 생성하는 함수
async function createFollow(follower, following){
    const _follower = await User.findOne({username : follower});
    const _following = await User.findOne({username : following});

    const follow = new Follow({
        follower : _follower._id,
        following : _following._id
    })

    await follow.save();

    return console.log(follow)
}

// 위의 함수를 호출하는 함수
async function createData(){
    try{
        await mongoose.connect(mongoDB);

        await createUser("bunny", "bunny@example.com");
        await createUser("cat", "cat@example.com");
        await createUser("bird", "bird@example.com");
        await createUser("dog", "dog@example.com");
        await createUser("duck", "duck@example.com");

        await createUser("pug", "pug@example.com");
        await createUser("quokka", "quokka@example.com");
        await createUser("monkey", "monkey@example.com");

        await createFollow("pug","bunny")
        await createFollow("bunny","cat")
        await createFollow("bunny","quokka")
        await createFollow("bunny","dog")

        await createArticle("bunny","1")
        await createArticle("bunny","2")
        await createArticle("bunny","3")
        
        await createArticle("cat","1")
        await createArticle("cat","2")
        await createArticle("cat","3")
        await createArticle("cat","4")

        await createArticle("bird","1")
        
        await createArticle("dog","1")
        await createArticle("dog","2")
        await createArticle("dog","3")
        
        await createArticle("pug","1")
        await createArticle("pug","2")
        await createArticle("pug","3")

        await createArticle("quokka","1")
        await createArticle("quokka","2")
        await createArticle("quokka","3")

        await createArticle("monkey","1")
        await createArticle("monkey","2")
        await createArticle("monkey","3")

        mongoose.connection.close();

    }catch(error){
        console.error(error);
    }
}

createData();
