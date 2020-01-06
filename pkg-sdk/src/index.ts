import axios, { AxiosInstance } from "axios";

export interface IAuthClientOptions {
    baseUrl: string;
}

export interface ILoginResult {
    userId: number;
    token: string;
    expiresIn: number;
}

export interface IAuthPoint {
    name: string;
    displayName: string;
}

export interface IRole {
    id: number
    name: string
}

export interface IUserResponse {
    username: string;
    id: number;
    name: string;
    roles: IRole[];
    createdAt: string;
    updatedAt: string;
}

export class AuthClient {
    private baseUrl = "";
    private httpClient: AxiosInstance;
    //TODO: cache and reuse the token properly.
    private internalUser!: ILoginResult;

    constructor(options: IAuthClientOptions) {
        if (options && options.baseUrl) {
            this.baseUrl = options.baseUrl;
        } else {
            throw new Error("base url of auth service can not be empty");
        }
        this.httpClient = axios.create({baseURL: this.baseUrl, timeout:  10000});
    }

    public async loginByIp() {
        const res = await this.httpClient.post<ILoginResult>("/login-by-ip");
        this.internalUser = res.data;
        return res.data;
    }

    public async registerAuthPoints(authPoints: IAuthPoint[]) {
        await this.loginByIp();
        await this.httpClient.post(
            "auth-points/actions/register",
            { authPoints },
            { headers: { authorization: this.internalUser.token } }
        );
    }

    public async checkAccess(userToken: string, authPointName?: string) {
        let url = 'users/me/actions/check-access'
        if (authPointName) {
            url += '?authPointName=11'
        }
        return this.httpClient.get<IUserResponse>(url, { headers: { authorization: userToken } })
    }

}
