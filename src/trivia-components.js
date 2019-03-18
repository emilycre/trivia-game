export function getQuestionFromArray(questionArray, currentQuestion) {
    return {
        question: questionArray[currentQuestion].question,
        score: questionArray[currentQuestion].value,
        category: questionArray[currentQuestion].category.title,
        answer: questionArray[currentQuestion].answer
    };
}