export class TypePattern {

    static test(str) {
        const types = [
            'void', 'float', 'double',
            'ulong', 'long',
            'uint', 'int',
            'ushort', 'short',
            'ubyte', 'byte'
        ];

        return types.indexOf(str) !== -1;
    }

}

window.TypePattern = TypePattern;
