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
        if (this.stream.peek(1) == "(") {
            obj.name = this.stream.pop();
            this.stream.skip(); // Skip the "("
            console.log(this.stream.peek());
            obj.args = this.parseArgs(this.stream);
            this.stream.skip(); // Skip the ")"
            return obj;
        } else {
            return null;
        }
    }

    parseArgs(stream) {
        const args = [];
        while (stream.peek() !== ")") {
            let arg = stream.pop();
            console.log(arg);
            args.push(arg);
            if (stream.peek() === ",") {
                stream.skip();
            }
            if (stream.peek() === ")") {
                break;
            }
        }
        return args;
    }
}