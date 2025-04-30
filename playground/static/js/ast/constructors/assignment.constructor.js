export function RTAssignment(targetVar, value) {
    if (targetVar.constant)
        return /*panic(),*/ false;

    return {
        eval: () => { targetVar.value = value; },
        initialization: () => {
            let obj = {
                targetVar: targetVar.declaration(),
                value
            }

            delete obj['targetVar']['type'];
            return obj;
        }
    };
}

window.RTAssignment = RTAssignment;
