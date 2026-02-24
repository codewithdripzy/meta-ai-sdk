import { ApiClient } from "./api.service";

export class Caches {
    private readonly apiClient: ApiClient;
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    // Add methods for cache management here
}
