import { Gist, GistPost } from "../types";

const GITHUB_API_URL = 'https://api.github.com';

// This function takes url and options as parameters and calls the api using fetch function and returns the output from the server.
const fetchData = (url: string, options?: object, asJson?: boolean) => {
    if (options === undefined) {
        options = {};
    }

    return fetch(url, options).then(x => {
        return (asJson !== undefined && asJson === false) ? x : x.json();
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
    This function searches the record whose id matches with the given id from the data.
*/
export const searchGist = (id: string, payload: Gist[]) => {
    return payload.filter((gist) => gist.id === id);
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

    return fetchData(url, options, true);
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

    return fetchData(url, options, true);
}

export const getPublicGists = (token: string) => {
    const url = `${GITHUB_API_URL}/gists/public?per_page=100`;
    const options = {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options, true);
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

    return fetchData(url, options, true);
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

    return fetchData(url, options, true);
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

    return fetchData(url, options, true);
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

    return fetchData(url, options, false);
}

export const forkGist = (token: string, id: string) => {
    const url = `${GITHUB_API_URL}/gists/${id}/forks`;
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options, true);
}

export const starGist = (token: string, id: string) => {
    const url = `${GITHUB_API_URL}/gists/${id}/star`;
    const options = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetchData(url, options, false);
}

export const getGistData = (id: string, data: Gist[]): Gist | null => {
    let filteredRecord: Gist[] = data.filter((gist) => gist.id === id);

    return (filteredRecord.length > 0) ? filteredRecord[0] : null;
}

export const getGistContent = (url: string) => {
    return fetchData(url, {}, false);
}