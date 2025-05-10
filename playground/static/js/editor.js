const playgroundDOM = document.querySelector("#playground");

function setupEditor() {
    playgroundDOM.innerHTML = `fn main() {
    let a: uint;
    println("Hello World!");
}\n`;

    window.editor = ace.edit("playground");
    editor.setTheme("ace/theme/merbivore_soft");
    editor.session.setMode("ace/mode/rust");

    editor.setOption("fontFamily", "'Fira Code'");
    editor.setOption("fontSize", 17);
    playgroundDOM.style.lineHeight = "1.66";

    window.aceContentDOM = document.querySelector(".ace_content");
    editor.getContent = () => aceContentDOM.innerText;
}

