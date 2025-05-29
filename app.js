"use client"

import React from "react"

// Main App Component
const { useState, useEffect } = React

function App() {
  const [data, setData] = useState({ decks: [] })
  const [selectedDeckId, setSelectedDeckId] = useState(null)
  const [currentView, setCurrentView] = useState("home") // 'home', 'deck', 'study'
  const [showDeckForm, setShowDeckForm] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [editingCard, setEditingCard] = useState(null)

  // Load data on mount
  useEffect(() => {
    const loadedData = window.StorageUtils.loadData()
    setData(loadedData)
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    window.StorageUtils.saveData(data)
  }, [data])

  const selectedDeck = data.decks.find((deck) => deck.id === selectedDeckId)

  // Deck operations
  const handleCreateDeck = () => {
    setShowDeckForm(true)
  }

  const handleSaveDeck = (deck) => {
    setData((prev) => ({
      ...prev,
      decks:
        deck.id && prev.decks.find((d) => d.id === deck.id)
          ? prev.decks.map((d) => (d.id === deck.id ? deck : d))
          : [...prev.decks, deck],
    }))
    setShowDeckForm(false)
    if (!selectedDeckId) {
      setSelectedDeckId(deck.id)
      setCurrentView("deck")
    }
  }

  const handleDeleteDeck = (deckId) => {
    if (confirm("Are you sure you want to delete this deck?")) {
      setData((prev) => ({
        ...prev,
        decks: prev.decks.filter((deck) => deck.id !== deckId),
      }))
      setSelectedDeckId(null)
      setCurrentView("home")
    }
  }

  const handleImportDeck = (deck) => {
    setData((prev) => ({
      ...prev,
      decks: [...prev.decks, deck],
    }))
    alert("Deck imported successfully!")
  }

  // Card operations
  const handleAddCard = () => {
    setEditingCard(null)
    setShowCardForm(true)
  }

  const handleEditCard = (card) => {
    setEditingCard(card)
    setShowCardForm(true)
  }

  const handleSaveCard = (card) => {
    setData((prev) => ({
      ...prev,
      decks: prev.decks.map((deck) => {
        if (deck.id === selectedDeckId) {
          const existingCardIndex = deck.cards.findIndex((c) => c.id === card.id)
          if (existingCardIndex >= 0) {
            // Update existing card
            const updatedCards = [...deck.cards]
            updatedCards[existingCardIndex] = { ...updatedCards[existingCardIndex], ...card }
            return { ...deck, cards: updatedCards }
          } else {
            // Add new card
            const newCard = {
              ...card,
              nextReview: Date.now(),
              interval: 1,
              correctCount: 0,
              incorrectCount: 0,
            }
            return { ...deck, cards: [...deck.cards, newCard] }
          }
        }
        return deck
      }),
    }))
    setShowCardForm(false)
    setEditingCard(null)
  }

  const handleDeleteCard = (cardId) => {
    if (confirm("Are you sure you want to delete this card?")) {
      setData((prev) => ({
        ...prev,
        decks: prev.decks.map((deck) => {
          if (deck.id === selectedDeckId) {
            return { ...deck, cards: deck.cards.filter((card) => card.id !== cardId) }
          }
          return deck
        }),
      }))
    }
  }

  const handleUpdateCard = (updatedCard) => {
    setData((prev) => ({
      ...prev,
      decks: prev.decks.map((deck) => {
        if (deck.id === selectedDeckId) {
          return {
            ...deck,
            cards: deck.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
          }
        }
        return deck
      }),
    }))
  }

  // Navigation
  const handleSelectDeck = (deckId) => {
    setSelectedDeckId(deckId)
    setCurrentView("deck")
  }

  const handleStartStudy = () => {
    setCurrentView("study")
  }

  const handleCompleteStudy = () => {
    setCurrentView("deck")
  }

  const handleBackToHome = () => {
    setSelectedDeckId(null)
    setCurrentView("home")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <window.Sidebar
        decks={data.decks}
        selectedDeckId={selectedDeckId}
        onSelectDeck={handleSelectDeck}
        onCreateDeck={handleCreateDeck}
        onImportDeck={handleImportDeck}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {currentView === "home" && (
          <window.DeckList
            decks={data.decks}
            onSelectDeck={handleSelectDeck}
            onCreateDeck={handleCreateDeck}
            onImportDeck={handleImportDeck}
          />
        )}

        {currentView === "deck" && selectedDeck && (
          <window.DeckView
            deck={selectedDeck}
            onUpdateDeck={handleSaveDeck}
            onDeleteDeck={handleDeleteDeck}
            onStartStudy={handleStartStudy}
            onAddCard={handleAddCard}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
          />
        )}

        {currentView === "study" && selectedDeck && (
          <window.StudyMode deck={selectedDeck} onComplete={handleCompleteStudy} onUpdateCard={handleUpdateCard} />
        )}
      </div>

      {/* Modals */}
      <window.Modal isOpen={showDeckForm} onClose={() => setShowDeckForm(false)} title="Create New Deck">
        <window.DeckForm onSave={handleSaveDeck} onCancel={() => setShowDeckForm(false)} />
      </window.Modal>

      <window.Modal
        isOpen={showCardForm}
        onClose={() => {
          setShowCardForm(false)
          setEditingCard(null)
        }}
        title={editingCard ? "Edit Card" : "Add New Card"}
      >
        <window.CardForm
          card={editingCard}
          onSave={handleSaveCard}
          onCancel={() => {
            setShowCardForm(false)
            setEditingCard(null)
          }}
        />
      </window.Modal>
    </div>
  )
}

// Render the app
ReactDOM.render(<App />, document.getElementById("root"))
