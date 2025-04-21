export class ASTFunctionTemplate {

    fill(stream) {
        let obj = { params: [] };
        if (!stream.expect('fn'))
            return stream.error(Errors.AST.Fn_MalformedDeclaration);

        if (!stream.peekTypeEquals("ID"))
            return stream.error(Errors.AST.Fn_MissingIdentifier);

        obj.name = stream.pop();
        if (!stream.expect('('))
            return stream.error(Errors.AST.Fn_MalformedArgs);

        while (!stream.next(")")) {
            if (!stream.peekTypeEquals(["TYPE", "ID"]))
                return stream.error(Errors.TYPECHECK.Fn_InvalidArgType);

            const name = stream.pop();
            if (!stream.peekTypeEquals("ID"))
                return stream.error(Errors.AST.Fn_InvalidArgName);

            const value = stream.pop();
            if (!stream.expect(','))
                return stream.error(Errors.AST.Fn_MissingArgSeparator);

            obj.params.push({ name: name, value: value });
        }

        if (stream.peekTypeEquals("ID"))
            obj.returnType = stream.pop();

        return obj;
    }

};

window.ASTFunctionTemplate = ASTFunctionTemplate;
