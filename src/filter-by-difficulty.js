export function filterForEasy(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value < 400 && question.value) {
            return question;
        }
    });
}

export function filterForMedium(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value < 800 && question.value > 300) {
            return question;
        }
    });
}

export function filterForHard(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value > 700) {
            return question;
        }
    });
}

