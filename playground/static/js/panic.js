const sliceError = errno => [ getPhase(errno), getModule(errno), getRawError(errno) ];
const codeToHex  = errno => errno.toString(16).padStart(6, "0");

const phases = {
    0x1: "Stream",
    0x2: "Lexer",
    0x3: "AST",
    0x4: "Parser",
    0x5: "Semantic",
    0x6: "Typecheck",
    0x7: "Virtual Machine",
};

export function panic(error, cursor, sourceLine, customMessage) {
    const { code, message, hint } = error;
    const [ line, col ] = cursor.split(":").map(s => parseInt(s));

    const filepath = './src/main.rt';
    const phase    = phases[code >> 20] || "Unknown";

    /* Display */
    let detailedMessage = "";
    {
        detailedMessage += `\n ${phase} Error[0x${codeToHex(code)}]: ${message}`;

        detailedMessage += `\n     ┌─ ${filepath}:${cursor}`;
        detailedMessage += `\n     │`;

        // This will prevent the digits from moving everything to the right
        detailedMessage += `\n ${line.toString().padStart(3, ' ')} │ ${sourceLine}`;

        // Wait until the wrong part and repeat '^' until the end of the line
        detailedMessage += `\n     │${' '.repeat(col)}${'^'.repeat(sourceLine.length - col + 1)} `;
        if (hint)
            detailedMessage += hint; // ^^^^^ Did you mean...?

    }
    displayErrorPopup(detailedMessage);
}

function displayErrorPopup(detailedMessage) {
    const params = {
        scrollbars: false,
        resizable: true,
        status: false,
        location: false,
        toolbar: false,
        width: 854,
        height: 456,
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
                font-size: 26pt;
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
            code: 0x200001,
            message: "Invalid character",
            hint: "Use ASCII characters, not unicode",
        },
        Unclosed_String: {
            code: 0x200002,
            message: "Unclosed string literal",
            hint: "Close the string with a quotation mark"
        }
    },
    AST: {
        Malformed_Variable: {
            code: 0x300001,
            message: "Malformed variable",
            hint: null
        },
        Duplicate_Declaration: {
            code: 0x300002,
            message: "Duplicate variable declaration",
            hint: "Remove the second reference",
        },
    },
    PARSER: {
        Unexpected_Token: {
            code: 0x400001,
            message: "Unexpected token",
            hint: "Remove this token",
        },
        Unclosed_Parentheses: {
            code: 0x400002,
            message: "Unclosed parentheses",
            hint: "Add \")\"",
        },
        Missing_Identifier: {
            code: 0x400003,
            message: "Expected identifier",
            hint: "Add the name"
        },
        Invalid_FuncBody: {
            code: 0x410004,
            message: "Expected a valid function body",
            hint: "Ensure the function has a valid body",
        },
    },
    TYPECHECK: {
        NotIDTYPE_ReturnType: {
            code: 0x610005,
            message: "Expected a valid return type",
            hint: "Use the return type void or some type"
        },
    },
    STREAMS: {
        Unexpected_EOS: {
            code: 0x100001,
            message: "Unexpected end of stream",
            hint: "Complete the statement"
        }
    }
};

window.panic = panic;
window.Errors = Errors;
