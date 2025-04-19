export const Character = {
    isDoubleQuotes:  c => (c === '"'),
    isWhitespace:    c => (c <= ' '),
    isLetter:        c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'),
    isDigit:         c => (c >= '0' && c <= '9'),
};
