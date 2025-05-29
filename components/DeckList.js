"use client"

// Deck List Component (Home Screen)
window.DeckList = ({ decks, onSelectDeck, onCreateDeck, onImportDeck }) => {
  const handleImportClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        window.FileUtils.importDeck(file, (error, deck) => {
          if (error) {
            alert("Error importing deck: " + error.message)
          } else {
            onImportDeck(deck)
          }
        })
      }
    }
    input.click()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to AnkiMate</h1>
        <p className="text-xl text-gray-600">Master any subject with spaced repetition</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={onCreateDeck}
          className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          Create New Deck
        </button>
        <button
          onClick={handleImportClick}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          Import Deck
        </button>
      </div>

      {decks.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Decks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => {
              const stats = window.SpacedRepetition.getStudyStats(deck.cards)
              return (
                <div
                  key={deck.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onSelectDeck(deck.id)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{deck.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Total Cards:</span>
                      <span className="font-medium">{stats.totalCards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due for Review:</span>
                      <span className="font-medium text-primary-600">{stats.dueCards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span className="font-medium">{stats.correctPercentage}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
