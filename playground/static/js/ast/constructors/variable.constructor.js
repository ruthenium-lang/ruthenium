import { RTAssignment } from "./assignment.constructor.js";
import { RTValue } from "./value.constructor.js";

export function RTVariable(cursor, name, value, constant = false) {
    this.type = 'Variable';
    this.name = name;
    this.constant = constant; // TODO: move constant to the type
    this.value = value ?? new RTValue();
    this.cursor = cursor;

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

    this.initialization = () => RTAssignment(cursor, this, value);
}

window.RTVariable = RTVariable;
