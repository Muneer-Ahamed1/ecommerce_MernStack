import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({ children }) {
  const isUserLoggedIn = useSelector((state)=>state.Auth.isLoginUser) 
  const totalCount=useSelector((state)=>state.Products.totalCount);
  console.log(isUserLoggedIn);


  console.log(useSelector((state)=>state.Auth));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/Login");
    }
  }, [navigate]);

  if (isUserLoggedIn) {
    return <>{children}</>;
  }
  return null;
}

export default Protected;
