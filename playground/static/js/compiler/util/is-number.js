if (!Number.isFinite)
    Number.isFinite = isFinite;

String.prototype.hasSpaces = function() {
    return this.trim() !== this;
}

String.prototype.isBlank = function() {
    return this.trim() === '';
}

function isNumber(n) {
    if (typeof n === 'string') {
        if (n.hasSpaces() || n.isBlank())
            return false;
        n = +n;
    }

    return typeof n === 'number' && Number.isFinite(n);
}
