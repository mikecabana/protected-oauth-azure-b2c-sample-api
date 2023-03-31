interface B2cApiConnectorContinueResponse {
    /**
     * The version of your API.
     *
     * @example "1.0.0"
     * @type {string}
     * @memberof B2cApiConnectorContinueResponse
     */
    version: string;

    /**
     *
     *
     * @type {'Continue'}
     * @memberof B2cApiConnectorContinueResponse
     */
    action: "Continue";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: string | any; // allows for returning attributes
}

interface B2cApiConnectorShowBlockPageResponse {
    /**
     * The version of your API.
     *
     * @example "1.0.0"
     * @type {string}
     * @memberof B2cApiConnectorShowBlockPageResponse
     */
    version: string;

    /**
     *
     *
     * @type {'ShowBlockPage'}
     * @memberof B2cApiConnectorShowBlockPageResponse
     */
    action: "ShowBlockPage";

    /**
     * Message to display to the user.
     *
     *
     * @type {string}
     * @memberof B2cApiConnectorShowBlockPageResponse
     */
    userMessage: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: string | any; // allows for returning attributes
}

interface B2cApiConnectorValidationErrorResponse {
    /**
     * The version of your API.
     *
     * @example "1.0.0"
     * @type {string}
     * @memberof B2cApiConnectorValidationErrorResponse
     */
    version: string;

    /**
     *
     *
     * @type {'ValidationError'}
     * @memberof B2cApiConnectorValidationErrorResponse
     */
    action: "ValidationError";

    /**
     *
     *
     * @type {(400 | "400")}
     * @memberof B2cApiConnectorValidationErrorResponse
     */
    status: 400 | "400";

    /**
     * Message to display to the user.
     *
     *
     * @type {string}
     * @memberof B2cApiConnectorResponse
     */
    userMessage: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: string | any; // allows for returning attributes
}

export type B2cApiConnectorResponse =
    | B2cApiConnectorContinueResponse
    | B2cApiConnectorShowBlockPageResponse
    | B2cApiConnectorValidationErrorResponse;
