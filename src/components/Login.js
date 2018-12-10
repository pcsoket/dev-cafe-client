import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <LoginForm />
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
        <div>
          <button> 구글로 로그인</button>
        </div>
      </div>
    );
  }
}

const LoginForm = () => {
  return (
    <div>
      <form accept-charset="UTF-8" method="post" action="/api/v1/login">
        <legend>로그인</legend>
        <div>
          <label>이메일</label>
          <input name="email" value="" placeholder="E-mail" type="text" />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            name="password"
            value=""
            placeholder="Password"
            type="password"
          />
        </div>
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default Login;
