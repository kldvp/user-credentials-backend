
export function isPasswordValid(value: string) {
    const specialCharactersRegex = new RegExp('[!@#$%^&*(),.?":{}|<>]');
    const numberRegex = new RegExp('\\d');
    const letterRegex = new RegExp('[a-zA-Z]');
    return value
        && value.length >= 8 // password must be 8 characters minimum
        && numberRegex.test(value) // should contain atleast 1 number
        && letterRegex.test(value) // should contain atleast 1 letter
        && specialCharactersRegex.test(value); // should contain atleast 1 special character
}