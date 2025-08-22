import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [member, setMember] = useState({
    username: '',
    password: '',
    email: ''
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
      <h1>회원가입 페이지</h1>
      아이디 : <input type="text" name="username" onChange={onChangeHandler} /> <br />
      비밀번호 : <input type="text" name="password" onChange={onChangeHandler} /> <br />
      이메일 : <input type="text" name="email" onChange={onChangeHandler} /> <br />
      <button onClick={() => {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, member)
          .then(response => {
            console.log(response)
            alert(response.data);

            navigate('/');
          }).catch(error => {
            console.log(error);
          })
      }}>회원가입</button>
    </div>
  )
}

export default Signup;