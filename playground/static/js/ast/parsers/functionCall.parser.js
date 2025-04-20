export class ASTFunctionCallParser {

    constructor(tree, stream) {
        this.stream = stream;
        this.tree   = tree;
    }

    parse() {
        const fn = new ASTFunctionCallTemplate().fill(this.stream);
        let block = {
            type: "FunctionCall",
            arguments: [],
            ...fn
        };

        if (this.stream.peek() !== "(") {
            // TODO: error handling
            return console.error("Expected opening parenthesis for function call"), block;
        }

        block.arguments = this.parseArguments();
        this.tree.push(block);
    }

    parseArguments() {
        let args = [];
        if (this.stream.peek() !== "(") {
            // TODO: error handling
            return console.error("Expected opening parenthesis"), args;
        }

        this.stream.pop(); // consume (

        while (this.stream.peek() !== ")"
            && this.stream.remaining() >= 1)
        {
            const parser = new ASTParser(this.stream);
            args.push(parser.parse());

            if (this.stream.peek() === ",") {
                this.stream.pop(); // consume comma
            }
        }

        this.stream.pop(); // consume )

        return args;
    }

}

window.ASTFunctionCallParser = ASTFunctionCallParser;