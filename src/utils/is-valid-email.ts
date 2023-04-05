const nonValidEmailDomains = ["yahoo", "gmail", "hotmail", "outlook", "aol", "proton"];

export const isValidEmail = (email: string) => {
    const domainAndTld = email.split("@")[1];
    const domain = domainAndTld.split(".")[0];
    console.log(`validating email domain ${domain}`);
    return !nonValidEmailDomains.includes(domain.toLowerCase());
};
