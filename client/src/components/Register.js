import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
    const navigate = useNavigate();

    // input과 관련있는 state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // 유효성 검사 : 바로 server에 보내지 않고, 입력된 값을 검사한다
        if (password.length < 3) {
            alert("비밀번호가 안전하지 않습니다")
            return;
        }

        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다")
            return;
        }
        
        // 데이터가 잘 입력되는지 console로 확인
        const formData = { username, email, password };
        console.log(formData)

        // 문제가 없으면 fech 메서드를 통해 server에 전송한다
        fetch(`${process.env.REACT_APP_SERVER}/accounts/register`, {    // (몽고DB로 만든)server주소/accounts/register
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => {
                console.log("res",res);
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then(data => {
                // 가입에 성공했을 때
                // 로그인 페이지로 이동
                navigate('/login');
            })
            .catch(error => {
                // 가입에 실패했을 때
                
                // 에러 출력
                console.log(error)

                // 유저 이름 또는 이메일을 가진 유저가 가입되어있을 경우 (데이터 베이스에 이미 있을 경우)
                if (error.status === 400) {
                    return alert("가입된 유저이름 또는 이메일 입니다");
                }

                // 기타 에러 (500)
                alert("Something's broken");
            })

    }

    const disabled = !username.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim();

    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto px-2">
            <div className="mb-4 flex h-24 items-end">
                <h1 className="text-2xl">회원가입</h1>
            </div>

            <div className="mb-2"> 
                <label>Username</label>
                <input
                    type="text"
                    className="border px-2 py-1 w-full"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label>Email</label>
                <input
                    type="text"
                    className="border px-2 py-1 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label>Password</label>
                <input
                    type="password"
                    className="border px-2 py-1 w-full"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label>Password confirm</label>
                <input
                    type="password"
                    className="border px-2 py-1 w-full"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            </div>
            <div className="mb-2">
            <button
                type="submit"
                className="border border-blue-500 text-blue-500 px-2 w-full disabled:opacity-[0.2]"
                disabled={disabled}
                >
                    Submit
                </button>
            </div>
            <div>
                <Link to="/login" className="text-blue-500">Login</Link>
            </div>
        </form>
    )
};