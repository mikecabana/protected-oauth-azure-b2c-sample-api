import express from "express";
import passport from "passport";

const router = express.Router();

const accounts = [
    {
        id: "10631418-6747-4f4d-aead-f452f162cce8",
        email: "mikeycabana@gmail.com",
        type: "pro",
    },
];

const getAccount = (id: string) => {
    for (const account of accounts) {
        if (id === account.id) {
            return account;
        }
    }
    return null;
};

router.get(
    "/:id",
    passport.authenticate("oauth-bearer", { session: false }),
    (req, res) => {
        const account = getAccount(req.params.id);
        if (!account) {
            res.status(404).send("account not found");
        }
        res.status(200).send({ account });
    }
);

export default router;
