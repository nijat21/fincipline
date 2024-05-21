import { GoogleLogout } from "@react-oauth/google";
const clientId = import.meta.env.CLIENT_ID;

function GoogleSignOut() {
    // 
    const onSuccess = () => {
        console.log('Logout successful!');
    };



    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText={'Logout'}
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default GoogleSignOut;
