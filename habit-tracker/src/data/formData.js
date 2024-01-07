const formQuestions = [
    {
        questionOrder: 1,
        inputType: 'dateTime',
        question: 'What time did you get to sleep last night?'
    },
    {
        questionOrder: 2,
        inputType: 'dateTime',
        question: 'What time did you wake up?'
    },
    {
        questionOrder: 3,
        userType: 'employee',
        inputType: 'bool',
        question: 'Did you work?',
        followUpQuestion: { inputType: 'text', question: 'Describe your work day in a few sentences.' }
    },
    {
        questionOrder: 3,
        userType: 'student',
        inputType: 'bool',
        question: 'Did you have class?',
        followUpQuestion: { inputType: 'text', question: 'Describe how your classes went in a few sentences.' }
    },
    {
        questionOrder: 4,
        inputType: 'bool',
        question: 'Did you perform any strenuous activities?',
        followUpQuestion: { inputType: 'text', question: 'Briefly explain your activities.' }
    },
    {
        questionOrder: 5,
        inputType: 'bool',
        question: 'Did you get anytime to yourself today for hobbies or some relaxation?',
        followUpQuestion: { inputType: 'text', question: 'Nice, what did you get up to?' }
    },
]

export default formQuestions;