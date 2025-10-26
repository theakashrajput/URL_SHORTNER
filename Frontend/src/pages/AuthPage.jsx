import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const AuthPage = () => {

    const [loginState, setLoginState] = useState(true);

  return (
    <div>
        {loginState ? <Login stateManage={setLoginState} /> : <Register stateManage={setLoginState} />}
    </div>
  )
}

export default AuthPage