if (!Number.isFinite) {
    Number.isFinite = isFinite;
}

function isNumber(n) {
    if (typeof n === 'string') n = parseFloat(n.trim());
    return typeof n === 'number' && isFinite(n);
}
