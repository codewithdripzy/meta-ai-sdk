import * as types from "../core/types/index";
import { ApiClient } from "./api.service";

export class Models /* extends BaseModule */ {
	private readonly apiClient: ApiClient; // Should be ApiClient

	constructor(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * Makes an API request to generate content with a given model.
	 */
	async generateContent(options: types.GenerateContentOption): Promise<any /* types.GenerateContentResponse */> {
		try {
			const res = await this.apiClient.post('/model/generateContent', options);
			return res.data;
		} catch (error) {
			// return this.apiClient.post('/models/generateContent', params);
			throw new Error('Not implemented');
		}
	}

	/**
	 * Makes an API request to generate content with a given model and yields the response in chunks.
	 */
	async generateContentStream(params: any /* types.GenerateContentParameters */): Promise<AsyncGenerator<any /* types.GenerateContentResponse */>> {
	    // Assumes apiClient.stream returns an AsyncGenerator
	    return this.apiClient.stream('/models/generateContent/stream', params);
	}

	/**
	 * Generates an image based on a text description and configuration.
	 */
	async generateImages(params: any /* types.GenerateImagesParameters */): Promise<any /* types.GenerateImagesResponse */> {
		// return this.apiClient.post('/models/generateImages', params);
		throw new Error('Not implemented');
	}

	/**
	 * Lists available models.
	 */
	async list(params?: any /* types.ListModelsParameters */): Promise<any /* Pager<types.Model> */> {
		// return this.apiClient.get('/models', params);
		throw new Error('Not implemented');
	}

	/**
	 * Edits an image based on a prompt, list of reference images, and configuration.
	 */
	async editImage(params: any /* types.EditImageParameters */): Promise<any /* types.EditImageResponse */> {
		// return this.apiClient.post('/models/editImage', params);
		throw new Error('Not implemented');
	}

	/**
	 * Upscales an image based on an image, upscale factor, and configuration.
	 */
	async upscaleImage(params: any /* types.UpscaleImageParameters */): Promise<any /* types.UpscaleImageResponse */> {
		// return this.apiClient.post('/models/upscaleImage', params);
		throw new Error('Not implemented');
	}

	/**
	 * Generates videos based on a text description and configuration.
	 */
	async generateVideos(params: any /* types.GenerateVideosParameters */): Promise<any /* types.GenerateVideosOperation */> {
		// return this.apiClient.post('/models/generateVideos', params);
		throw new Error('Not implemented');
	}

	/**
	 * Calculates embeddings for the given contents. Only text is supported.
	 */
	async embedContent(params: any /* types.EmbedContentParameters */): Promise<any /* types.EmbedContentResponse */> {
		// return this.apiClient.post('/models/embedContent', params);
		throw new Error('Not implemented');
	}

	/**
	 * Recontextualizes an image.
	 */
	async recontextImage(params: any /* types.RecontextImageParameters */): Promise<any /* types.RecontextImageResponse */> {
		// return this.apiClient.post('/models/recontextImage', params);
		throw new Error('Not implemented');
	}

	/**
	 * Segments an image, creating a mask of a specified area.
	 */
	async segmentImage(params: any /* types.SegmentImageParameters */): Promise<any /* types.SegmentImageResponse */> {
		// return this.apiClient.post('/models/segmentImage', params);
		throw new Error('Not implemented');
	}

	/**
	 * Fetches information about a model by name.
	 */
	async get(params: any /* types.GetModelParameters */): Promise<any /* types.Model */> {
		// return this.apiClient.get('/models/get', params);
		throw new Error('Not implemented');
	}

	/**
	 * Updates a tuned model by its name.
	 */
	async update(params: any /* types.UpdateModelParameters */): Promise<any /* types.Model */> {
		// return this.apiClient.patch('/models/update', params);
		throw new Error('Not implemented');
	}

	/**
	 * Deletes a tuned model by its name.
	 */
	async delete(params: any /* types.DeleteModelParameters */): Promise<any /* types.DeleteModelResponse */> {
		// return this.apiClient.delete('/models/delete', params);
		throw new Error('Not implemented');
	}

	/**
	 * Counts the number of tokens in the given contents.
	 */
	async countTokens(params: any /* types.CountTokensParameters */): Promise<any /* types.CountTokensResponse */> {
		// return this.apiClient.post('/models/countTokens', params);
		throw new Error('Not implemented');
	}

	/**
	 * Given a list of contents, returns a corresponding TokensInfo containing the list of tokens and list of token ids.
	 */
	async computeTokens(params: any /* types.ComputeTokensParameters */): Promise<any /* types.ComputeTokensResponse */> {
		// return this.apiClient.post('/models/computeTokens', params);
		throw new Error('Not implemented');
	}
}