const sliceError = errno => [ getPhase(errno), getModule(errno), getRawError(errno) ];
const codeToHex  = errno => errno.toString(16).padStart(6, "0");

const phases = {
    0x1: "Lexer",
    0x2: "AST",
    0x3: "Parser",
    0x4: "Semantic",
    0x5: "Interpreter"
};

export function panic(error, line, col, sourceLine, customMessage) {
    const { code, message } = error;

    const filepath = './src/main.rt';
    const phase    = phases[code >> 20] || "Unknown";

    const suggestion = generateSuggestion(error);

    /* Display */
    let detailedMessage = "";
    {
        detailedMessage += `\n Error[0x${codeToHex(code)}]: ${message}`;
        if (customMessage)
            detailedMessage += `: ${customMessage}\n`;

        detailedMessage += `\n     ┌─ ${filepath}:${line}:${col}`;
        detailedMessage += `\n     │`;

        // This will prevent the digits from moving everything to the right
        detailedMessage += `\n ${line.toString().padStart(3, ' ')} │ ${sourceLine}`;

        // Wait until the wrong part and repeat '^' until the end of the line
        detailedMessage += `\n     │${' '.repeat(col)}${'^'.repeat(sourceLine.length - col + 1)} `;
        if (suggestion)
            detailedMessage += suggestion; // ^^^^^ Did you mean...?

    }
    displayErrorPopup(detailedMessage);
}

function generateSuggestion(error) {
    if (error === Errors.LEXER.Unclosed_String)
        return "Close the string with a quotation mark";

    if (error === Errors.LEXER.Invalid_Char)
        return "Use ASCII characters, not unicode";

    if (error === Errors.AST.Duplicate_Declaration)
        return "Remove the second reference";

    if (error === Errors.AST.Missing_Identifier)
        return "Add the name";

    if (error === Errors.PARSER.Unclosed_Parentheses)
        return "Add \")\"";

    if (error === Errors.PARSER.Unexpected_Token)
        return "Remove this token";

    return null;
}

function displayErrorPopup(detailedMessage) {
    const params = {
        scrollbars: false,
        resizable: true,
        status: false,
        location: false,
        toolbar: false,
        width: 560,
        height: 400,
        left: -1000,
        top: -1000
    }

    // { scrollbars: false } -> "scrollbars=false"
    const fmtParams = Object.entries(params).map(a => `${a[0]}=${a[1]}`).join()
    let error_popup = window.open('about:blank', "test", fmtParams);

    error_popup.document.head.innerHTML =`
        <title>Ruthenium Interpreter -> Error</title>
        <link href="https://fonts.googleapis.com/css2?family=Tektur:wght@400..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                overflow: hidden;

            }

            body {
                padding: 12px;
                background-color: #222;
            }

            h1 {
                font-family: 'Tektur', sans-serif;
                color: #0e0;
            }

            textarea {
                outline: none;
                width: 100%;
                height: 100%;
                font-family: 'Space Mono', sans-serif;
                font-size: 12pt;
                background: #222;
                border: none;
                color: #fff;
            }
        </style>
    `;

    error_popup.document.body.innerHTML = `<h1>Ruthenium</h1><hr/><br/><textarea readonly="true">${detailedMessage}</textarea>`;
}

export const Errors = {
    LEXER: {
        Invalid_Char: {
            code: 0x100001,
            message: "Invalid character"
        },
        Unclosed_String: {
            code: 0x100002,
            message: "Unclosed string literal"
        }
    },
    AST: {
        Malformed_Variable: {
            code: 0x200001,
            message: "Malformed variable name"
        },
        Duplicate_Declaration: {
            code: 0x200002,
            message: "Duplicate variable declaration"
        },
        Missing_Identifier: {
            code: 0x200003,
            message: "Expected identifier"
        }
    },
    PARSER: {
        Unexpected_Token: {
            code: 0x300001,
            message: "Unexpected token"
        },
        Unclosed_Parentheses: {
            code: 0x300002,
            message: "Unclosed parentheses"
        }
    },
};


function getMessage(phase, module, error) {
    return errors[phase][error]
}

window.panic = panic;
window.Errors = Errors;
