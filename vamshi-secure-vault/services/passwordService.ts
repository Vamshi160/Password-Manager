
export const generatePassword = (
    length: number, 
    includeNumbers: boolean, 
    includeSymbols: boolean, 
    includeUppercase: boolean
): string => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = lowercaseChars;
    let password = '';

    if (includeUppercase) {
        charPool += uppercaseChars;
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (includeNumbers) {
        charPool += numberChars;
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (includeSymbols) {
        charPool += symbolChars;
        password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    // Ensure we have at least one lowercase character if other types are not selected
    if(password.length === 0 || password.length < length) {
        password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }

    const remainingLength = length - password.length;

    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }
    
    // Shuffle the password to ensure random character placement
    return password.split('').sort(() => 0.5 - Math.random()).join('');
};
