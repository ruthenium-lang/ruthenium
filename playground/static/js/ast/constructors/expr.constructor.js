export function RTExpression(cursor, content) {
    this.type = 'Expression';
    this.cursor = cursor;
    this.content = content;
}

window.RTExpression = RTExpression;
