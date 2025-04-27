String.isIdentifier = input => {
    const identifierRegex = /^[A-Za-z_][A-Za-z0-9_]*$/;
    return identifierRegex.test(input);
}
