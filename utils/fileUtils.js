// File Import/Export Utilities
window.FileUtils = {
  exportDeck(deck) {
    const dataStr = JSON.stringify(deck, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${deck.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  importDeck(file, callback) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const deck = JSON.parse(e.target.result)
        // Validate deck structure
        if (deck.name && Array.isArray(deck.cards)) {
          // Generate new ID to avoid conflicts
          deck.id = Date.now().toString()
          deck.createdAt = Date.now()

          // Ensure cards have required properties
          deck.cards = deck.cards.map((card, index) => ({
            id: `${deck.id}_${index}`,
            front: card.front || "",
            back: card.back || "",
            nextReview: Date.now(),
            interval: 1,
            correctCount: 0,
            incorrectCount: 0,
            ...card,
          }))

          callback(null, deck)
        } else {
          callback(new Error("Invalid deck format"))
        }
      } catch (error) {
        callback(new Error("Failed to parse JSON file"))
      }
    }
    reader.readAsText(file)
  },
}
