window.ASTTemplate = class {

    constructor(template) {
        this.parts = template.split(" ");
    }

    fill(tokens) {
        const length = Math.min(this.parts.length, tokens.length);
        let obj = {};
        
        for (let i = 0; i < length; i++) {
            const token = tokens[i];
            const part  = this.parts[i];
            if (token.toUpperCase() !== part.toUpperCase())
                obj[part] = token;
        }

        return obj;
    }
    
}
