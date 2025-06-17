// Deck Form Component
window.DeckForm = ({ deck, onSave, onCancel }) => {
  const [name, setName] = React.useState(deck?.name || "")

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        ...deck,
        name: name.trim(),
        id: deck?.id || Date.now().toString(),
        cards: deck?.cards || [],
        createdAt: deck?.createdAt || Date.now(),
      })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Deck Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter deck name..."
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            name.trim()
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {deck ? "Update Deck" : "Create Deck"}
        </button>
      </div>
    </div>
  )
}
