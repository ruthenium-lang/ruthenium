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

        if (this.stream.peek() !== "(")
            return this.stream.error(Errors.AST.Fn_InvalidCall), block;

        block.arguments = this.parseArguments();
        this.tree.push(block);
    }

    parseArguments() {
        let args = [];
        if (!this.stream.expect("("))
            return this.stream.error(Errors.AST.Fn_InvalidCall), block;

        while (this.stream.next(")")
            && this.stream.remaining() >= 1)
        {
            const parser = new ASTParser(this.stream);
            args.push(parser.parse());
            stream.expect(",");
        }

        return args;
    }

}

window.ASTFunctionCallParser = ASTFunctionCallParser;
