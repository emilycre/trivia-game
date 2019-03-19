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
        return (!question.answer.includes('-') && !question.answer.includes('(') && !question.answer.includes('%') && !question.answer.includes('<') && !question.answer.includes('&') && !question.answer.includes('/') && !question.answer.includes('"') && !question.answer.includes('\''));
    });
    return filterByAnswer;
}

export function removeCharacters(inputString) {
    if(inputString.indexOf('A ') === 0) {
        return inputString.replace('A ', '');
    }
    else if(inputString.indexOf('THE ') === 0) {
        return inputString.replace('THE ', '');
    }
    else if(inputString.indexOf('AN ') === 0) {
        return inputString.replace('AN ', '');
    }
    else {
        return inputString;
    }
}