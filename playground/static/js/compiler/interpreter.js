class Interpreter {

    constructor(ast) {
        this.stack = [];
        this.ast   = ast;

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
        for (const statement of this.ast) {
            this.evaluate(statement);
        }
    }

    evaluate(node) {
        switch (node.type) {

            case 'VariableDeclaration':
                if (!node.value)
                    break;

                let contains = "<RT_UNDEFINED>" /*, valueType*/;
                if (node.value.isSurroundedBy('"')) {
                    //valueType = 'string';
                    contains = node.value.unwrap();
                } else {
                    //valueType = 'number';
                    contains = parseInt(node.value);
                }

                console.log(contains);
                this.env.id[node.name] = contains;
                break;

            case 'FunctionDeclaration':
                if (node.name !== 'main')
                    break;

                for (const bodyNode of node.body) {
                    this.evaluate(bodyNode);
                }
                break;

            case 'FunctionCall':
                if (node.name !== 'println')
                    break;

                const output = document.getElementById('output');
                const value = node.args[0].isSurroundedBy('"') ?
                    node.args[0].unwrap() :
                    this.env.id[node.args[0]];
                output.innerHTML += value + '\n';
        }
    }

    importStd() {
        const output = document.querySelector("#output");

        this.env.id.println = function(msg) {
            output.innerHTML += msg + "<br>";
        };
    }

}

window.Interpreter = Interpreter;
