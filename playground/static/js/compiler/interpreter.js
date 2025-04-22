class Interpreter {

    constructor(tree) {
        this.tree = tree;
        this.stack = [];        // TODO: stack -> env.stack

        // Necessary to define the environment of the
        // Ruthenium Virtual Machine (RVM)
        this.env = {
            id: {}
        };
    }

    init() {
        /* --- Crash tutorial on how to initialize the RVM --- */

        // 1. Include standard libraries
        this.importStd();

        // That's it. This will eventually be a bit more complex.
    }

    run() {
        this.init();
        for (const statement of this.tree) {
            this.evaluate(statement);
        }
    }

    // TODO: Add process function
    //       trust me, its gonna change everything

    evaluate(statement) {
        switch (statement.type) {

            case 'VariableDeclaration':
                if (statement.value) {
                    // TODO: Assuming int?? This should change ASAP
                    this.env.id[statement.name] = parseInt(statement.value);
                }
                break;

            case 'FunctionDeclaration':
                if (statement.name === 'main') {
                    for (const bodyNode of statement.body) {
                        this.evaluate(bodyNode);
                    }
                }
                break;

            case 'FunctionCall':
                if (statement.name === 'println') {
                    const output = document.getElementById('output');
                    const value = statement.args[0].startsWith('"') ?
                        statement.args[0].slice(1, -1) :
                        this.env.id[statement.args[0]];
                    output.innerHTML += value + '\n';
                }
                break;

        }
    }

    importStd() {
        const output = document.querySelector("#output");

        // TODO: Implement function signatures like println_S
        this.env.id.println = function(msg) {
            output.innerHTML += msg + "<br>";
        };
    }

}

window.Interpreter = Interpreter;
