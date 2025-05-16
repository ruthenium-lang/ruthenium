export function RTFunction(cursor) {
    this.type = 'FunctionDeclaration';
    this.params = [];
    this.cursor = cursor;
    this.body = [];
    this.name = undefined;
    this.returnType = 'void'; // TODO: Use TokenTypes.VOID
}

export function RTFuncParameter(type, name) {
    this.type = type;
    this.name = name;
}

export function RTFunctionCall(cursor) {
    this.type = 'FunctionCall';
    this.target = undefined;
    this.cursor = cursor;
    this.args = [];
    this.evalReturnType = true;
}

window.RTFunction = RTFunction;
window.RTFuncParameter = RTFuncParameter;
window.RTFunctionCall = RTFunctionCall;
