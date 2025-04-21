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
            if (!this.stream.peekTypeEquals(["ID", "TYPE"])) {
                // TODO: error handling
                return console.error("Expected a valid return type"), block;
            }

            block.returnType = this.stream.pop();
        }

        block.body = this.parseBody();
        this.tree.push(block);
    }

    parseBody() {
        let body = [];
        if (!this.stream.expect("{")) {
            // TODO: error handling
            return console.error("Expected a valid return type"), block;
        }

        while (!this.stream.next("}")
            && this.stream.remaining() >= 1) // TODO: >= 1 == > 0 +readability
        {
            const parser = new ASTParser(this.stream);
            body = parser.parse();
        }

        // No leaking '}', consumed due to the next function

        return body;
    }

}

window.ASTFunctionParser = ASTFunctionParser;
