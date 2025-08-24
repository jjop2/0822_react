import { Link } from "react-router-dom";

const Header = ({ auth, setAuth, userInfo, setUserInfo }) => {

  const logout = () => {
    sessionStorage.removeItem('jwt');
    setAuth(false);
    setUserInfo('');
  }

  return (
    <div>
      {userInfo && <p>{userInfo.username}님 환영함</p>}
      <Link to='/'>홈페이지</Link>
      {
        auth
        ? <Link to='' onClick={logout}>로그아웃</Link>
        : <Link to='/login'>로그인</Link>
      }
      <Link to='/write'>글작성</Link>
      <Link to='/signup'>회원가입</Link>
    </div>
  )
}

export default Header;