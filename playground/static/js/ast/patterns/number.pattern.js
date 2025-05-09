class NumPattern {

    static test(str) {
        return !isNaN(str);
    }

    static inferType(str) {
        if (!this.test(str))
            return undefined; // Any

        const types = [
            { name: 'float', test: (n) => (parseFloat(n) - parseInt(n)) !== 0 },
            { name: 'int', test: (n) => parseInt(n) < 0 },
            { name: 'uint', test: (_) => true },
        ];

        for (const t of types) {
            if (t.test(str))
                return t.name;
        }
    }

}

window.NumPattern = NumPattern;
