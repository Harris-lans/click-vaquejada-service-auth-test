import { Auth } from 'aws-amplify';
import { REGION, USER_POOL_ID, USER_POOL_WEB_CLIENT_ID, USER_POOL_DOMAIN, IDENTITY_POOL_ID } from '../config';

Auth.configure({ 

    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
    identityPoolId: IDENTITY_POOL_ID

})

const authService = {

    signUp: async (email, password, firstName, lastName, gender, birthDate, role) =>
    {
        try
        {
            const response = await Auth.signUp({ username: email, password, attributes: { given_name: firstName, family_name: lastName, gender, birthdate: birthDate, nickname: role } })
            return response
        }
        catch (error)
        {
            console.error(error.message)
            return error
        }
    },

    confirmSignUp: async (email, verificationCode) =>
    {
        return await Auth.confirmSignUp(email, verificationCode)
    },

    signIn: async (email, password) =>
    {
        return await Auth.signIn({ username: email, password })
    },

    federatedSignIn: (provider, redirectURL) =>
    {
        window.location.href = `https://${USER_POOL_DOMAIN}.auth.${REGION}.amazoncognito.com/oauth2/authorize?identity_provider=${provider}&response_type=token&client_id=${USER_POOL_WEB_CLIENT_ID}&redirect_uri=${redirectURL}`
    },

    signOut: async () =>
    {
        return await Auth.signOut()
    },

    forgotPassword: async (email) =>
    {
        return await Auth.forgotPassword(email)
    },

    submitForgotPasswordRequest: async (email, verificationCode, newPassword) =>
    {
        return await Auth.forgotPasswordSubmit(email, verificationCode, newPassword)
    }
};

export default authService;