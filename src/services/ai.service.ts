import { ApiClient } from "./api.service";
import { Models } from "./models.service";
import { MetaGenAIOptions } from "../core/interfaces/options";
// import { Caches } from "./caches.service";
// import { Files } from "./files.service";
// import { Chats } from "./chats.service";
// import { Batches } from "./batches.service";
// import { Operations } from "./operations.service";
// import { Tunings } from "./tunings.service";
// import { FileSearchStores } from "./fileSearchStores.service";

class MetaAI {
    private apiKey?: string;
    private apiUrl: string;
    private readonly apiVersion?: string;

    protected readonly apiClient: ApiClient;
    readonly models: Models;
    // readonly batches: Batches;
    // readonly chats: Chats;
    // readonly caches: Caches;
    // readonly files: Files;
    // readonly operations: Operations;
    // readonly tunings: Tunings;
    // readonly fileSearchStores: FileSearchStores;

    constructor(options: MetaGenAIOptions) {
        this.apiKey = options.apiKey;
        this.apiUrl = options.apiUrl || "https://meta.ai.synapse.orello.space/api/";
        this.apiVersion = options.apiVersion;

        this.apiClient = new ApiClient(this.apiUrl, this.apiKey, this.apiVersion);
        this.models = new Models(this.apiClient);
        // this.batches = new Batches(this.apiClient);
        // this.chats = new Chats(this.apiClient);
        // this.caches = new Caches(this.apiClient);
        // this.files = new Files(this.apiClient);
        // this.operations = new Operations(this.apiClient);
        // this.tunings = new Tunings(this.apiClient);
        // this.fileSearchStores = new FileSearchStores(this.apiClient);
    }
}

export default MetaAI;