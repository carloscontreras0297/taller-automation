import { APIRequestContext, expect } from '@playwright/test';
import { pathUrls } from "../utils/functions/pathUrls";
import { apiKeys } from '../utils/functions/obtainCredential';

export class ApiControllerApi {
    constructor(private request: APIRequestContext) { }

    async getUsersList(pageNumber: number) {
        const URL = pathUrls.reqresApi.users.userEndpoint().toString();
        const response = await this.request.get(URL, {
            params: {
                page: pageNumber,
            },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKeys.reqResApi.apiKey,
            },
            timeout: 2000,
            failOnStatusCode: true,
        });
        return {
            ok: response.ok(),
            status: response.status(),
            headers: response.headers(),
            responseBody: await response.json(),
        };
    }

    async createUser(name: string, job: string) {
        const URL = pathUrls.reqresApi.users.userEndpoint().toString();
        const response = await this.request.post(URL, {
            data: {
                name: name,
                job: job
            },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKeys.reqResApi.apiKey,
            },
            timeout: 3000,
            failOnStatusCode: true,
        });
        return {
            ok: response.ok(),
            status: response.status(),
            headers: response.headers(),
            responseBody: await response.json(),
        };
    }

    async deleteUser(userId: string) {
        const URL = pathUrls.reqresApi.users.deleteUserEndpoint(userId).toString();
        const response = await this.request.delete(URL, {
            headers: {
                'x-api-key': apiKeys.reqResApi.apiKey,
            },
            timeout: 3000,
            failOnStatusCode: true,
        });
        return {
            ok: response.ok(),
            status: response.status(),
            headers: response.headers(),
            responseBody: await response.text(),
        };
    }
}

