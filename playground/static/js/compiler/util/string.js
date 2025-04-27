String.isIdentifier = input => {
    const identifierRegex = /^[A-Za-z_][A-Za-z0-9_]*$/;
    return identifierRegex.test(input);
}

String.prototype.unwrap = function () {
    return this.slice(1, -1);
}
