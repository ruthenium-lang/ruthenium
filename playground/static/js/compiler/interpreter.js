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
                // TODO: importStd()
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
}

window.Interpreter = Interpreter;
