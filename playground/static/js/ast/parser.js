export class ASTParser {

    constructor(stream) {
        this.stream = stream;
        this.tree   = [];

        this.funcParser = new ASTFunctionParser(this.tree, stream);
        //this.varParser  = new ASTVariableParser(this.tree, stream);
    }

    parse() {
        while (this.stream.peek()) {
            const token = this.stream.peek();

            // Match a function
            if (token === 'fn') {
                this.funcParser.parse();
            }

            // Match a variable
            else if (token === 'let') {
                const variable = new ASTVariableTemplate().fill(this.stream);
                this.tree.push({ type: "VariableDeclaration", ...variable });
            }

            // Unknown token, skip
            else {
                console.warn("Unknown construct:", token);
                this.stream.skip();
            }

        }

        return this.tree;
    }
}

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
        if (this.stream.peek() !== "{") {
            // TODO: error handling
            return console.error("Expected a valid return type"), block;
        }

        console.log(this.stream.remaining());
        while (this.stream.peek() !== "}"
            && this.stream.remaining() >= 1)
        {
            console.log("hola");
            const parser = new ASTParser(this.stream);
            body = parser.parse();
            console.log(body);
        }

        return body;
    }

}

window.ASTParser = ASTParser;
