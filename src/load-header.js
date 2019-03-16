export function makeHeaderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
        <header>
            <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
            <h1>Trivia Game</h1>
        </header>
    `;
    return template.content;
}
const headerContainer = document.getElementById('header-container'); 
export default function loadHeader(){
    const dom = makeHeaderTemplate();
    headerContainer.appendChild(dom);
}