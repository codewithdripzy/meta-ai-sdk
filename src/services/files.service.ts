import { ApiClient } from "./api.service";

export class Files {
    private readonly apiClient: ApiClient;
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    // Add methods for file management here
}
