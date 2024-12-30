export const loginSchema = (data) => {
    const errors = {};

    const username = data.current[0].value;
    const password = data.current[1].value;

    if (username.trim() === "") {
        errors.username = "*Username is required";
    }

    if (password.trim() === "") {
        errors.password = "*Password is required";
    } 

    return errors;
}