// Spaced Repetition Algorithm
window.SpacedRepetition = {
  // Calculate next review time based on correctness
  calculateNextReview(card, isCorrect) {
    const now = Date.now()
    const dayInMs = 24 * 60 * 60 * 1000

    if (isCorrect) {
      // Increase interval: 1 day -> 3 days -> 7 days -> 14 days -> 30 days
      const intervals = [1, 3, 7, 14, 30]
      const currentIndex = intervals.indexOf(card.interval)
      const nextIndex = Math.min(currentIndex + 1, intervals.length - 1)
      const newInterval = intervals[nextIndex]

      return {
        nextReview: now + newInterval * dayInMs,
        interval: newInterval,
        correctCount: card.correctCount + 1,
        incorrectCount: card.incorrectCount,
      }
    } else {
      // Reset to 1 day for incorrect answers
      return {
        nextReview: now + dayInMs,
        interval: 1,
        correctCount: card.correctCount,
        incorrectCount: card.incorrectCount + 1,
      }
    }
  },

  // Get cards that are due for review
  getDueCards(cards) {
    const now = Date.now()
    return cards.filter((card) => card.nextReview <= now)
  },

  // Get study statistics for a deck
  getStudyStats(cards) {
    const now = Date.now()
    const dueCards = this.getDueCards(cards)
    const totalCorrect = cards.reduce((sum, card) => sum + card.correctCount, 0)
    const totalIncorrect = cards.reduce((sum, card) => sum + card.incorrectCount, 0)
    const totalStudied = totalCorrect + totalIncorrect

    return {
      totalCards: cards.length,
      dueCards: dueCards.length,
      totalStudied,
      correctPercentage: totalStudied > 0 ? Math.round((totalCorrect / totalStudied) * 100) : 0,
    }
  },
}
