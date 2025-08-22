import { useState } from "react";
import axiosInstance from "./axiosInstance";

const WriteBoard = ({ userInfo }) => {
  const [board, setboard] = useState({
    "title" : '',
    "content" : '',
    "writer" : { username : userInfo.username }
  });

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
        axiosInstance.post('/board', board)
          .then(response => {
            console.log(response.data)
          }).catch(error => {
            console.error(error);
          })

        // console.log(board)
      }}>등록</button>
    </div>
  )
}

export default WriteBoard;