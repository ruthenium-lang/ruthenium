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

window.RTFunction = RTFunction;
window.RTFuncParameter = RTFuncParameter;
