export class ASTFunctionCallParser {

    constructor(ast, stream) {
        this.stream = stream;
        this.ast   = ast;
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
        this.ast.push(block);
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
