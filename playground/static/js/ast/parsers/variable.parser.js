export class ASTVariableParser {

    constructor(tree, stream) {
        this.stream = stream;
        this.tree   = tree;
    }

    parse() {
        const variable = new ASTVariableTemplate().fill(this.stream);
        this.tree.push({ type: "VariableDeclaration", ...variable });
    }

}

window.ASTVariableParser = ASTVariableParser;
