import { API_OPTIONS, Gist, GistPost } from "./types";

const GITHUB_API_URL = 'https://api.github.com';

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

export const generatePageNums = (length: number, perPage: number): number[] => {
    const pageNums: number[] = [];

    for (let i = 1; i <= Math.ceil(length / perPage); i++) {
        pageNums.push(i);
    }

    return pageNums;
}

export const removeGist = (id: string, payload: Gist[]) => {
    return payload.filter((gist) => gist.id !== id);
}

export const editGistData = (id: string, payload: Gist, data: Gist[]) => {
    return data.map((gist) => {
        if (id === gist.id) {
            return payload;
        } else {
            return gist;
        }
    });
}

export const getClientId = (): string => {
    return "606106b402d92b57ab55";
}

export const getAuthUser = () => {
    const user = window.localStorage.getItem("user");

    if (user !== null) {
        return JSON.parse(user);
    } else {
        return false;
    }
}

export const createSession = (token: string): void => {
    window.localStorage.setItem('token', token);
}

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