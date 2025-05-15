class Interpreter {

    constructor(ast) {
        this.scopes = [];
        this.ast    = ast;

        // The global scope
        this.global = { id: {} };
    }

    init() {
        /* --- Crash tutorial on how to initialize the RVM --- */

        // 1. Include standard libraries
        this.importStd();

        // That's it. This will eventually be a bit more complex.
    }

    run() {
        this.init();
        for (const statement of this.ast) {
            this.evaluate(statement);
        }
    }

    evaluate(statement) {
        switch (statement.type) {

            case 'VariableDeclaration':
                if (!statement.value)
                    break;

                let contains = "<RT_UNDEFINED>" /*, valueType*/;
                if (statement.value.isSurroundedBy('"')) {
                    //valueType = 'string';
                    contains = statement.value.unwrap();
                } else {
                    //valueType = 'number';
                    contains = parseInt(statement.value);
                }

                console.log(contains);
                this.global.id[statement.name] = contains; // TODO: use scopes
                break;

            case 'FunctionDeclaration':
                if (statement.name !== 'main')
                    break;

                this.scopes.push({});
                {
                    // Scope lifetime
                    for (const bodyNode of statement.body)
                        this.evaluate(bodyNode);
                }
                this.scopes.pop();

                break;

            case 'FunctionCall':
                if (statement.name !== 'println')
                    break;

                const output = document.getElementById('output');
                const value = statement.args[0].isSurroundedBy('"') ?
                    statement.args[0].unwrap() :
                    this.global.id[statement.args[0]];
                output.innerHTML += value + '\n';
        }
    }

    importStd() {
        const output = document.querySelector("#output");

        this.global.id.println = function(msg) {
            output.innerHTML += msg + "<br>";
        };
    }

}

window.Interpreter = Interpreter;
