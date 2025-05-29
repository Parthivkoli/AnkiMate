"use client"

// Deck View Component
window.DeckView = ({ deck, onUpdateDeck, onDeleteDeck, onStartStudy, onAddCard, onEditCard, onDeleteCard }) => {
  const stats = window.SpacedRepetition.getStudyStats(deck.cards)

  const handleExport = () => {
    window.FileUtils.exportDeck(deck)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{deck.name}</h1>
            <p className="text-gray-600">Created {new Date(deck.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Export
            </button>
            <button
              onClick={() => onDeleteDeck(deck.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete Deck
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalCards}</div>
            <div className="text-sm text-blue-800">Total Cards</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.dueCards}</div>
            <div className="text-sm text-orange-800">Due for Review</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.correctPercentage}%</div>
            <div className="text-sm text-green-800">Accuracy</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.totalStudied}</div>
            <div className="text-sm text-purple-800">Cards Studied</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onStartStudy}
            disabled={stats.dueCards === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              stats.dueCards > 0
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {stats.dueCards > 0 ? `Study Now (${stats.dueCards} cards)` : "No cards due"}
          </button>
          <button
            onClick={onAddCard}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Add Card
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cards</h2>
        {deck.cards.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No cards yet. Add your first card!</p>
        ) : (
          <div className="space-y-4">
            {deck.cards.map((card) => {
              const isDue = card.nextReview <= Date.now()
              return (
                <div key={card.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">Q: {card.front}</div>
                      <div className="text-gray-600">A: {card.back}</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onEditCard(card)}
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteCard(card.id)}
                        className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Correct: {card.correctCount} | Incorrect: {card.incorrectCount}
                    </span>
                    <span className={isDue ? "text-orange-600 font-medium" : ""}>
                      {isDue ? "Due now" : `Next review: ${new Date(card.nextReview).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
