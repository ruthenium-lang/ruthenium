export class ASTFunctionParser {

    constructor(tree, stream) {
        this.stream = stream;
        this.tree = tree;
    }

    parseStructure() {
        let obj = {
            type: "FunctionDeclaration",
            params: [],
            returnType: "void",
            body: []
        };

        this.stream.expect('fn');

        if (!this.stream.peekTypeEquals("ID"))
            return this.stream.error(Errors.AST.Fn_MissingIdentifier);

        obj.name = this.stream.pop();
        if (!this.stream.expect('('))
            return this.stream.error(Errors.AST.Fn_MalformedArgs);

        while (!this.stream.next(")")) {
            if (!this.stream.peekTypeEquals(["TYPE", "ID"]))
                return this.stream.error(Errors.TYPECHECK.Fn_InvalidArgType);

            const name = this.stream.pop();
            if (!this.stream.peekTypeEquals("ID"))
                return this.stream.error(Errors.AST.Fn_InvalidArgName);

            const value = this.stream.pop();
            if (!this.stream.expect(','))
                return this.stream.error(Errors.AST.Fn_MissingArgSeparator);

            obj.params.push({ name: name, value: value });
        }

        if (this.stream.peekTypeEquals("ID"))
            obj.returnType = this.stream.pop();

        return obj;
    }

    parse() {
        let block = this.parseStructure();

        if (this.stream.peek() === '{') {
            block.body = this.parseBody();
            this.tree.push(block);
            return;
        }

        if (!this.stream.peekTypeEquals(["ID", "TYPE"])) {
            if (this.stream.peek(1) !== '{')
                return this.stream.error(Errors.AST.Fn_InvalidBody, 3), null;

            return this.stream.error(Errors.TYPECHECK.Fn_InvalidReturnType, 3), null;
        }

        block.returnType = this.stream.pop();

        if (this.stream.peek() === '{') {
            block.body = this.parseBody();
            this.tree.push(block);
            return;
        }
    }

    parseBody() {
        let body = [];
        if (!this.stream.expect("{"))
            return this.stream.error(Errors.AST.Fn_InvalidBody, 3), null;

        while (!this.stream.next("}")
            && this.stream.remaining() > 0) {
            const parser = new ASTParser(this.stream);
            body.push(...parser.parse());
        }

        // No leaking '}', consumed due to the next function

        return body;
    }

}

window.ASTFunctionParser = ASTFunctionParser;
