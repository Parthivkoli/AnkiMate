"use client"

// Sidebar Component
window.Sidebar = ({ decks, selectedDeckId, onSelectDeck, onCreateDeck, onImportDeck }) => {
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
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-600">AnkiMate</h1>
        <p className="text-sm text-gray-600 mt-1">Flashcard Study Tool</p>
      </div>

      <div className="p-4 border-b">
        <button
          onClick={onCreateDeck}
          className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors mb-2"
        >
          Create New Deck
        </button>
        <button
          onClick={handleImportClick}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Import Deck
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Your Decks</h3>
          {decks.length === 0 ? (
            <p className="text-gray-500 text-sm">No decks yet. Create your first deck!</p>
          ) : (
            <div className="space-y-2">
              {decks.map((deck) => {
                const stats = window.SpacedRepetition.getStudyStats(deck.cards)
                return (
                  <button
                    key={deck.id}
                    onClick={() => onSelectDeck(deck.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedDeckId === deck.id
                        ? "bg-primary-50 border-2 border-primary-200"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="font-medium text-gray-900">{deck.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {stats.totalCards} cards • {stats.dueCards} due
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
