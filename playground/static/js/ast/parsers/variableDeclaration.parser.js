import { RTValue } from "../constructors/value.constructor.js";
import { RTVariable } from "../constructors/variable.constructor.js"

export class ASTVariableParser {

    constructor(ast, stream) {
        this.stream = stream;
        this.ast   = ast;
    }

    parse() {
        const cursor = this.stream.cursor();
        const { name, value, varType } = this.parseStructure();
        const variable = new RTVariable(cursor, name, new RTValue(value, varType), false);

        this.ast.push(variable.declaration());
        this.ast.push(variable.initialization());
    }

    parseStructure() {
        let data = {};
        data.varType = '?';

        this.stream.expect('let');

        if (qrtTypeOf(this.stream.peek()) !== 'ID')
            return this.stream.error(Errors.AST.Let_MissingIdentifier), data;

        data.name = this.stream.pop();
        if (this.stream.next(';'))
            return data;

        // Type declaration
        if (this.stream.next(':')) {
            if (qrtTypeOf(this.stream.peek()) !== 'TYPE')
                return this.stream.error(Errors.TYPECHECK.Let_InvalidType), data;

            data.varType = this.stream.pop();
        }

        // Initialization
        if (this.stream.next("="))
            data.value = this.stream.pop();

        if (!this.stream.expect(';'))
            return this.stream.error(Errors.AST.Statement_MissingEnd), data;

        return data;
    }

}

window.ASTVariableParser = ASTVariableParser;
