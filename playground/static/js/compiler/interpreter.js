class Interpreter {

    constructor(objTree) {
        this.objTree = objTree; // TODO: objTree -> tree
        this.stack = [];        // TODO: stack -> env.stack

        // Necessary to define the environment of the
        // Ruthenium Virtual Machine (RVM)
        this.env = {
            id: {}
        };
    }

    run() {
        // TODO: node -> statement
        for (const node of this.objTree) {
            this.executeNode(node); // TODO: Refactor to evaluate
        }
    }

    // TODO: Add process function
    //       trust me, its gonna change everything

    executeNode(node) {
        switch (node.type) {
            case 'VariableDeclaration':
                if (node.value) {
                    // TODO: Assuming int?? This should change ASAP
                    this.env.id[node.name] = parseInt(node.value);
                }
                break;
            case 'FunctionDeclaration':
                if (node.name === 'main') {
                    for (const bodyNode of node.body) {
                        this.executeNode(bodyNode);
                    }
                }
                break;
            case 'FunctionCall':
                // TODO: importStd()
                if (node.name === 'println') {
                    const output = document.getElementById('output');
                    const value = node.args[0].startsWith('"') ?
                        node.args[0].slice(1, -1) :
                        this.env.id[node.args[0]];
                    output.innerHTML += value + '\n';
                }
                break;
        }
    }
}

window.Interpreter = Interpreter;
