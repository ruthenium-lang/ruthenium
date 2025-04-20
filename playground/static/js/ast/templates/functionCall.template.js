export class ASTFunctionCallTemplate {

    fill(stream) {
        let obj = {
            type: "FunctionCall",
            arguments: [],
            name: null
        };

        if (!stream.peekTypeEquals("ID")) {
            // TODO: error handling
            return console.error("no function name found"), obj;
        }

        obj.name = stream.pop();

        if (stream.peek() !== "(") {
            // TODO: error handling
            return console.error("no opening parenthesis found"), obj;
        }
        stream.pop(); // consume (
        
        while (stream.peek() !== ")") {
            obj.arguments.push(stream.pop());
        }
        stream.pop(); // consume )

        return obj;
    }

}
