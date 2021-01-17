import { Button } from 'antd';
import { useCallback } from 'react';
import authService from './service/auth';
import 'antd/dist/antd.css';
import './App.css';

function App() {

  const onSignUpButtonPressed = useCallback(async () =>
  {
    const response = await authService.signUp("test@gmail.com", "Vaquejada123", "Master", "Tester", "Male", "06-12-1998", "Client");
    console.log('signed up', response);
  }, []);

  const onVerifyButtonPressed = useCallback(async () =>
  {
    const response = await authService.confirmSignUp("test@live.com", "504581")
    console.log('email verified', response);
  }, []);
  
  const onForgotPasswordButtonPressed = useCallback(async () =>
  {
    const response = await authService.forgotPassword("test@live.com")
    console.log('forgot password', response);
  }, []);
  
  const onSetNewPasswordButtonPressed = useCallback(async () =>
  {
    const response = await authService.submitForgotPasswordRequest("test@live.com", "393496", "Vaquejada123");
    console.log('set new password', response);
  }, []);

  const onSignInButtonPressed = useCallback(async () =>
  {
    const response = await authService.signIn("test@live.com", "Vaquejada123");
    console.log('signed in', response);
  }, []);

  const onFacebookButtonPressed = useCallback(async ({ email, accessToken: token, expiresIn }) =>
  {
    try
    {
      const response = await authService.federatedSignIn("Facebook", "http://localhost:3000/");
      console.log('facebook sign in response', response);
    }
    catch(error)
    {
      console.error(error);
    }
  }, []); 
  
  const onGoogleButtonPressed = useCallback(async ({ email, accessToken: token, expiresIn }) =>
  {
    try
    {
      const response = await authService.federatedSignIn("Google", "http://localhost:3000/");
      console.log('google sign in response', response);
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
        <Button onClick={onFacebookButtonPressed} type="primary">
          Facebook
        </Button>
        <Button onClick={onGoogleButtonPressed} type="primary">
          Google
        </Button>
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
