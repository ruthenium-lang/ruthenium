String.isIdentifier = input => {
    const identifierRegex = /^[A-Za-z_][A-Za-z0-9_]*$/;
    return identifierRegex.test(input);
}

String.prototype.unwrap = function () {
    return this.slice(1, -1);
}

/**
 * @param c The wrapper
 * @returns A boolean value, whether or not that string is wrapped
 */
String.prototype.isSurroundedBy = function (c) {
    return (this[0] === c) && (this[this.length - 1] === c);
}

String.prototype.hasSpaces = function() {
    return this.trim() !== this;
}

String.prototype.isBlank = function() {
    return this.trim() === '';
}

// [`Number.isFinite`] Polyfill
if (!Number.isFinite)
    Number.isFinite = isFinite;

function isNumber(n) {
    if (typeof n === 'string') {
        if (n.hasSpaces() || n.isBlank())
            return false;
        n = +n;
    }

    return typeof n === 'number' && Number.isFinite(n);
}


