const nonValidEmailDomains = [
    "yahoo",
    "gmail",
    "hotmail",
    "outlook",
    "aol",
    "proton",
];

export const isValidEmail = (email: string) => {
    const domain = email.split("@")[1];
    return !nonValidEmailDomains.includes(domain.toLowerCase());
};
