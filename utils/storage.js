// Local Storage Utilities
window.StorageUtils = {
  STORAGE_KEY: "ankimate_data",

  loadData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      if (data) {
        return JSON.parse(data)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
    return this.getDefaultData()
  },

  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving data:", error)
    }
  },

  getDefaultData() {
    return {
      decks: [
        {
          id: "1",
          name: "Sample Deck",
          cards: [
            {
              id: "1",
              front: "What is the capital of France?",
              back: "Paris",
              nextReview: Date.now(),
              interval: 1,
              correctCount: 0,
              incorrectCount: 0,
            },
            {
              id: "2",
              front: "What is 2 + 2?",
              back: "4",
              nextReview: Date.now(),
              interval: 1,
              correctCount: 0,
              incorrectCount: 0,
            },
            {
              id: "3",
              front: "What is the largest planet in our solar system?",
              back: "Jupiter",
              nextReview: Date.now(),
              interval: 1,
              correctCount: 0,
              incorrectCount: 0,
            },
          ],
          createdAt: Date.now(),
        },
      ],
    }
  },
}
