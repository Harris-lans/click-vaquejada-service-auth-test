import { Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { isFacebookSdkInitialized, tryToInitializeFacebookSdk } from '../../util/facebook';

export default function FacebookLoginButton({ onClick })
{
    useEffect(() =>
    {
        tryToInitializeFacebookSdk();
    }, []);

    const checkLoginState = useCallback(() =>
    {
        window.FB.getLoginStatus((response) =>
        {
            if (response.status === 'connected')
            {
                onClick(response.authResponse);
            }
            else
            {
                console.error(response);
            }
        })
    }, [ onClick ]);

    const handleClick = useCallback(() =>
    {
        window.FB.login(checkLoginState, { scope: 'public_profile,email'});
    }, [ checkLoginState ]);

    return (

        <Button onClick={handleClick}>
            Facebook Login
        </Button>
    );
}