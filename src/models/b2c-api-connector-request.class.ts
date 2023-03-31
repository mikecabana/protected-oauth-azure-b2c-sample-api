export class B2cApiConnectorRequest {
    "email": string;
    "identities": {
        signInType:
            | "emailAddress"
            | "userName"
            | "federated"
            | "userPrincipalName";
        issuer: string;
        issuerAssignedId: string;
    }[];
    "client_id": string;
    "step":
        | "PostFederationSignup"
        | "PostAttributeCollection"
        | "PreTokenIssuance";
    "ui_locales": string;
    "objectId": string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: string | any; // allows for all attributes
}
