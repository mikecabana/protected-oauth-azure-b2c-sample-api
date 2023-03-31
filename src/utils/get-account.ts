const accounts = [
    {
        id: "10631418-6747-4f4d-aead-f452f162cce8",
        email: "mikeycabana@gmail.com",
        type: "pro",
    },
];

export const getAccount = (id: string) => {
    for (const account of accounts) {
        if (id === account.id) {
            return account;
        }
    }
    return null;
};
