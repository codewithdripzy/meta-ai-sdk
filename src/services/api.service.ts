
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(baseURL: string, apiKey?: string, apiVersion?: string) {
		this.axiosInstance = axios.create({
			baseURL,
			headers: {
				...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
				...(apiVersion ? { 'X-API-Version': apiVersion } : {}),
			},
		});
	}

	public async get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.get(url, { ...config, params });
		return response.data;
	}

	public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
		return response.data;
	}

	public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
		return response.data;
	}

	public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
		return response.data;
	}

	// For streaming endpoints (e.g., Server-Sent Events, chunked responses)
	public async stream<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
		// This is a placeholder. Actual streaming logic may require custom handling.
		const response = await this.axiosInstance.post(url, data, { ...config, responseType: 'stream' });
		return response.data;
	}
}
