export class NameChecker {

    static test(str) {
        const regex = /^[A-Za-z_][A-Za-z0-9_]*$/;
        return regex.test(str);
    }

}

window.NameChecker = NameChecker;
