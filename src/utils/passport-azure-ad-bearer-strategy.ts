import dotenv from "dotenv";

dotenv.config();

import { BearerStrategy } from "passport-azure-ad";

const config = {
    credentials: {
        tenantName: `${process.env.TENANT_NAME}`,
        clientID: `${process.env.CLIENT_ID}`,
        issuer: `https://${process.env.TENANT_NAME}.b2clogin.com/${process.env.TENANT_ID}/v2.0/`,
    },
    policies: {
        policyName: `${process.env.POLICY_NAME}`,
    },
    resource: {
        scope: `${process.env.SCOPE}`.split(' '),
    },
    metadata: {
        authority: `${process.env.TENANT_NAME}.onmicrosoft.com`,
        discovery: ".well-known/openid-configuration",
        version: "v2.0",
    },
    settings: {
        isB2C: true,
        validateIssuer: true,
        passReqToCallback: false,
        loggingLevel: process.env.LOG_LEVEL as
            | "info"
            | "warn"
            | "error"
            | undefined,
    },
};

export const passportAzureAdBearerStrategy = new BearerStrategy(
    {
        identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
        clientID: config.credentials.clientID,
        audience: config.credentials.clientID,
        issuer: config.credentials.issuer,
        policyName: config.policies.policyName,
        isB2C: config.settings.isB2C,
        scope: config.resource.scope,
        validateIssuer: config.settings.validateIssuer,
        loggingLevel: config.settings.loggingLevel,
        // passReqToCallback: config.settings.passReqToCallback,
    },
    (token, done) => {
        // Send user info using the second argument
        done(null, {}, token);
    }
);
