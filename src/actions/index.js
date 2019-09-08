export const login = (user_type) => {
    return {
        type: "LOGIN",
        payload: user_type
    }
}