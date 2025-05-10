import { Character } from './util/character.js'
import { Token } from '../tokens/tokens.js'

export function equalsCanGoNext(c) {
    if (!c)
        return false;

    return "*&/|+-<>~=".indexOf(c) >= 0;
}

export function qrtTokenize(stream) {
    const tokens = [];
    let token = "";

    const parens = [], braces = [];

    while (stream.remaining() > 0) {
        const c = stream.peek();

        if (stream.next("//"))
            stream.discardIf(Character.isNotLineTerminator);

        if (Character.isDoubleQuotes(c))
            token += `"${stream.unwrap('"', '\\')}"`; // Surrond by quotation marks
        else if (NameChecker.test(c))
            token += stream.readWhile(NameChecker.test);
        else if (isNumber(c))
            token += stream.readWhile(isNumber);
        else {
            stream.skip();
            if (Character.isWhitespace(c))
                continue;

            if (c === '{')
                braces.push(stream.index);
            else if (c === '}')
                braces.pop();

            if (c === '(')
                parens.push(stream.index);
            else if (c === ')')
                parens.pop();

            token += c;
            if (stream.next("=") && equalsCanGoNext(c))
                token += '=';
        }

        tokens.push(Token(token, stream.cursor()));
        token = "";
    }

    stream.index = parens[0] || braces[0] || 0;

    if (parens.length > 0)
        return stream.error(Errors.LEXER.Unclosed_Paren), undefined;

    if (braces.length > 0)
        return stream.error(Errors.LEXER.Unclosed_Brace), undefined;

    return tokens;

}

window.qrtTokenize = qrtTokenize;
window.equalsCanGoNext = equalsCanGoNext;
