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

        // TODO: error handling
        this.stream.expect(';');

        return obj;
    }

    parseArgs() {
        const args = [];
        // TODO: What if we call a function that returns something?
        //       println(read()) -> println(read() ?
        while (!this.stream.next(")")) {
            let arg = this.stream.pop();
            args.push(arg);

            // TODO: Detect things like duplicated commas
            if (this.stream.next(","))
                continue;

            else if (this.stream.peek() === undefined) {
                console.warn("Unexpected end of stream"); // TODO: Issue (#18): Streams with warnings
                break;
            }
        } // Skips the last ) automatically due to the next function

        return args;
    }
}
