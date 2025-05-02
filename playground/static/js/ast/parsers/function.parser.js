import { RTFuncParameter, RTFunction } from '../constructors/function.constructor.js';

export class ASTFunctionParser {

    constructor(ast, stream) {
        this.stream = stream;
        this.ast   = ast;
    }

    parse() {
        let func = new RTFunction();
        this.parseStructure(func);
        if (!this.next('fn.body'))
            this.parseReturnType(func);

        if (!this.next('fn.body')) {
        }

        func.body = this.parseBody();
        this.ast.push(func);
    }

    parseStructure(func) {
        this.stream.expect('fn');

        if (qrtTypeOf(this.stream.peek()) !== "ID")
            return this.stream.error(Errors.AST.Fn_MissingIdentifier);

        func.name = this.stream.pop();
        this.parseArguments(func);
    }

    parseArguments(func) {
        if (!this.stream.expect('('))
            return this.stream.error(Errors.AST.Fn_MalformedArgs);

        while (!this.stream.next(")")) {
            if (qrtTypeOf(this.stream.peek()) !== 'TYPE'
                && qrtTypeOf(this.stream.peek()) !== 'ID')
                return this.stream.error(Errors.TYPECHECK.Fn_InvalidArgType);

            const type = this.stream.pop();
            if (qrtTypeOf(this.stream.peek()) !== 'ID')
                return this.stream.error(Errors.AST.Fn_InvalidArgName);

            const name = this.stream.pop();
            if (!this.stream.expect(','))
                return this.stream.error(Errors.AST.Fn_MissingArgSeparator);

            func.params.push(new RTFuncParameter(type, name));
        }
    }

    parseReturnType(func) {
        if (qrtTypeOf(this.stream.peek()) === 'TYPE'
                || qrtTypeOf(this.stream.peek()) === 'ID')
        {
            func.returnType = this.stream.pop();
            return true;
        }

        this.stream.skip(); // To match with the brace position
        if (this.stream.peek() === '{')
            return this.stream.error(Errors.TYPECHECK.Fn_InvalidReturnType, 0), null;

        return this.stream.error(Errors.AST.Fn_InvalidBody, 2), null;
    }

    parseBody() {
        if (!this.stream.expect("{"))
            return this.stream.error(Errors.AST.Fn_InvalidBody, 3), null;

        let body = [];

        const parser = new ASTParser(body, this.stream);
        while (!this.stream.next("}")
            && this.stream.remaining() > 0) {
            parser.parse();
        }

        // No leaking '}', consumed due to the next function

        return body;
    }

    next(section) {
        if (section !== 'fn.body')
            return false; // Unknown section

        return this.stream.peek() === '{';
    }

}

window.ASTFunctionParser = ASTFunctionParser;
