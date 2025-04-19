const playgroundDOM = document.querySelector("#playground");

function setupEditor() {
    const editor = ace.edit("playground");
    editor.setTheme("ace/theme/merbivore_soft");
    editor.session.setMode("ace/mode/rust");

    editor.setOption("fontFamily", "'JetBrainsMono Nerd Font Mono'");
    editor.setOption("fontSize", 18);

    playgroundDOM.style.lineHeight = "26px";


    window.aceContentDOM = document.querySelector(".ace_content");
    editor.getContent = () => aceContentDOM.innerText;
    return editor;
}

