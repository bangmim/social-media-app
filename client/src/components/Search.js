import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import fetchData from "../utils/fetchData";

export default function Search(){
    const [users, setUsers] = useState([]);
    // useRef : 엘리먼트에 직접 접근할 때 사용한다
    const inputRef = useRef(null)

    function handleChange(e){
        const username = e.target.value;

        // 검색어가 없을 때 검색 결과는 없다
        if(!username.trim()){
            return setUsers([])
        }

        fetchData(`${process.env.REACT_APP_SERVER}/search/?username=${username}`)
        .then(data=>{
            setUsers(data)
        })
        .catch(error=>{
            alert("Something's broken")
        })

    };

    // console.log(inputRef)

    // DOM이 리턴된 뒤에 엘리먼트에 접근할 수 있다.
    useEffect(()=>{
        // input에 focus를 한다. >> 자동으로 커서를 깜빡이게 한다
        inputRef.current.focus();
    })  
    // ## useEffect
    // useEffect(callback) : 컴포넌트가 실행될 때마다 callback(effect)이 실행된다. >> liveSearch가 가능하다
    // useEffect(callback, []) : 컴포넌트의 최초 실행시에만 callback이 실행된다.
    // useEffect(callback,[dep1,...]) : 컴포넌트의 최초 실행시, dependency가 업데이트 될 때마다 callback이 실행된다

    return(
        <div className="px-2">
            <div className="mb-4">
                <input
                type="text"
                className="border px-2 py-1 w-full"
                onChange={handleChange}
                placeholder="Search"
                ref={inputRef}
                />
            </div>

            <ul>
                {users.map((user, index)=>(
                    <li key={index}>
                        <Avatar user={user}/>
                    </li>
                ))}
            </ul>
        </div>
    )

};