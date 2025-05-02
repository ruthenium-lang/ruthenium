export function RTFunction() {
    this.type = 'FunctionDeclaration';
    this.params = [];
    this.body = [];
    this.name = undefined;
    this.returnType = 'void';
}

export function RTFuncParameter(type, name) {
    this.type = type;
    this.name = name;
}

export function RTFunctionCall() {
    this.type = 'FunctionCall';
    this.target = undefined;
    this.args = [];
    this.evalReturnType = true;
}

window.RTFunction = RTFunction;
window.RTFuncParameter = RTFuncParameter;
window.RTFunctionCall = RTFunctionCall;
