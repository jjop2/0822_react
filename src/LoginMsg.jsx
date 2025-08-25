import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";

export const LoginMsg = () => {
  const toLogin = () => {
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

  alert('로그인 후 이용하세요');
  toLogin();
}