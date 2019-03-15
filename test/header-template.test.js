const test = QUnit.test;

QUnit.module('header');

function makeHeaderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
        <header>
            <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
            <h1>Trivia Game</h1>
        </header>
    `;
    return template.content;
}

test('make header template', function(assert) {
    const expected = `
        <header>
            <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
            <h1>Trivia Game</h1>
        </header>
    `;
    const result = makeHeaderTemplate();

    assert.htmlEqual(result, expected);
});
