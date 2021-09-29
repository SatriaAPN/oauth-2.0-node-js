const querystring = require ("querystring");
const axios = require("axios");
const lib = require('../../config/lib');

class OAuth2Service{
    constructor(){
        this._lib = lib;

        this.getGoogleAuthUri = this.getGoogleAuthUri.bind(this);
    }

    async getGoogleAuth(){
        const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const options = {
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            client_id: process.env.GOOGLE_CLIENT_ID,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            ].join(" "),
        };
    
        return `${rootUrl}?${querystring.stringify(options)}`;
    }

    async getGoogleAuthUri(code){
        const { id_token, access_token } = await lib.getTokens(
            code,
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
        
        // Fetch the user's profile with the access token and bearer
        const googleUser = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${id_token}`,
                    },
                }
            )
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });
    
        return googleUser;
    }
}

module.exports = OAuth2Service;