import { RTAssignment } from "./assignment.constructor.js";
import { RTValue } from "./value.constructor.js";

export function RTVariable(cursor, name, value, constant = false) {
    this.type = 'Variable';
    this.name = name;
    this.constant = constant; // TODO: move constant to the type
    this.value = value ?? RTValue.empty();
    this.cursor = cursor;

    this.declaration = () => new RTVariableDeclaration(cursor, this.name, value.valType);
    this.initialization = () => RTAssignment(cursor, this, value);
}

export function RTVariableDeclaration(cursor, name, varType) {
    this.type = 'VariableDeclaration';
    this.name = name;
    this.varType = varType;
    this.constant = false; // TODO: remove
    this.cursor = cursor;

    this.toVariable = () => new RTVariable(this.cursor, this.name, RTValue.empty(), this.constant);
}

window.RTVariable = RTVariable;
window.RTVariableDeclaration = RTVariableDeclaration;
