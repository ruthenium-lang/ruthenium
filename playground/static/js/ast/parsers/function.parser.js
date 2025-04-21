export class ASTFunctionParser {

    constructor(tree, stream) {
        this.stream = stream;
        this.tree   = tree;
    }

    parse() {
        const fn = new ASTFunctionTemplate().fill(this.stream);
        let block = {
            type: "FunctionDeclaration",
            returnType: "void",
            body: [],
            ...fn
        };

        if (this.stream.peek() === '{') {
            block.body = this.parseBody();
            this.tree.push(block);
            return this.tree;
        }

        if (!this.stream.peekTypeEquals(["ID", "TYPE"])) {
            if (this.stream.peek(1) !== '{')
                return this.stream.error(Errors.AST.Fn_InvalidBody, 2), null;

            return this.stream.error(Errors.TYPECHECK.Fn_InvalidReturnType), null;
        }

        block.returnType = this.stream.pop();
        return this.tree;
    }

    parseBody() {
        let body = [];
        if (!this.stream.expect("{"))
            return this.stream.error(Errors.AST.Fn_InvalidBody, 2), null;

        while (!this.stream.next("}")
            && this.stream.remaining() > 0)
        {
            const parser = new ASTParser(this.stream);
            body.push(...parser.parse());
        }

        // No leaking '}', consumed due to the next function

        return body;
    }

}

window.ASTFunctionParser = ASTFunctionParser;
