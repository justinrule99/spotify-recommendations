

// basic utils for interacting with the node layer

// generic get request builder
const getFromApi = async (route) => {
    const response = await fetch(route);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};


export const getAuthUrl = async () => {
    const response = await fetch('/api/login');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('succ');
    return body;
};


// need to make a proper post request
export const sendTokenAndAuthenticate = async (code) => {
    console.log('code to send: ', code);
    const codeObj = {
        code: code
    };

    const response = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(codeObj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const body = await response.json();
    console.log(response.status);
    console.log('body: ', body);

    if (response.status === 500) throw Error(body.message);
    return body;
};

export const getToken = async () => {
    const response = await fetch('/api/token');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("ducc");

    return body;
};

export const getTopTracks = async (artistId) => {
    const response = await fetch(`/api/toptracks/${artistId}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('gottem');

    return body;
};

export const getMe = async () => {
    return getFromApi('/api/getme');
};

export const getUserPlaylists = async (userId) => {
    return getFromApi(`/api/getplaylists/${userId}`);
};

export const getPlaylistTracks = async (playlistId) => {
    return getFromApi(`/api/getplaylisttracks/${playlistId}`);
};

