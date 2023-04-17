import { data } from 'autoprefixer'
import classNames from 'classnames'
import { useState } from 'react'
import './App.css'
import { quiz } from './quiz'

function App() {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [result, setResult] = useState(
    {
      score: 0,
      correctAnswer: 0,
      WrongAnswer: 0,

    }
  )

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const [userAnswers, setUserAnswers] = useState(Array(quiz.questions.length).fill(null));


  const { questions } = quiz

  const { choices, question, correctAnswer } = questions[activeQuestion]


  const nextQuestion = () => {

    setResult((prev) =>
      selectedAnswer ? {
        ...prev,
        score: prev.score + 1,
        correctAnswer: prev.correctAnswer + 1,

      } :
        { ...prev, WrongAnswer: prev.WrongAnswer + 1 }
    )
    setSelectedAnswerIndex(null)

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion(prev => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }


  const prevQuestion = () => {
    setSelectedAnswerIndex(null)

    if (activeQuestion !== 0) {
      setActiveQuestion(prev => prev - 1)
    }

    const newActiveQuestion = activeQuestion - 1
    const newSelectedAnswerIndex = newActiveQuestion >= 0 ? quiz.questions[newActiveQuestion].selectedAnswerIndex : null

    setActiveQuestion(newActiveQuestion)
    setSelectedAnswerIndex(newSelectedAnswerIndex)
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)

    setUserAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[activeQuestion] = index;
      return newAnswers;
    });

    if (answer === correctAnswer) {
      setSelectedAnswer(true)
      console.log('right')
    } else {
      setSelectedAnswer(false)
      console.log('wrong')
    }
  }
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)



  return (
    <div className="quiz-container">
      {!showResult ? (
        <div className='function' >

          <nav className="navbar">

          </nav>

          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h1 className="heading">QUIZ</h1>

          <p className="questio">{question}</p>

          <ul className="lists">
  {choices.map((data, index) => {
    const isSelected = selectedAnswerIndex === index;
    const isAnswered = userAnswers[activeQuestion] !== null;
    const isCorrect = isAnswered && index === correctAnswer;
    const isWrong = isAnswered && index !== correctAnswer && isSelected;
    const className = classNames({
      'selected-answer': isSelected,
      'answered-correct': isCorrect,
      'answered-wrong': isWrong,
    });
    return (
      <li className={className} onClick={() => onAnswerSelected(data, index)} key={index}>{data}</li>
    )
  })}
</ul>

          <button onClick={prevQuestion} disabled={activeQuestion === 0} className="button">previous</button>

          <button onClick={nextQuestion} disabled={selectedAnswerIndex === null} className="button">{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}</button>

        </div>
      ) : (<div className="results">
        <div>total questions: {questions.length}</div>
        <div>correct Answers: {result.correctAnswer}</div>
        <div>wrong Answers: {result.WrongAnswer} </div>
        <div>score:{result.score}</div>
      </div>)}
    </div>
  )
}

export default App
