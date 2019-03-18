export function getQuestionFromArray(questionArray, currentQuestion) {
    return {
        question: questionArray[currentQuestion].question,
        score: questionArray[currentQuestion].value,
        category: questionArray[currentQuestion].category.title,
        answer: questionArray[currentQuestion].answer
    };
}

export function filterQuestions(fetchedQuestions) {
    const filterByValue = fetchedQuestions.filter(question => {
        return question.value;
    });
    const filterByAnswer = filterByValue.filter(question => {
        return (!question.answer.includes('-') && !question.answer.includes('(') && !question.answer.includes('%') && !question.answer.includes('<'));
    });
    return filterByAnswer;
}