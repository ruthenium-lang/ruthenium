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
                return console.error("Invalid parameter type!"), obj;
            }
            const name = stream.pop();
            if (!stream.peekTypeEquals("ID")) {
                // TODO: error handling
                return console.error("Invalid parameter name!"), obj;
            }
            const value = stream.pop();
            if (stream.peekEquals(",")) {
                stream.skip(); // Skip ","
            }

            obj.params.push({ name: name, value: value });
        }

        stream.skip(); // Skip ")"
        if (stream.peekTypeEquals("ID")) {
            obj.returnType = stream.pop();
        }

        return obj;
    }
}
