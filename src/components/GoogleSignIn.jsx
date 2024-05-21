import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '@/API/auth.api';
const clientId = import.meta.env.CLIENT_ID;

const GoogleSignIn = () => {
    // 
    const onSuccess = async (res) => {
        // On successful login we receive a code that will be exchanged to access token
        const authCode = res.code;
        try {
            const response = await googleAuth(authCode);
            console.log(response);
        } catch (error) {
            console.log('Error logging in!', error);
        }


        console.log("Login successful! Current user ", res.profileObj);
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