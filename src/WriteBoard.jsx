import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import useRequireLogin from "./useRequireLogin";

const WriteBoard = ({ userInfo, rerender, setRerender }) => {
  useRequireLogin();

  const [board, setboard] = useState({
    "title" : '',
    "content" : '',
    "writer" : { username : userInfo ? userInfo.username : ''}
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setboard({
      ...board,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      제목<br /><input type="text" name="title" onChange={onChangeHandler}/> <br />
      내용<br /><textarea name="content" onChange={onChangeHandler}></textarea> <br />
      <button onClick={() => {
        if(!board.title) {
          alert("제목 필수");
          return;
        } else if(!board.content) {
          alert("내용 필수");
          return;
        }
        axiosInstance.post('/board', board)
          .then(response => {
            alert(response.data);
            setRerender(!rerender);
            navigate('/');
          }).catch(error => {
            console.error(error);
          })
      }}>등록</button>
    </div>
  )
}

export default WriteBoard;