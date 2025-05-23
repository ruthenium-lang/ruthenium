import { RTFunctionCall } from "../constructors/function.constructor.js";

export class ASTFunctionCallPattern {

    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse()  {
        let callData = new RTFunctionCall(this.stream.cursor());
        if (this.stream.peek(1) !== "(")
            return null; // TODO: error handling

        callData.name = this.stream.pop();
        this.stream.skip(); // Skip the "("
        callData.args = this.parseArgs(this.stream);

        if (this.stream.expect(';'))
            return callData;

        return this.stream.error(Errors.AST.Statement_MissingEnd), callData;
    }

    parseArgs() {
        const args = [];

        while (!this.stream.next(")")) {
            const arg = this.stream.pop();
            args.push(arg);

            if (this.stream.next(","))
                continue;

            if (this.stream.remaining() < 0)
                return this.stream.error(Errors.STREAMS.Unexpected_EOS), args;
        } // Skips the last ) automatically due to the next function

        return args;
    }
}
