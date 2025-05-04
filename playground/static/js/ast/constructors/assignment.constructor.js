import { qrtHasImplicitCast } from "../../tokens/types.js";

export function RTAssignment(cursor, targetVar, value) {
    if (targetVar.constant || targetVar.type === 'Constant')
        return /*panic(),*/ false;

    if (!qrtHasImplicitCast(targetVar.varType, value.valType))
        return /*panic(),*/ false;

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
