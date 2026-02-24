import { System, Type } from "typescript";
import { Role } from "../enums/model";

export interface GenerateContentOption {
    conversation: MessageData[];

    context?: Record<string, any>;
    /** Used to override HTTP request options. */
    httpOptions?: HttpOptions;
    /** Abort signal which can be used to cancel the request.

     NOTE: AbortSignal is a client-only operation. Using it to cancel an
     operation will not cancel the request in the service. You will still
     be charged usage for any applicable operations.
     */
    abortSignal?: AbortSignal;
    /** Instructions for the model to steer it toward better performance.
     For example, "Answer as concisely as possible" or "Don't use technical
     terms in your response".
     */
    systemInstruction?: SystemInstructions;
    /** Value that controls the degree of randomness in token selection.
     Lower temperatures are good for prompts that require a less open-ended or
     creative response, while higher temperatures can lead to more diverse or
     creative results.
     */
    temperature?: number;
    /** Tokens are selected from the most to least probable until the sum
     of their probabilities equals this value. Use a lower value for less
     random responses and a higher value for more random responses.
     */
    topP?: number;
    /** For each token selection step, the ``top_k`` tokens with the
     highest probabilities are sampled. Then tokens are further filtered based
     on ``top_p`` with the final token selected using temperature sampling. Use
     a lower number for less random responses and a higher number for more
     random responses.
     */
    topK?: number;
    /** Number of response variations to return.
     */
    candidateCount?: number;
    /** Maximum number of tokens that can be generated in the response.
     */
    maxOutputTokens?: number;
    /** List of strings that tells the model to stop generating text if one
     of the strings is encountered in the response.
     */
    stopSequences?: string[];
    /** Whether to return the log probabilities of the tokens that were
     chosen by the model at each step.
     */
    responseLogprobs?: boolean;
    /** Number of top candidate tokens to return the log probabilities for
     at each generation step.
     */
    logprobs?: number;
    /** Positive values penalize tokens that already appear in the
     generated text, increasing the probability of generating more diverse
     content.
     */
    presencePenalty?: number;
    /** Positive values penalize tokens that repeatedly appear in the
     generated text, increasing the probability of generating more diverse
     content.
     */
    frequencyPenalty?: number;
    /** When ``seed`` is fixed to a specific number, the model makes a best
     effort to provide the same response for repeated requests. By default, a
     random number is used.
     */
    seed?: number;
    /** Output response mimetype of the generated candidate text.
     Supported mimetype:
     - `text/plain`: (default) Text output.
     - `application/json`: JSON response in the candidates.
     The model needs to be prompted to output the appropriate response type,
     otherwise the behavior is undefined.
     This is a preview feature.
     */
    responseMimeType?: string;
    /** The `Schema` object allows the definition of input and output data types.
     These types can be objects, but also primitives and arrays.
     Represents a select subset of an [OpenAPI 3.0 schema
     object](https://spec.openapis.org/oas/v3.0.3#schema).
     If set, a compatible response_mime_type must also be set.
     Compatible mimetypes: `application/json`: Schema for JSON response.
     */
    responseSchema?: SchemaDefinition;
    /** Optional. Output schema of the generated response.
     This is an alternative to `response_schema` that accepts [JSON
     Schema](https://json-schema.org/). If set, `response_schema` must be
     omitted, but `response_mime_type` is required. While the full JSON Schema
     may be sent, not all features are supported. Specifically, only the
     following properties are supported: - `$id` - `$defs` - `$ref` - `$anchor`
     - `type` - `format` - `title` - `description` - `enum` (for strings and
     numbers) - `items` - `prefixItems` - `minItems` - `maxItems` - `minimum` -
     `maximum` - `anyOf` - `oneOf` (interpreted the same as `anyOf`) -
     `properties` - `additionalProperties` - `required` The non-standard
     `propertyOrdering` property may also be set. Cyclic references are
     unrolled to a limited degree and, as such, may only be used within
     non-required properties. (Nullable properties are not sufficient.) If
     `$ref` is set on a sub-schema, no other properties, except for than those
     starting as a `$`, may be set. */
    // responseJsonSchema?: unknown;
    /** Configuration for model router requests.
     */
    // routingConfig?: GenerationConfigRoutingConfig;
    /** Configuration for model selection.
     */
    // modelSelectionConfig?: ModelSelectionConfig;
    /** Safety settings in the request to block unsafe content in the
     response.
     */
    // safetySettings?: SafetySetting[];
    /** Code that enables the system to interact with external systems to
     perform an action outside of the knowledge and scope of the model.
     */
    tools?: ToolList;
    /** Associates model output to a specific function call.
     */
    // toolConfig?: ToolConfig;
    /** Labels with user-defined metadata to break down billed charges. */
    labels?: Record<string, string>;
    /** Resource name of a context cache that can be used in subsequent
     requests.
     */
    cachedContent?: string;
    /** The requested modalities of the response. Represents the set of
     modalities that the model can return.
     */
    responseModalities?: string[];
    /** If specified, the media resolution specified will be used.
     */
    // mediaResolution?: MediaResolution;
    /** The speech generation configuration.
     */
    speechConfig?: SpeechConfig;
    /** If enabled, audio timestamp will be included in the request to the
     model.
     */
    audioTimestamp?: boolean;
    /** The configuration for automatic function calling.
     */
    // automaticFunctionCalling?: AutomaticFunctionCallingConfig;
    /** The thinking features configuration.
     */
    // thinkingConfig?: ThinkingConfig;
    /** The image generation configuration.
     */
    // imageConfig?: ImageConfig;
}

/** HTTP options to be used in each of the requests. */
export declare interface HttpOptions {
    /** The base URL for the AI platform service endpoint. */
    baseUrl?: string;
    /** Specifies the version of the API to use. */
    apiVersion?: string;
    /** Additional HTTP headers to be sent with the request. */
    headers?: Record<string, string>;
    /** Timeout for the request in milliseconds. */
    timeout?: number;
    /** Extra parameters to add to the request body.
     The structure must match the backend API's request structure.
     - VertexAI backend API docs: https://cloud.google.com/vertex-ai/docs/reference/rest
     - GeminiAPI backend API docs: https://ai.google.dev/api/rest */
    extraBody?: Record<string, unknown>;
}

export interface Schema {
    /** Optional. The type of the data. */
    type: Type;
    /** Optional. SCHEMA FIELDS FOR TYPE ARRAY Schema of the elements of Type.ARRAY. */
    items?: Schema; // For arrays
    /** Optional. The order of the properties. Not a standard field in open api spec. Only used to support the order of the properties. */
    properties: Record<string, Schema>;
    /** Optional. Required properties of Type.OBJECT. */
    required?: string[];
    /** Optional. The value should be validated against any (one or more) of the subschemas in the list. */
    anyOf?: Schema[];
    /** Optional. Default value of the data. */
    default?: unknown;
    /** Optional. The description of the data. */
    description?: string;
    /** Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as : {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as : {type:INTEGER, format:enum, enum:["101", "201", "301"]} */
    enum?: string[];
    /** Optional. Example of the object. Will only populated when the object is the root. */
    example?: unknown;
    /** Optional. The format of the data. Supported formats: for NUMBER type: "float", "double" for INTEGER type: "int32", "int64" for STRING type: "email", "byte", etc */
    format?: string;
    /** Optional. Maximum number of the elements for Type.ARRAY. */
    maxItems?: string;
    /** Optional. Maximum length of the Type.STRING */
    maxLength?: string;
    /** Optional. Maximum number of the properties for Type.OBJECT. */
    maxProperties?: string;
    /** Optional. Maximum value of the Type.INTEGER and Type.NUMBER */
    maximum?: number;
    /** Optional. Minimum number of the elements for Type.ARRAY. */
    minItems?: string;
    /** Optional. SCHEMA FIELDS FOR TYPE STRING Minimum length of the Type.STRING */
    minLength?: string;
    /** Optional. Minimum number of the properties for Type.OBJECT. */
    minProperties?: string;
    /** Optional. SCHEMA FIELDS FOR TYPE INTEGER and NUMBER Minimum value of the Type.INTEGER and Type.NUMBER */
    minimum?: number;
    /** Optional. Indicates if the value may be null. */
    nullable?: boolean;
    /** Optional. Pattern of the Type.STRING to restrict a string to a regular expression. */
    pattern?: string;
    /** Optional. SCHEMA FIELDS FOR TYPE OBJECT Properties of Type.OBJECT. */
    propertyOrdering?: string[];
    /** Optional. The title of the Schema. */
    title?: string;
}

export interface MessageData {
    role: Role;
    part: PartData | PartData[];
}

export interface PartData {
    content: string;
    inlineData?: {
        mimeType: string;
        data: string;
    };
}

export interface ToolConfig {

}

export type SchemaDefinition = Schema | string;
export type ToolList = ToolConfig[] | string;
export type SystemInstructions = string[];

export type SpeechConfig = {
    language?: string;
    voice?: string;
    speed?: number;
    pitch?: number;
    [key: string]: any;
};