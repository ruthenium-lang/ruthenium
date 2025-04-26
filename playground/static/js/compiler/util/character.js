export class Character {

    static isNotLineTerminator(c) {
        const carriageReturn = c === '\r';
        const lineFeed       = c === '\n';

        return !(lineFeed || carriageReturn);
    }

    static isDoubleQuotes(c) {
        return c === '"';
    }

    static isWhitespace(c) {
        // Everything below ' ' (x20) is considered a ASCII Control Character
        // which is not displayed, so I consider it also a whitespace.
        // And ' ' is also a whitespace, so we gotta use the <= operator.
        return c <= ' ';
    }

    static isLetter(c) {

        // Lowercase
        if (c >= 'a' && c <= 'z')
            return true;

        // Uppercase
        if (c >= 'A' && c <= 'Z')
            return true;

        return false;
    }

    static isDigit(c) {
        return c >= '0' && c <= '9'
    }

};
