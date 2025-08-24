import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axiosInstance from "./axiosInstance";

const useRequireLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!sessionStorage.getItem('jwt')) {
      navigate('/login');
      return;
    }

    axiosInstance.get('/userinfo')
      .catch(() => navigate('/login'))
  }, [navigate]);
}

export default useRequireLogin;