export class NumberType {

    static detect(n) {
        if (!isNumber(n))
            return console.trace(), undefined;

        n = parseFloat(n); // String to number
        const n_bits = Math.floor(Math.log2(Math.abs(n)));
        const n_dec = n % 1 !== 0;

        if (n_dec)
            return n_bits <= 32 ? 'float' : 'double';

        const sign = n < 0 ? '' : 'u';
        return sign + this.detectByBits(n_bits);
    }

    static detectByBits(n_bits) {
        // Types classified in logarithmic order (8, 16, 32...)
        const types = ['byte', 'short', 'int', 'long'];

        // 8 -> 3, 16 -> 4, 32 -> 5...
        let i = Math.log2(n_bits);

        // Ceil: Truncates the decimales to the next integer number
        // Example: 3.1 -> 4
        // This is because log2(33) is 5.044068
        // But we cannot store 5.04 bits in 5 bits
        // So we need to round up to 6 bits (1 byte)
        i = Math.ceil(i);

        // Types in computers usually start from 8 bits
        // So we need to shift the index by 3
        i = Math.max(i - 3, 0);

        return types[i] || 'bigint';
    }

}

window.NumberType = NumberType;
