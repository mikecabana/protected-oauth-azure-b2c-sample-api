import { Request, Response, NextFunction } from "express";

export const basicAuthenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // parse Basic Auth username and password
    const header = req.headers["authorization"] || "", // get the header
        token = header.split(/\s+/).pop() || "", // and the encoded auth token
        auth = Buffer.from(token, "base64").toString(), // convert from base64
        parts = auth.split(/:/), // split on colon
        username = parts[0],
        password = parts[1];

    // Check for HTTP Basic Authentication, return HTTP 401 error if invalid credentials.
    if (
        username !== process.env.BASIC_AUTH_USERNAME ||
        password !== process.env.BASIC_AUTH_PASSWORD
    ) {
        return res.status(401).send("Unauthorized");
    }

    return next();
};
