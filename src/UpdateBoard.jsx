import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const UpdateBoard = ( {userInfo} ) => {
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    "id" : id,
    "title" : '',
    "content" : ''
  });

  useEffect(() => {
    if(!sessionStorage.getItem('jwt'))
      return;

    axiosInstance.get(`/board/${id}`)
      .then(response => {
        setBoard(response.data)
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        setLoading(false)
      })
  }, [])
  
  // 이 이상 늘어나면 컴포넌트로 빼자..
  if(loading || !userInfo)
    return <div>페이지 불러오는 중...</div>

  if(userInfo.username !== board.writer) {
    alert('잘못된 접근');
    history.back();
  }

  const onChangeHandler = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div>
      제목<br /><input type="text" name="title" defaultValue={board.title} onChange={onChangeHandler}/> <br />
      내용<br /><textarea name="content" defaultValue={board.content} onChange={onChangeHandler}></textarea> <br />
      <button onClick={() => history.back()}>취소</button>
      <button onClick={() => {
        if(!update.title && !update.content) {
          alert('수정된 내용이 없습니다');
          return;
        }

        if(!confirm('수정하시겠습니까?')) {
          return;
        }

        axiosInstance.put('/board', update)
          .then(response => {
            alert(response.data);
            navigate('/');
          }).catch(error => {
            console.error(error);
          })
      }}>수정완료</button>
    </div>
  )
}

export default UpdateBoard;