import { getAccount } from "./get-account.js";

export const getAccountExternal = async ({
    host,
    protocol,
    id,
    access_token,
}: {
    protocol: string;
    host: string;
    id: string;
    access_token: string;
}) => {
    console.log("Simulating getting the account via external service");

    const url = `${protocol}://${host}/account/${id}`;

    console.log(JSON.stringify({ url, access_token }, null, 2));

    // const res = await fetch(`${protocol}://${host}/account/${id}`, {
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${access_token}`,
    //     },
    // });

    // return await res.json();

    const account = getAccount(id);
    return { account };
};
