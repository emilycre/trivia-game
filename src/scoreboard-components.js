export function makeHighScoreRow(scoreEntry, entryRank) {
    const html = /*html*/ `
    <tr>
        <td>${entryRank}.</td>
        <td>${scoreEntry.name}</td>
        <td>${scoreEntry.highScore}</td>
    </tr>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
} 

export default function loadHighScores(scoreArray) {
    for(let i = 0; i < 10; i++) {
        const entryRank = i + 1;
        const dom = makeHighScoreRow(scoreArray[i], entryRank);
        const tableBody = document.getElementById('score-table-body');
        tableBody.appendChild(dom);
    }
}