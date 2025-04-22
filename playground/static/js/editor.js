const playgroundDOM = document.querySelector("#playground");

playgroundDOM.addEventListener('mousedown', () => {
    playgroundDOM.classList.add('focused');
});

document.addEventListener('mousedown', (e) => {
    if (playgroundDOM.contains(e.target))
        return;

    playgroundDOM.classList.remove('focused');
});


function setupEditor() {
    playgroundDOM.innerHTML = `fn main() {
    let a: uint;
    println("Hello World!");
}\n`;

    window.editor = ace.edit("playground");
    editor.setTheme("ace/theme/merbivore_soft");
    editor.session.setMode("ace/mode/rust");

    editor.setOption("fontFamily", "'Hermit'");
    editor.setOption("fontSize", 18);

    playgroundDOM.style.lineHeight = "26px";
    window.aceContentDOM = document.querySelector(".ace_content");
    editor.getContent = () => aceContentDOM.innerText;
}

