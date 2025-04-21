export class ASTVariableTemplate {

    fill(stream) {
        let obj = {};

        if (!stream.expect('let'))
            return stream.error(Errors.AST.Let_MalformedDeclaration);

        if (!stream.peekTypeEquals('ID'))
            return stream.error(Errors.AST.Let_MissingIdentifier);

        obj.name = stream.pop();
        if (stream.next(';'))
            return obj;

        // Type declaration
        if (stream.next(':')) {
            if (!stream.peekTypeEquals("TYPE"))
                return stream.error(Errors.TYPECHECK.Let_InvalidType);

            obj.varType = stream.pop();
        }

        // Initialization
        // TODO: We need mandatory a type for the variable so we need to detect it
        if (stream.next("="))
            obj.value = stream.pop();

        if (!stream.expect(';'))
            return stream.error(Errors.AST.Statement_MissingEnd);

        return obj;
    }

};

window.ASTVariableTemplate = ASTVariableTemplate;
