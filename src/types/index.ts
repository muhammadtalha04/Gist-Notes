// Reducer state types
export type UserState = {
    name: string;
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
};

export type GistState = {
    data: Gist[]
}

export type AuthState = {
    token: string | null,
    loggedIn: boolean,
}

export interface FormState {
    fileName: string;
    description: string;
    content: string;
    heading: string;
}
// --------------------------------------------

// Reducer action
export type Action = {
    type: string;
    payload: any;
};
// --------------------------------------------

// Gist types
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

export type GistPost = {
    files: any,
    description: string,
    public: boolean
}
// --------------------------------------------

// Misc
export type API_OPTIONS = {
    method: string,
    headers: object,
    body: string
}

export interface Params {
    id: string;
}

export type IDFunc = (id: string) => void;
// --------------------------------------------