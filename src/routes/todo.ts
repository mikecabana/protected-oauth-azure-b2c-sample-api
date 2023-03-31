import express from "express";
import passport from "passport";

const router = express.Router();
const todos = [
    { id: 1, name: "do laundry after work" },
    { id: 3, name: "pick up kids from school" },
];

const protectedTodos = [
    { id: 2, name: "invest lottery winnings" },
    { id: 4, name: "buy a yacht" },
];

const getTodos = () => todos.sort((a, b) => a.id - b.id);
const getProtectedTodos = () =>
    [...todos, ...protectedTodos].sort((a, b) => a.id - b.id);

router.get("/", (req, res) => {
    const todos = getTodos();
    res.status(200).send({ todos });
});

router.get(
    "/protected",
    passport.authenticate("oauth-bearer", { session: false }),
    (req, res) => {
        const todos = getProtectedTodos();
        res.status(200).send({ todos });
    }
);

export default router;
