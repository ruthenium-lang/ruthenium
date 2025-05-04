const types = {
    // Keywords
    'null': 'kw_NULL',          // OPCODE: x00
    'let':  'kw_LET',           // OPCODE: x01
    'mut':  'kw_MUT',           // OPCODE: x02
    'fn':   'kw_FN',            // OPCODE: x03

    // Symbols
    '(': 'O_PAREN',             // OPCODE: x04
    ')': 'C_PAREN',             // OPCODE: x05
    '{': 'O_BRACE',             // OPCODE: x06
    '}': 'C_BRACE',             // OPCODE: x07

    '>': 'LT',                  // OPCODE: x08
    '<': 'GT',                  // OPCODE: x09

    ';': 'SEMICOLON',           // OPCODE: x0A
    '^': 'OWNERSHIP',           // OPCODE: x0B
    '?': 'OPTIONAL',            // OPCODE: x0C
    '*': 'POINTER',             // OPCODE: x0D
    ':': 'COLON',               // OPCODE: x0E
    '=': 'EQUAL',               // OPCODE: x0F
    '&': 'AND',                 // OPCODE: x10
    '|': 'OR',                  // OPCODE: x11

    // Operators with equals
    '==': 'IS_EQUAL_TO',        // OPCODE: x12
    '*=': 'MUL_EQUAL',          // OPCODE: x13
    '&=': 'AND_EQUAL',          // OPCODE: x14
    '/=': 'DIV_EQUAL',          // OPCODE: x15
    '+=': 'ADD_EQUAL',          // OPCODE: x16
    '-=': 'SUB_EQUAL',          // OPCODE: x17
    '~=': 'INV_EQUAL',          // OPCODE: x18
    '>=': 'LT_EQUAL',           // OPCODE: x19
    '<=': 'GT_EQUAL',           // OPCODE: x1A
    '|=': 'OR_EQUAL',           // OPCODE: x1B

}

export function qrtTypeOf(s) {
    let t = "ID";

    if (StrPattern.test(s))
        t = "STR_LITERAL";

    else if (NumPattern.test(s))
        t = "NUM_LITERAL";

    else if (TypePattern.test(s))
        t = "TYPE";

    else {
        Object.entries(types).forEach(entry => {
            if (entry[0] !== s) { return; }
            t = entry[1];
        });
    }

    return t;
}

export function qrtHasImplicitCast(typeA, typeB) {
    if (typeA === typeB)
        return true;

    if (typeA === undefined || typeB === undefined)
        return true;

    const typeOfA = qrtTypeOf(typeA);
    const typeOfB = qrtTypeOf(typeB);
    if (typeOfA !== 'ID' && typeOfB !== 'ID')
        return typeOfA === typeOfB;

    return false;
}

window.qrtTypeOf = qrtTypeOf;
window.qrtHasImplicitCast = qrtHasImplicitCast;

