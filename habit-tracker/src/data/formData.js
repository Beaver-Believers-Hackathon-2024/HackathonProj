const formQuestions = [
    {
        questionOrder: 1,
        userType: 'All',
        sex: 'All',
        inputType: 'dateTime',
        question: 'What time did you get to sleep last night?'
    },
    {
        questionOrder: 2,
        userType: 'All',
        sex: 'All',
        inputType: 'dateTime',
        question: 'What time did you wake up?'
    },
    {
        questionOrder: 3,
        userType: 'employee',
        inputType: 'bool',
        sex: 'All',
        question: 'Did you work?',
        followUpQuestion: { inputType: 'text', question: 'Describe your work day in a few sentences.' }
    },
    {
        questionOrder: 3,
        userType: 'student',
        inputType: 'bool',
        sex: 'All',
        question: 'Did you have class?',
        followUpQuestion: { inputType: 'text', question: 'Describe how your classes went in a few sentences.' }
    },
    {
        questionOrder: 4,
        userType: 'All',
        inputType: 'bool',
        sex: 'All',
        question: 'Did you perform any strenuous activities?',
        followUpQuestion: { inputType: 'text', question: 'Briefly explain your activities.' }
    },
    {
        questionOrder: 5,
        userType: 'All',
        inputType: 'bool',
        sex: 'All',
        question: 'Did you get anytime to yourself today for hobbies or some relaxation?',
        followUpQuestion: { inputType: 'text', question: 'Nice, what did you get up to?' }
    },
]

export default formQuestions;