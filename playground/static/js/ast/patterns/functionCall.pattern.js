export class ASTFunctionCallPattern {
    constructor(stream) {
        this.stream = stream;
    }

    checkAndParse()  {
        let obj = {
            type: "FunctionCall"
        }

        console.log(this.stream.peek());

        
        // Check if its a function call (["name", "(", ... args ..., ")"])
        if (this.stream.peek(1) !== "(")
            return null;

        
        obj.name = this.stream.pop();
        this.stream.skip(); // Skip the "("
        console.log(this.stream.peek()); // TODO: remove
        obj.args = this.parseArgs(this.stream);
        
        return obj;
    }

    parseArgs(stream) {
        const args = [];
        while (!stream.next(")")) {
            let arg = stream.pop();
            console.log(arg); // TODO: remove
            args.push(arg);
            
            stream.expect(","); // TODO: error handling
            
            if (stream.peek() === ")")
                break;
            
        } // Skips the last ) automatically due to the next function
        return args;
    }
}