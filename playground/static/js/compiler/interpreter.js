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

    evaluate(statement) {
        switch (statement.type) {

            case 'VariableDeclaration':
                if (!statement.value)
                    break;

                let contains = "<RT_UNDEFINED>" /*, valueType*/;
                if (statement.value.isSurroundedBy('"')) {
                    //valueType = 'STR_LITERAL';
                    contains = statement.value.unwrap();
                } else {
                    //valueType = 'NUM_LITERAL';
                    contains = parseInt(statement.value);
                }

                console.log(contains);
                this.env.id[statement.name] = contains;
                break;

            case 'FunctionDeclaration':
                if (statement.name !== 'main')
                    break;

                for (const bodyNode of statement.body) {
                    this.evaluate(bodyNode);
                }
                break;

            case 'FunctionCall':
                if (statement.name !== 'println')
                    break;

                const output = document.getElementById('output');
                const value = statement.args[0].isSurroundedBy('"') ?
                    statement.args[0].unwrap() :
                    this.env.id[statement.args[0]];
                output.innerHTML += value + '\n';
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
