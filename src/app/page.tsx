import Link from "next/link";

async function getStats() {
  // In a real app, this would fetch actual stats from your API
  // For now, we'll return demo data
  return {
    buildingsCount: 12,
    roomsCount: 126,
    evaluationsCount: 487,
    recentEvaluations: [
      { id: '1', roomName: 'Conference Room A', buildingName: 'Main Building', score: 4.8, date: '2025-04-02' },
      { id: '2', roomName: 'Lecture Hall 3', buildingName: 'Science Center', score: 3.5, date: '2025-04-01' },
      { id: '3', roomName: 'Office 220', buildingName: 'Admin Building', score: 4.2, date: '2025-03-31' },
      { id: '4', roomName: 'Lab 5', buildingName: 'Research Wing', score: 4.0, date: '2025-03-30' },
    ]
  };
}

export default async function Home() {
  const stats = await getStats();
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="text-center py-12 mb-8 bg-white shadow-sm rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Room Evaluation System</h1>
        <p className="text-xl text-gray-600 mb-8">Efficiently manage and evaluate facilities across your organization</p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/buildings"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            View Buildings
          </Link>
          <Link
            href="/evaluations/new"
            className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            New Evaluation
          </Link>
        </div>
      </div>

      {/* Stats overview */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-semibold text-gray-500">Buildings</h3>
              <div className="mt-1 text-3xl font-semibold text-gray-900">{stats.buildingsCount}</div>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/buildings" className="text-sm text-indigo-600 hover:text-indigo-800">
              View all buildings →
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-semibold text-gray-500">Rooms</h3>
              <div className="mt-1 text-3xl font-semibold text-gray-900">{stats.roomsCount}</div>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/rooms" className="text-sm text-indigo-600 hover:text-indigo-800">
              View all rooms →
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-semibold text-gray-500">Evaluations</h3>
              <div className="mt-1 text-3xl font-semibold text-gray-900">{stats.evaluationsCount}</div>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/evaluations" className="text-sm text-indigo-600 hover:text-indigo-800">
              View all evaluations →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent evaluations */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Evaluations</h2>
          <Link href="/evaluations" className="text-indigo-600 hover:text-indigo-800">
            View all evaluations →
          </Link>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Building
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentEvaluations.map((evaluation) => (
                  <tr key={evaluation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {evaluation.roomName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {evaluation.buildingName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreColor(evaluation.score)}`}>
                          {evaluation.score.toFixed(1)}
                        </div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${scoreBarColor(evaluation.score)}`} 
                            style={{ width: `${(evaluation.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(evaluation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/evaluations/${evaluation.id}`} className="text-indigo-600 hover:text-indigo-900">
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Evaluations</h3>
            <p className="text-gray-600">Multi-criteria room evaluations with customizable rating scales</p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Scheduled Assessments</h3>
            <p className="text-gray-600">Automatically schedule regular room evaluations</p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-gray-600">Track improvements and identify areas needing attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for evaluation score styling
function scoreColor(score: number) {
  if (score >= 4.5) return 'bg-green-100 text-green-800';
  if (score >= 3.5) return 'bg-blue-100 text-blue-800';
  if (score >= 2.5) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function scoreBarColor(score: number) {
  if (score >= 4.5) return 'bg-green-500';
  if (score >= 3.5) return 'bg-blue-500';
  if (score >= 2.5) return 'bg-yellow-500';
  return 'bg-red-500';
}
