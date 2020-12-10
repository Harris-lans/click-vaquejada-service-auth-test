import './App.css';
import { Auth } from 'aws-amplify';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { useCallback } from 'react';
import FacebookLoginButton from './components/FacebookLoginButton';

Auth.configure({ 

  region: "us-east-1",
  userPoolId: "us-east-1_KvMiw8t4z",
  identityPoolId: "us-east-1:cfb2481c-84ec-433e-8acd-9aaa3be10d3a",
  userPoolWebClientId: "1u6oo7gkcfopbp2i559p2vnjj3"

});

function App() {

  const onSignUpButtonPressed = useCallback(async () =>
  {
    const response = await Auth.signUp({ username: "harishsghp@live.com", password: "Vaquejada123" });
    console.log('signed up', response);
  }, []);

  const onVerifyButtonPressed = useCallback(async () =>
  {
    const response = await Auth.confirmSignUp("harishsghp@live.com", "041921")
    console.log('email verified', response);
  }, []);
  
  const onForgotPasswordButtonPressed = useCallback(async () =>
  {
    const response = await Auth.forgotPassword("harishsghp@live.com")
    console.log('forgot password', response);
  }, []);
  
  const onSetNewPasswordButtonPressed = useCallback(async () =>
  {
    const response = await Auth.forgotPasswordSubmit("harishsghp@live.com", "393496", "Vaquejada123");
    console.log('set new password', response);
  }, []);

  const onSignInButtonPressed = useCallback(async () =>
  {
    const response = await Auth.signIn({ username: "harishsghp@live.com", password: "Vaquejada123" });
    console.log('signed in', response);
  }, []);

  const onFacebookButtonPressed = useCallback(async ({ email, accessToken: token, expiresIn }) =>
  {
    const expires_at = expiresIn * 1000 + new Date().getTime();

    try
    {
      const response = await Auth.federatedSignIn("facebook", { token, expires_at }, { email });
      console.log('facebook sign in response', response);
    }
    catch(error)
    {
      console.error(error);
    }
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        Auth Service Test
      </header>
      <div className="login-modal">
        <FacebookLoginButton onClick={onFacebookButtonPressed} />
        <Button onClick={onSignInButtonPressed}>
          Sign In
        </Button>
        <Button onClick={onSignUpButtonPressed}>
          Sign Up
        </Button>
        <Button onClick={onVerifyButtonPressed}>
          Verify
        </Button>
        <Button onClick={onForgotPasswordButtonPressed}>
          Forgot Password
        </Button>
        <Button onClick={onSetNewPasswordButtonPressed}>
          Set New Password
        </Button>
      </div>
    </div>
  );
}

export default App;
