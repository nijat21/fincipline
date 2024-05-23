import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '@/API/auth.api';
const clientId = import.meta.env.VITE_CLIENT_ID;


const GoogleSignIn = () => {
    // On successful login we receive a code that will be exchanged to access token
    const onSuccess = async (credentialResponse) => {
        const authCode = credentialResponse;
        console.log('Auth code', authCode);
        try {
            const response = await googleAuth({ code: authCode });
            console.log("Google Auth run", response);
        } catch (error) {
            console.log('Error logging in!', error);
        }

        console.log("Login successful! Current user ", credentialResponse.profileObj);
    };

    const onError = (res) => {
        console.log('Login failed! Error: ', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onError={onError}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default GoogleSignIn;