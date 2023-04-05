import express, { Request, Response } from "express";
// import fetch from "cross-fetch";

import { B2cApiConnectorRequest } from "../models/b2c-api-connector-request.class.js";
import { B2cApiConnectorResponse } from "../models/b2c-api-connector-response.class.js";
import { basicAuthenticationMiddleware } from "../utils/basic-authentication-middleware.js";
import { getAccountExternal } from "../utils/get-account-external.js";
import { getB2cAccessToken } from "../utils/get-b2c-access-token.js";
import { isValidEmail } from "../utils/is-valid-email.js";

const router = express.Router();

router.use(basicAuthenticationMiddleware);

router.post(
    "/enrich-token",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (req: Request<any, any, B2cApiConnectorRequest>, res) => {
        console.log("'enrich-token' request body");
        console.log(JSON.stringify(req.body, null, 2));

        const { objectId: id } = req.body;

        const continueResponse: B2cApiConnectorResponse = {
            version: "1.0.0",
            action: "Continue",
        };

        try {
            const { access_token } = await getB2cAccessToken({
                client_id: `${process.env.CLIENT_ID}`,
                client_secret: `${process.env.CLIENT_SECRET}`,
                policy_name: `${process.env.POLICY_NAME}`,
                tenant_name: `${process.env.TENANT_NAME}`,
            });

            const protocol = req.protocol;
            const host = req.get("host") || "";

            const { account } = await getAccountExternal({
                protocol,
                host,
                id,
                access_token,
            });

            console.log(JSON.stringify({ account }, null, 2));

            if (account) {
                continueResponse["extension_sample_account_type"] = account.type;
            }

            return res.status(200).send(continueResponse);
            // eslint-disable-next-line no-empty
        } catch (error) {
            console.log("An error occurred");
            console.log(JSON.stringify({ error }, null, 2));
            return res.status(200).send(continueResponse);
        }
    }
);

router.post(
    "/validate-signup",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req: Request<any, any, B2cApiConnectorRequest>, res: Response<B2cApiConnectorResponse>) => {
        console.log("'validate-signup' request body");
        console.log(JSON.stringify(req.body, null, 2));

        const { email } = req.body;

        if (isValidEmail(email)) {
            console.log(`${email} is a valid email.`);

            return res.status(200).send({ version: "1.0.0", action: "Continue" });
        }

        console.log(`${email} is NOT a valid email.`);
        return res.status(400).send({
            version: "1.0.0",
            action: "ValidationError",
            status: "400",
            userMessage: "Please use a company email address.",
        });
    }
);

export default router;
