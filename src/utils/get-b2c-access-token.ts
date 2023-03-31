// eslint-disable-next-line @typescript-eslint/no-explicit-any
const encodeBody = (body: any) => {
    const formBody = [];
    for (const property in body) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
};

export const getB2cAccessToken = async ({
    client_id,
    client_secret,
    policy_name,
    tenant_name,
}: {
    client_id: string;
    client_secret: string;
    tenant_name: string;
    policy_name: string;
}) => {
    const body = encodeBody({
        grant_type: `client_credentials`,
        client_id,
        client_secret,
        scope: `https://${tenant_name}.onmicrosoft.com/sample-node-api/.default`,
    });

    const url = `https://${tenant_name}.b2clogin.com/${tenant_name}.onmicrosoft.com/${policy_name}/oauth2/v2.0/token`;

    const res = await fetch(url, {
        method: "POST",
        body,
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return await res.json();
};
