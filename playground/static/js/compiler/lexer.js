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

    while (stream.remaining() > 0) {
        const c = stream.peek();

        if (stream.next("//"))
            stream.discardIf(Character.isNotLineTerminator);

        if (Character.isDoubleQuotes(c))
            token += `"${stream.unwrap('"', '\\')}"`; // Surrond by quotation marks
        else if (IdentPattern.test(c))
            token += stream.readWhile(IdentPattern.test);
        else if (NumPattern.test(c))
            token += stream.readWhile(NumPattern.test);
        else {
            stream.skip();
            if (Character.isWhitespace(c))
                continue;

            token += c;
            if (stream.next("=") && equalsCanGoNext(c))
                token += '=';
        }

        tokens.push(Token(token, stream.cursor()));
        token = "";
    }

    return tokens;

}

window.qrtTokenize = qrtTokenize;
window.equalsCanGoNext = equalsCanGoNext;
