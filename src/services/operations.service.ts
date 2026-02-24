import { ApiClient } from "./api.service";

export class Operations {
    private readonly apiClient: ApiClient;
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    // Add methods for operations management here
}
