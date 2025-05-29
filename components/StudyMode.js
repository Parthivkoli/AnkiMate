"use client"

import React from "react"

// Study Mode Component
window.StudyMode = ({ deck, onComplete, onUpdateCard }) => {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0)
  const [showAnswer, setShowAnswer] = React.useState(false)
  const [sessionStats, setSessionStats] = React.useState({ correct: 0, incorrect: 0 })

  const dueCards = window.SpacedRepetition.getDueCards(deck.cards)
  const currentCard = dueCards[currentCardIndex]

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !showAnswer) {
        setShowAnswer(true)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showAnswer])

  if (!currentCard) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Study Session Complete!</h2>
          <div className="text-lg text-gray-600 mb-6">
            <p>Correct: {sessionStats.correct}</p>
            <p>Incorrect: {sessionStats.incorrect}</p>
            <p>
              Accuracy:{" "}
              {sessionStats.correct + sessionStats.incorrect > 0
                ? Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100)
                : 0}
              %
            </p>
          </div>
          <button
            onClick={onComplete}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Deck
          </button>
        </div>
      </div>
    )
  }

  const handleAnswer = (isCorrect) => {
    const updatedCard = {
      ...currentCard,
      ...window.SpacedRepetition.calculateNextReview(currentCard, isCorrect),
    }

    onUpdateCard(updatedCard)
    setSessionStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }))

    if (currentCardIndex < dueCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      setShowAnswer(false)
    } else {
      // Session complete
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  const progress = ((currentCardIndex + 1) / dueCards.length) * 100

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Card {currentCardIndex + 1} of {dueCards.length}
          </span>
          <button onClick={onComplete} className="text-gray-600 hover:text-gray-800 text-sm">
            Exit Study
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 min-h-[400px] flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentCard.front}</h2>

          {showAnswer ? (
            <div>
              <div className="text-xl text-gray-700 mb-8 p-4 bg-gray-50 rounded-lg">{currentCard.back}</div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleAnswer(false)}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Incorrect
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Correct
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Show Answer
            </button>
          )}
        </div>

        {!showAnswer && <p className="text-center text-gray-500 text-sm">Press Enter to reveal the answer</p>}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Session Progress: {sessionStats.correct} correct, {sessionStats.incorrect} incorrect
      </div>
    </div>
  )
}
