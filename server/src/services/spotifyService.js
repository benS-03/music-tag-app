let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
    const now = Date.now();

    if (accessToken && now < tokenExpiresAt)
    {
        return accessToken;
    }

    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const response = await fetch('https://accounts.spotify.com/api/token' ,
        {
            method: 'POST',
            headers: {
                'Authorization' : 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64'),
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000;

    return accessToken;
}


module.exports = { getAccessToken };