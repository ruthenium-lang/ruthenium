import { qrtHasImplicitCast } from "../../tokens/types.js";

export function RTAssignment(cursor, targetVar, value) {
    if (targetVar.constant || targetVar.type === 'Constant') // TODO: raw strings as type can be dangerous
        return /*panic(),*/ false; // TODO: error handling

    if (!qrtHasImplicitCast(targetVar.varType, value.valType))
        return /*panic(),*/ false; // TODO: error handling

    return {
        type: 'AssignmentOperation',
        cursor: cursor,
        eval: () => { targetVar.value = value; },
        initialization: () => {
            let obj = {
                type: 'AssignmentOperation',
                targetVar: targetVar.declaration(),
                value
            }

            delete obj['targetVar']['type'];
            return obj;
        }
    };
}

window.RTAssignment = RTAssignment;
