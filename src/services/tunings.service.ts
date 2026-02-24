import { ApiClient } from "./api.service";

export class Tunings {
    private readonly apiClient: ApiClient;
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    // Add methods for tuning management here
}
