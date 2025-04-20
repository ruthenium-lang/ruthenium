export class ASTFunctionTemplate {

    fill(stream) {
        let obj = { params: [] };
        if (!stream.pop() === "fn") {
            // TODO: error handling
            return console.error("Invalid function declaration!"), obj;
        }

        if (!stream.peekTypeEquals("ID")) {
            // TODO: error handling
            return console.error("no function name found"), obj;
        }

        obj.name = stream.pop();

        if (!stream.pop() === "(") {
            // TODO: error handling
            return console.error("no function name found"), obj;
        }

        while (!stream.next(")")) {
            if (!stream.peekTypeEquals(["TYPE", "ID"])) {
                // TODO: error handling
                return console.error("Invalid parameter type!"), obj;
            }
            const name = stream.pop();
            if (!stream.peekTypeEquals("ID")) {
                // TODO: error handling
                return console.error("Invalid parameter name!"), obj;
            }
            const value = stream.pop();
            if (!stream.expect(',')) {
                // TODO: error handling
                return console.error(`Expected ',' but found '${stream.back()}'`), obj;
            }

            obj.params.push({ name: name, value: value });
        }

        if (stream.peekTypeEquals("ID")) {
            obj.returnType = stream.pop();
        }

        return obj;
    }

};

window.ASTFunctionTemplate = ASTFunctionTemplate;
