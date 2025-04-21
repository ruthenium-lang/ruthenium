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

        console.log(`Semicolon present: ${this.stream.expect(';')}`); // TODO: remove (console.log)
        // TODO: error handling
        this.stream.expect(';');

        return obj;
    }

    parseArgs(stream) { // TODO: Doesn't need stream
        const args = [];
        // TODO: What if we call a function that returns something?
        //       println(read()) -> println(read() ?
        while (!stream.next(")")) {
            let arg = stream.pop();
            console.log("argument: ", arg); // TODO: remove
            args.push(arg);

            // TODO: Detect things like duplicated commas
            if (stream.next(","))
                continue;

            else if (stream.peek() === undefined) {
                console.warn("Unexpected end of stream"); // TODO:
                break;
            }
        } // Skips the last ) automatically due to the next function

        return args;
    }
}
