const axios = require("axios");
const querystring = require ("querystring");

const getTokens = async(code, clientId, clientSecret, redirectUri) => {
    /*
        * Uses the code to get tokens
        * that can be used to fetch the user's profile
        */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    const result = await axios.post(  url, querystring.stringify(values), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    
    return result.data;
}

module.exports.getTokens = getTokens;