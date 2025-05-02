export function RTAssignment(targetVar, value) {
    if (targetVar.constant)
        return /*panic(),*/ false;

    if (targetVar.varType !== value.valType) // TODO: qrtHasImplicitCast
        return /*panic(),*/ false;

    return {
        type: 'AssignmentOperation',
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
