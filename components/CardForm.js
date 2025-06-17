// Card Form Component
window.CardForm = ({ card, onSave, onCancel }) => {
  const [front, setFront] = React.useState(card?.front || "")
  const [back, setBack] = React.useState(card?.back || "")

  const handleSave = () => {
    if (front.trim() && back.trim()) {
      onSave({
        ...card,
        front: front.trim(),
        back: back.trim(),
        id: card?.id || Date.now().toString(),
      })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Front (Question)</label>
        <textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows="3"
          placeholder="Enter the question or prompt..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Back (Answer)</label>
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows="3"
          placeholder="Enter the answer..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!front.trim() || !back.trim()}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            front.trim() && back.trim()
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {card ? "Update Card" : "Add Card"}
        </button>
      </div>
    </div>
  )
}
