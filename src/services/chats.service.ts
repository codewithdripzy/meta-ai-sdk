import { ApiClient } from "./api.service";

export class Chats {
    private readonly apiClient: ApiClient;
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    // Add methods for chat management here
}
