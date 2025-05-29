// Dashboard Component
"use client"

import { useState } from "react"

// Dashboard Component
window.Dashboard = ({ decks }) => {
  const [timeRange, setTimeRange] = useState("week")

  const studyStreak = Analytics.getStudyStreak()
  const todayProgress = Analytics.getTodayProgress()
  const weeklyProgress = Analytics.getWeeklyProgress()
  const performanceAnalytics = Analytics.getPerformanceAnalytics(decks)

  // Calculate overall stats
  const overallStats = Object.values(performanceAnalytics).reduce(
    (total, deck) => ({
      totalSessions: total.totalSessions + deck.totalSessions,
      totalCardsStudied: total.totalCardsStudied + deck.totalCardsStudied,
      totalCorrect: total.totalCorrect + deck.totalCorrect,
      totalIncorrect: total.totalIncorrect + deck.totalIncorrect,
    }),
    { totalSessions: 0, totalCardsStudied: 0, totalCorrect: 0, totalIncorrect: 0 },
  )

  const overallAccuracy =
    overallStats.totalCardsStudied > 0
      ? Math.round((overallStats.totalCorrect / overallStats.totalCardsStudied) * 100)
      : 0

  // Prepare weekly chart data
  const weeklyData = Object.entries(weeklyProgress).map(([date, stats]) => ({
    date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    cards: stats.cardsStudied,
    accuracy: stats.accuracy,
  }))

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Analytics</h1>
        <p className="text-gray-600">Track your learning progress and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Study Streak</p>
              <p className="text-3xl font-bold">{studyStreak}</p>
              <p className="text-blue-100 text-sm">days</p>
            </div>
            <div className="text-4xl opacity-80">🔥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today's Cards</p>
              <p className="text-3xl font-bold">{todayProgress.cardsStudied}</p>
              <p className="text-green-100 text-sm">studied</p>
            </div>
            <div className="text-4xl opacity-80">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Overall Accuracy</p>
              <p className="text-3xl font-bold">{overallAccuracy}%</p>
              <p className="text-purple-100 text-sm">correct</p>
            </div>
            <div className="text-4xl opacity-80">🎯</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Sessions</p>
              <p className="text-3xl font-bold">{overallStats.totalSessions}</p>
              <p className="text-orange-100 text-sm">completed</p>
            </div>
            <div className="text-4xl opacity-80">⚡</div>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{todayProgress.cardsStudied}</div>
            <div className="text-sm text-gray-600">Cards Studied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{todayProgress.correctAnswers}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{todayProgress.incorrectAnswers}</div>
            <div className="text-sm text-gray-600">Incorrect Answers</div>
          </div>
        </div>

        {todayProgress.cardsStudied > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Today's Accuracy</span>
              <span>{Math.round((todayProgress.correctAnswers / todayProgress.cardsStudied) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(todayProgress.correctAnswers / todayProgress.cardsStudied) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h2>
        <div className="grid grid-cols-7 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-2">{day.date}</div>
              <div className="relative">
                <div
                  className="bg-blue-500 rounded-t mx-auto transition-all duration-300"
                  style={{
                    height: `${Math.max(day.cards * 4, 4)}px`,
                    width: "20px",
                  }}
                ></div>
                <div className="text-xs text-gray-700 mt-1">{day.cards}</div>
                {day.accuracy > 0 && <div className="text-xs text-green-600">{day.accuracy}%</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 text-center mt-4">
          Cards studied per day (height) and accuracy percentage
        </div>
      </div>

      {/* Deck Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Deck Performance</h2>
        <div className="space-y-4">
          {Object.values(performanceAnalytics)
            .filter((deck) => deck.totalSessions > 0)
            .sort((a, b) => b.totalCardsStudied - a.totalCardsStudied)
            .map((deck, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{deck.name}</h3>
                  <span className="text-sm text-gray-500">
                    {deck.lastStudied
                      ? `Last studied: ${new Date(deck.lastStudied).toLocaleDateString()}`
                      : "Never studied"}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Sessions</div>
                    <div className="font-medium">{deck.totalSessions}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Cards Studied</div>
                    <div className="font-medium">{deck.totalCardsStudied}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Accuracy</div>
                    <div className="font-medium text-green-600">{deck.averageAccuracy}%</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Correct/Incorrect</div>
                    <div className="font-medium">
                      {deck.totalCorrect}/{deck.totalIncorrect}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${deck.averageAccuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

          {Object.values(performanceAnalytics).every((deck) => deck.totalSessions === 0) && (
            <div className="text-center py-8 text-gray-500">
              <p>No study sessions recorded yet.</p>
              <p className="text-sm">Start studying to see your performance analytics!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
