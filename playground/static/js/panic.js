const codeToHex  = errno => errno.toString(16).padStart(6, "0");

const phases = {
    0x1: "Stream",
    0x2: "Lexer",
    0x3: "AST",
    0x4: "Semantic",
    0x5: "Typecheck",
    0x6: "Virtual Machine",
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

        detailedMessage += `\n     ╭─ ${filepath}:${cursor}`;
        detailedMessage += `\n     │`;

        // This will prevent the digits from moving everything to the right
        detailedMessage += `\n ${line.toString().padStart(3, ' ')} │ ${sourceLine}`;

        // Wait until the wrong part and then draw a line until the end of the line
        detailedMessage += `\n     │${' '.repeat(col)}╰${'─'.repeat(sourceLine.length - col + 1)} `;
        if (hint)
            detailedMessage += hint; // ^^^^^ Did you mean...?

    }
    displayErrorPopup(detailedMessage);
}

function displayErrorPopup(detailedMessage) {
    const errorType = "Error"; // TODO: Get the actual error type

    const output = document.getElementById('output');
    output.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Tektur&display=swap');

            #output {
                margin: 0;
                padding: 12px;
                background-color: #222;
                overflow: hidden;
            }

            #output h1 {
                font-family: 'Tektur', sans-serif;
                color: #e00;
                font-size: 26pt;
            }

            #output textarea {
                outline: none;
                float: top;
                width: 100%;
                height: 100%;
                font-family: 'IBM Plex Mono', sans-serif;
                line-height: 1.7em;
                font-size: 12pt;
                background: #222;
                border: none;
                color: #fff;
            }
        </style>
        <h1>${errorType}</h1><hr/><br/><textarea readonly="true">${detailedMessage}</textarea>
    `;
}

export const Errors = {
    STREAMS: {
        Unexpected_EOS: {
            code: 0x100000,
            message: "Unexpected end of stream",
            hint: "Complete the statement"
        }
    },
    LEXER: {
        Unclosed_String: {
            code: 0x200000,
            message: "Unclosed string literal",
            hint: "Close the string with a quotation mark"
        }
    },
    AST: {
        Fn_InvalidBody: {
            code: 0x300000,
            message: "Expected a valid function body",
            hint: "Insert an open brace",
        },
        Fn_InvalidCall: {
            code: 0x300001,
            message: "Expected opening parentheses for function call",
            hint: "Insert parentheses",
        },
        Statement_MissingEnd: {
            code: 0x300002,
            message: "Expected a semicolon at the end of the line",
            hint: "Insert semicolon (;)",
        },
        Fn_MissingIdentifier: {
            code: 0x300003,
            message: "Didn't found a name for the function",
            hint: "Insert the word `my_func` before the parentheses",
        },
        Fn_MalformedArgs: {
            code: 0x300004,
            message: "Expected opening parentheses for function declaration",
            hint: "Insert parentheses",
        },
        Fn_InvalidArgName: {
            code: 0x300005,
            message: "Expected a valid name for the arguments",
            hint: "Use a simple name without spaces",
        },
        Fn_MissingArgSeparator: {
            code: 0x300006,
            message: "Arguments aren't correctly separated",
            hint: "Insert a comma (,) after each argument",
        },
        Let_MalformedDeclaration: {
            code: 0x300007,
            message: "Malformed variable",
            hint: "Use the keyword `let`",
        },
        Let_MissingIdentifier: {
            code: 0x300008,
            message: "No variable name found",
            hint: "Name it `my_var` by example",
        }

    },
    TYPECHECK: {
        Fn_InvalidReturnType: {
            code: 0x500000,
            message: "Expected a valid return type",
            hint: "Leave it empty to declare a void function",
        },
        Fn_InvalidArgType: {
            code: 0x500001,
            message: "Expected a valid type for the arguments",
            hint: "Use `int` for integers",
        },
        Let_InvalidType: {
            code: 0x500002,
            message: "Expected a valid type for the variable",
            hint: "Use `int` for integers",
        }
    },

};

window.panic = panic;
window.Errors = Errors;
