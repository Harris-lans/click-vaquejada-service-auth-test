import { FACEBOOK_APP_ID } from '../config';

let initialized = false;

export function tryToInitializeFacebookSdk() 
{
    if (initialized)
    {
        return;
    }

    console.log('trying to initialize facebook sdk');

    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v8.0'
        });
    };

    // load facebook sdk script
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    console.log('successfully initialized facebook sdk');

    initialized = true;
};
