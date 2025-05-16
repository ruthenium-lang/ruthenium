import { NameChecker } from '../ast/checkers/name.checker.js';

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
                const func = this.global.id[statement.name];
                if (func === undefined)
                    return false; // TODO: error handling

                func(this, statement.args);
        }
    }

    importStd() {
        const stdout = document.querySelector("#output");

        function parseArguments(vm, args) {
            return args.map(arg => {
                if (arg.isSurroundedBy('"')) return arg.unwrap();
                if (isNumber(arg))           return +arg;
                if (NameChecker.test(arg))   return vm.global.id[arg]; });
        }

        this.global.id.println = function(vm, args) {
            stdout.innerHTML += parseArguments(vm, args).join(' ') + "<br />";
        };
    }

}

window.Interpreter = Interpreter;
