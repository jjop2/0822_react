import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/board')
      .then(response => {
        setBoardList(response.data);
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  if(loading)
    return <div>게시글 목록 불러오는 중...</div>

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.map((board, i) => {
              return (
                <tr key={i}>
                  <td>{board.id}</td>
                  <td style={{'cursor': 'pointer'}} onClick={() => {
                    navigate(`/board/${board.id}`);
                  }}>{board.title}</td>
                  <td>{board.writer}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default BoardList;