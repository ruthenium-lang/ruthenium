import { RTAssignment } from "./assignment.constructor.js";

export function RTVariable(name, value, constant = false) {
    this.type = 'Variable';
    this.name = name;
    this.constant = constant;
    this.value = value ?? new RTValue();

    this.declaration = () => {
        let obj = {
            ...this,
            type: 'VariableDeclaration',
            varType: this.value.valType
        };
        delete obj['declaration'];
        delete obj['value'];
        return obj;
    };

    this.initialization = () => RTAssignment(this, value).initialization();
}

window.RTVariable = RTVariable;
