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
        let obj = {};
        if (!stream.popEquals("fn")) {
            // TODO: error handling
            return console.error("Invalid function declaration!"), obj;
        }

        if (!stream.peekTypeEquals("ID")) {
            // TODO: error handling
            return console.error("no function name found"), obj;
        }
        
        obj.name = stream.pop();

        if (stream.peekEquals("(")) {
            stream.skip();
            // Parameters
            obj.params = [];
            while (!stream.peekEquals(")")) {
                if (!stream.peekTypeEquals("ID")) {
                    // TODO: error handling
                    return console.error("Invalid parameter!"), obj;
                }
                let param = stream.pop();
                obj.params.push(param);
            }
        }

        stream.skip(); // Skip ")"
        if (stream.peekTypeEquals("ID")) {
            obj.returnType = stream.pop();
        }

        if (stream.peekEquals("{")) {
            stream.skip();
            // Body
            obj.nodes = [];
            while (!stream.peekEquals("}")) {
                console.log("stream: ", stream.tokens);
                let node = window.evaluate(stream);
                obj.nodes.push(node);
            }
            stream.skip(); // Skip "}"
        }

        return obj;
    }
}
