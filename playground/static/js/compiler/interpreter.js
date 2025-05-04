import { qrtToLiteral } from "../tokens/types.js";

class Interpreter {

    constructor(tree) {
        this.tree = tree;
        this.scopes = [];

        // Initialize global scope
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
                    //valueType = 'string';
                    contains = statement.value.unwrap();
                } else {
                    //valueType = 'number';
                    contains = parseInt(statement.value);
                }

                console.log(contains);
                this.global.id[statement.name] = contains;
                break;

            case 'FunctionDeclaration':
                if (statement.name !== 'main')
                    break;

                this.scopes.push({});
                for (const bodyNode of statement.body) {
                    this.evaluate(bodyNode);
                }
                this.scopes.pop();
                break;

            case 'FunctionCall':
                const func = this.global.id[statement.name];
                if (func === undefined)
                    return false; // TODO: error handling
                func(this, statement.args);
        }
    }

    importStd() {
        const output = document.querySelector("#output");
        this.global.id.println = function(vm, args) {
            try {
                let msg = "qRTError ) This message is an error, if you see it report it at GitHub";
                if (args[0].isSurroundedBy('"'))
                    msg = args[0].unwrap();
                else if (!isNaN(args[0]))
                    msg = parseInt(args[0]);
                else msg = vm.global.id[args[0]];

                output.innerHTML += msg + "<br>";
            } catch (e) {
                console.error(`rvm::RuntimeException @ println(...) -> ${e}`);
                console.trace();
            }
        };
    }

}

window.Interpreter = Interpreter;
