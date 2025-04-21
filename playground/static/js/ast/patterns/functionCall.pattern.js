export class ASTFunctionCallPattern {
    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse()  {
        let obj = {
            type: "FunctionCall"
        }
        
        // Check if its a function call (["name", "(", ... args ..., ")"])
        if (this.stream.peek(1) !== "(")
            return null;
        
        obj.name = this.stream.pop();
        this.stream.skip(); // Skip the "("
        obj.args = this.parseArgs(this.stream);
        
        return obj;
    }

    parseArgs(stream) {
        const args = [];
        while (stream.peek() !== ")") {
            let arg = stream.pop();
            console.log("argument: ", arg); // TODO: remove
            args.push(arg);
            
            if (stream.peek() === ",") {
                stream.skip();
                continue;
            } // TODO: error handling
            
            if (stream.peek() === ")")
                break;
            else if (stream.peek() === undefined) {
                console.warn("Unexpected end of stream");
                break;
            }
        } // Skips the last ) automatically due to the next function
        return args;
    }
}