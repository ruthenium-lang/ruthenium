window.ASTVariableTemplate = class {

    fill(stream) {
        let obj = {};

        if (!stream.popEquals("let")) {
            // TODO: error handling
            return console.error("Invalid variable declaration!"), obj;
        }

        if (!stream.peekTypeEquals("ID")) {
            // TODO: error handling
            return console.error("no variable name found"), obj;
        }

        obj.name = stream.pop();

        if (stream.peekEquals(";")) {
            // End
            return obj;
        }

        if (stream.peekEquals(":")) {
            stream.skip();
            // Type declaration
            if (!stream.peekTypeEquals("TYPE")) {
                // TODO: error handling
                return console.error("Invalid type declaration!"), obj;
            }

            obj.type = stream.pop();
        }

        if (stream.peekEquals("=")) {
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

window.ASTFunctionTemplate = class {
    fill(stream) {
        let obj = { params: [] };
        if (!stream.popEquals("fn")) {
            // TODO: error handling
            return console.error("Invalid function declaration!"), obj;
        }

        if (!stream.peekTypeEquals("ID")) {
            // TODO: error handling
            return console.error("no function name found"), obj;
        }

        obj.name = stream.pop();

        if (!stream.popEquals("(")) {
            // TODO: error handling
            return console.error("no function name found"), obj;
        }

        while (!stream.peekEquals(")")) {
            if (!stream.peekTypeEquals(["TYPE", "ID"])) {
                // TODO: error handling
                return console.error("Invalid parameter!"), obj;
            }
            const param = stream.pop();
            obj.params.push(param);
        }

        stream.skip(); // Skip ")"
        if (stream.peekTypeEquals("ID")) {
            obj.returnType = stream.pop();
        }

        return obj;
    }
}
