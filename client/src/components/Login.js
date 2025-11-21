import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "./AuthContext";

export default function Login(){
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [email, setEmail]=useState(localStorage.getItem("email")||"");
    const [password, setPassword]= useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e){
        e.preventDefault();

        const formData = {email, password}
        console.log(formData)
        
        // fetch 메서드를 통해 server에 전송
        // server에 요청할때 >> fetch() 메서드 사용
        fetch(`${process.env.REACT_APP_SERVER}/accounts/login`,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(formData)  //formData는 object 형식이기때문에 stringify 메서드를 통해 JSON 형식으로 바꾸는 것이다
        })
        .then(res=>{
            if(!res.ok){    // 200 ok가 아닌경우
                throw res;  // 응답을 throw >> catch 블록으로 이동한다
            }
            // 200 ok인 경우 >> 서버의 응답(JSON 포맷)을 파싱한다
            return res.json()
        })
        .then(data=>{
            // 로그인에 성공했을 때 >> AuthProvider.js
            // navigate : 페이지를 이동하는 훅
            // replace : ture >> 현재 페이지를 대체한다. 뒤로가기를 해도 로그인페이지로 돌아가지 않는다
            auth.signIn(data, ()=> navigate("/", {replace:true}));
            // 로컬스토리지에 로그인에 성공한 email을 저장한다
            localStorage.setItem("email",email)
        })
        .catch(error =>{
            // 에러 출력
            console.log(error)

            // 로그인에 실패했을 때

            // 유저 정보를 잘못 입력했을 때 401 error
            if(error.status === 401){   // customError
                return alert("User not found")
            }
            // 기타 에러 (500)
            alert("Something's broken")
        })
    };


    return(
        <form onSubmit={handleSubmit} className="max-w-xs px-2 mx-auto">
            <div className="mb-4 h-48 flex justify-center items-center">
                <h1 className="text-2xl">SocialMediaApp</h1>
            </div>
            <div className="mb-2">
                <label htmlFor="">Email</label>
                <input
                type="text"
                className="border px-2 py-1 w-full"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="">Password</label>
                <input
                type={showPassword ? "text": "password"}    // 삼항연산자 : true||false일 때 사용가능하다
                className="border px-2 py-1 w-full"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <label>
                    <input
                    type="checkbox"
                    // onClick 아닌 onChange다
                    onChange={(e)=>setShowPassword(e.target.checked)}
                    />{" "}
                    Show password
                </label>
            </div>
            <div className="mb-2">
                <button
                type="submit"
                className="border border-blue-500 text-blue-500 p-1 w-full disabled:opacity-[0.2]"
                disabled={!email.trim()|| !password.trim()} // trim() 함수 : 문자열 좌우에서 공백을 제거하는 함수. !email.trim() >> email이 빈 문자인 경우 !email == true
                >
                    Login
                </button>
            </div>
            <div>
                <Link to="/register" className="text-blue-500">Create account</Link>
            </div>
        </form>
    )


};