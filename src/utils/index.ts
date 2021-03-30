import { API_OPTIONS, Gist, GistPost } from "./types";

const GITHUB_API_URL = 'https://api.github.com';

// This function takes url and options as parameters and calls the api using fetch function and returns the output from the server.
const fetchData = (url: string, options?: object) => {
    let method: string | undefined = undefined;

    if (options === undefined) {
        options = {};
    } else {
        const tmpOpt: API_OPTIONS = options as API_OPTIONS;
        method = tmpOpt['method'];
    }

    return fetch(url, options).then(x => {
        return (method !== undefined && method.toLowerCase() === "delete") ? x : x.json();
    }).then(y => {
        // console.log("Response");
        return y;
    }).catch((err) => {
        // console.log("Error");
        return err;
    });
}

/*
    This function removes the records whose id matches with the given id from the data and return the remaining.
*/
export const removeGist = (id: string, payload: Gist[]) => {
    return payload.filter((gist) => gist.id !== id);
}

/*
    This function traverses the whole array and if the record's id matches with the given id, it replaces that record with the updated record.
*/
export const editGistData = (id: string, payload: Gist, data: Gist[]) => {
    return data.map((gist) => {
        if (id === gist.id) {
            gist.files = payload.files;
            gist.description = payload.description;
        }
        return gist;
    });
}

/*
    This function returns the client id to be used for authorization purpose when logging in.
*/
export const getClientId = (): string => {
    return "606106b402d92b57ab55";
}

/*
    This function uses the github api to get the details of a user and return them.
*/
export const getUser = (token: string) => {
    const url = `${GITHUB_API_URL}/user`;
    const options = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options);
}

export const getUserGists = (username: string, token: string) => {
    const url = `${GITHUB_API_URL}/users/${username}/gists`;
    const options = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options);
}

export const getGist = (id: string, token: string) => {
    const url = `${GITHUB_API_URL}/gists/${id}`;
    const options = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options);
}

export const createNewGist = (token: string, payload: GistPost) => {
    const url = `${GITHUB_API_URL}/gists`;
    const options = {
        method: "post",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    };

    return fetchData(url, options);
}

export const updateGist = (token: string, payload: GistPost, id: string) => {
    const url = `${GITHUB_API_URL}/gists/${id}`;
    const options = {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    };

    return fetchData(url, options);
}

export const deleteGist = (token: string, id: string) => {
    const url = `${GITHUB_API_URL}/gists/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options);
}