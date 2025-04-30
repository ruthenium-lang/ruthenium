export class ASTFunctionCallPattern {

    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse()  {
        let obj = {
            type: "FunctionCall"
        };

        // Check if its a function call (["name", "(", ... args ..., ")"])
        if (this.stream.peek(1) !== "(")
            return null;

        obj.name = this.stream.pop();
        this.stream.skip(); // Skip the "("
        obj.args = this.parseArgs(this.stream);

        if (this.stream.expect(';'))
            return obj;

        return this.stream.error(Errors.AST.Statement_MissingEnd), block;
    }

    parseArgs() {
        const args = [];
        while (!this.stream.next(")")) {
            let arg = this.stream.pop();
            args.push(arg);

            if (this.stream.next(","))
                continue;

            else if (this.stream.peek() === undefined) {
                this.stream.error(Errors.STREAMS.Unexpected_EOS);
                break;
            }
        } // Skips the last ) automatically due to the next function

        return args;
    }
}
