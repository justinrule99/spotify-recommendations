

// basic utils for interacting with the node layer

export const getAuthUrl = async () => {
    const response = await fetch('/api/login');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('succ');
    return body;
};


// need to make a proper post request
export const sendTokenAndAuthenticate = async () => {
    const response = await fetch('/api/authenticate');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
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