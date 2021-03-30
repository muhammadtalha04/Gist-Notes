export type UserState = {
    name: string;
    id: number;
    username: string;
    avatar: string;
    url: string;
};

export type Action = {
    type: string;
    payload: any;
};

export type Gist = {
    id: string,
    files: object,
    owner: object,
    updated_at: string,
    description: string,
}

export type GistState = {
    data: Gist[]
}

export type AuthState = {
    token: string | null,
    loggedIn: boolean,
}

export type GistPost = {
    files: any,
    description: string,
    public: boolean
}

export type API_OPTIONS = {
    method: string,
    headers: object,
    body: string
}