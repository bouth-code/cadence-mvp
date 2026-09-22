import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [formData, setFormData] = useState({
    companyName: "",
    currentChallenges: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setResult(data.analysis)
    } catch (error) {
      setResult("Error analyzing. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Cadence - Business Automation Audit</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Cadence</h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            AI-Powered Business Automation Audit
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Challenges
                </label>
                <textarea
                  value={formData.currentChallenges}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentChallenges: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Describe your business challenges..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Get AI Analysis"}
              </button>
            </form>

            {result && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
