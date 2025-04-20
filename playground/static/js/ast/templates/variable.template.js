window.ASTVariableTemplate = class {

    fill(stream) {
        let obj = {};

        if (stream.pop() !== "let") {
            // TODO: error handling
            return console.error("Invalid variable declaration!"), obj;
        }

        if (!stream.peekTypeEquals("ID")) {
            // TODO: error handling
            return console.error("no variable name found"), obj;
        }

        obj.name = stream.pop();

        if (stream.peek() === ";") {
            // End
            return obj;
        }

        if (stream.peek() === ":") {
            stream.skip();
            // Type declaration
            if (!stream.peekTypeEquals("TYPE")) {
                // TODO: error handling
                return console.error("Invalid type declaration!"), obj;
            }

            obj.varType = stream.pop();
        }

        if (stream.peek() === "=") {
            stream.skip();
            // Initialization
            if (!stream.peekTypeEquals(["NUM_LITERAL", "STR_LITERAL"])) {
                // TODO: error handling
                return console.error("Invalid initialization!"), obj;
            }

            obj.value = stream.pop();
        }


        return obj;
    }

};

