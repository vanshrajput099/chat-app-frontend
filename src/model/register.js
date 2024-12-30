export const registerSchema = (data) => {
    const errors = {};

    const username = data.current[0].value;
    const email = data.current[1].value;
    const password = data.current[2].value;

    if (username.trim() === "") {
        errors.username = "*Username is required";
    }

    if (email.trim() === "") {
        errors.username = "*Email is required";
    }

    if (password.trim() === "") {
        errors.password = "*Password is required";
    } else {
        if (password.length < 6) {
            errors.password = "*Password length should be more than 6 characters";
        }
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
        errors.email = "*Wrong Gmail Address Input";
    }

    return errors;
}