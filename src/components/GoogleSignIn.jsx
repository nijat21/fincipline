import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '@/API/auth.api';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import { useContext } from 'react';
import { AuthContext } from '@/context/auth.context';


const GoogleSignIn = () => {
    const { storeToken, authenticateUser } = useContext(AuthContext);

    // On successful login we receive a code that will be exchanged to access token
    const onSuccess = async (credentialResponse) => {
        // console.log(credentialResponse);
        try {
            const response = await googleAuth(credentialResponse.credential);
            console.log("Google Auth run", response);
            storeToken(response.data.authToken);
            authenticateUser();
        } catch (error) {
            console.log('Error logging in!', error);
        }
    };

    const onError = (res) => {
        console.log('Login failed! Error: ', res);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onError={onError}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            useOneTap
            shape='pill'
        />
    );
};

export default GoogleSignIn;