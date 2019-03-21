export function filterByEasy(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value < 500 && question.value) {
            return question;
        }
    });
}

export function filterByMedium(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value < 800 && question.value > 300) {
            return question;
        }
    });
}

export function filterByHard(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value > 600) {
            return question;
        }
    });
}

