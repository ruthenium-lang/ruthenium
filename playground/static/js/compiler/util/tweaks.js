/**
 * Unwraps the string no matter the wrapper:
 *  - `"hi"`: `hi` (wrapper: '"')
 *  - `(hi)`: `hi` (wrapper: '(' and ')')
 *
 * @returns The unwrapped string
 */
String.prototype.unwrap = function() {
    return this.slice(1, -1);
}

/**
 * @param c The wrapper
 * @returns A boolean value, whether or not that string is wrapped
 */
String.prototype.isSurroundedBy = function(c) {
    return (this[0] === c) && (this[this.length - 1] === c);
}

/**
 * @returns True if the string has spaces at the start or end
 */
String.prototype.hasSpaces = function() {
    return this.trim() != this;
}

/**
 * @returns True if the string is empty or full of whitespaces
 */
String.prototype.isBlank = function() {
    return this.trim() == '';
}

// Polyfill
if (!Number.isFinite)
    Number.isFinite = isFinite;

/**
 *!  Criterias:
 *  - The number can be a string
 *  - The number cannot have whitespaces or paddings
 *  - The number must be finite
 *  - The number must not be NaN
 *  - The number must end and start with a number (false: "59; hello world")
 *
 * @returns True if the value is a number
 */
function isNumber(n) {
    if (typeof n === 'string') {
        if (n.hasSpaces() || n.isBlank())
            return false;
        n = +n;
    }

    return typeof n === 'number' && Number.isFinite(n);
}
