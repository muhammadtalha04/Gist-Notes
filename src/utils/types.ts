export type UserState = {
    name: string;
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
};

export type Action = {
    type: string;
    payload: any;
};

type GistOwner = {
    login: string,
    avatar_url: string,
}

export type Gist = {
    id: string,
    files: object,
    owner: GistOwner,
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

export interface Params {
    id: string;
}

export interface FormState {
    fileName: string;
    description: string;
    content: string;
    heading: string;
}

export const FormActionTypes = {
    SET_FILE_NAME: "SET_FILE_NAME",
    SET_DESCRIPTION: "SET_DESCRIPTION",
    SET_CONTENT: "SET_CONTENT",
    SET_HEADING: "SET_HEADING",
}