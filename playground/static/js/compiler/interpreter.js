class Interpreter {

    constructor(objTree) {
        this.objTree = objTree; // TODO: objTree -> tree
        this.stack = [];        // TODO: stack -> env.stack
        this.variables = {};    // TODO: variables -> env.id

        // Necessary to define the environment of the
        // Ruthenium Virtual Machine (RVM)
        this.env = {};
    }

    run() {
        for (const node of this.objTree) {
            this.executeNode(node);
        }
    }

    // TODO: Add process function
    //       trust me, its gonna change everything

    executeNode(node) {
        switch (node.type) {
            case 'VariableDeclaration':
                if (node.value) {
                    this.variables[node.name] = parseInt(node.value);
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
                if (node.name === 'println') {
                    const output = document.getElementById('output');
                    const value = node.args[0].startsWith('"') ?
                        node.args[0].slice(1, -1) :
                        this.variables[node.args[0]];
                    output.innerHTML += value + '\n';
                }
                break;
        }
    }
}

window.Interpreter = Interpreter;
