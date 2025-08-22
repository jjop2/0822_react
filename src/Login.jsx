import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ( { setAuth } ) => {
  const [member, setMember] = useState({
    "username" : '',
    "password" : ''
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>로그인 페이지</h1>
      아이디 : <input type="text" name="username" onChange={onChangeHandler}/> <br />
      비밀번호 : <input type="text" name="password" onChange={onChangeHandler}/> <br />
      <button onClick={() => {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, member)
          .then(response => {
            const jwt = response.headers.authorization; // 토큰

            if(jwt != null ) {
              sessionStorage.setItem('jwt', jwt);
              setAuth(true);
              navigate('/');
            }

          }).catch(error => {
            console.error(error);
          })
      }}>로그인</button>
    </div>
  )
}

export default Login;