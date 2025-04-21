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

        if (this.stream.peek() !== "{") {
            if (!this.stream.peekTypeEquals(["ID", "TYPE"]))
                return this.stream.error(
                    Errors.AST.Invalid_ReturnType,
                    "Don't use keywords or undefined types" // Custom message
                ), null;


            block.returnType = this.stream.pop();
        }

        block.body = this.parseBody();
        this.tree.push(block);
    }

    parseBody() {
        let body = [];
        if (!this.stream.expect("{"))
            return this.stream.error(
                Errors.AST.Invalid_FuncBody,
                "Insert a open brace" // Custom message
            ), null;

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
