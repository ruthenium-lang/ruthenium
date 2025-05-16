import { qrtHasImplicitCast } from "../../playground/static/js/tokens/types.js";

export function RTAssignment(cursor, targetVar, value) {
    if (targetVar.constant || targetVar.type === 'Constant') // TODO: raw strings as type can be dangerous
        return /*panic(),*/ false; // TODO: error handling

    if (!qrtHasImplicitCast(targetVar.varType, value.valType))
        return /*panic(),*/ false; // TODO: error handling

    return {
        type: 'AssignmentOperation',
        targetVar: targetVar.declaration(),
        cursor: cursor,
        eval: () => { targetVar.value = value; },
        value,
    };
}

window.RTAssignment = RTAssignment;
