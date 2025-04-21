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

        if (this.stream.peek() !== '{') {
            if (!this.stream.peekTypeEquals(["ID", "TYPE"])) {
                if (this.stream.peek(1) === '{') {
                    return this.stream.error(
                        Errors.TYPECHECK.NotIDTYPE_ReturnType,
                        "Don't use keywords or undefined types" // Suggestion
                    ), null;
                }

                return this.stream.error(
                    Errors.PARSER.Invalid_FuncBody,
                    "Insert a open brace" // Suggestion
                ), null;
            }


            block.returnType = this.stream.pop();
        }

        block.body = this.parseBody();
        this.tree.push(block);
    }

    parseBody() {
        let body = [];
        if (!this.stream.expect("{"))
            return this.stream.error(
                Errors.PARSER.Invalid_FuncBody,
                "Insert a open brace" // Suggestion
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
