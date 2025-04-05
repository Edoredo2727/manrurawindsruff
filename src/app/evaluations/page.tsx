import Link from 'next/link';
import React from 'react';

// Ideally, this would fetch data from your API
async function getEvaluations() {
  // Mock data for now
  return {
    evaluations: [
      { 
        id: '1', 
        roomId: '1',
        roomName: 'Conference Room A', 
        buildingName: 'Main Building',
        evaluatorName: 'John Doe',
        evaluationDate: '2025-04-02',
        cleanliness: 5,
        maintenance: 5,
        equipment: 4,
        comfort: 5,
        accessibility: 5,
        overall: 4.8,
        comments: 'Excellent space for team meetings, all equipment works perfectly.',
        images: ['https://images.unsplash.com/photo-1431540015161-0bf868a2d407']
      },
      { 
        id: '2', 
        roomId: '2',
        roomName: 'Lecture Hall 3', 
        buildingName: 'Science Center',
        evaluatorName: 'Jane Smith',
        evaluationDate: '2025-04-01',
        cleanliness: 3,
        maintenance: 3,
        equipment: 4,
        comfort: 3,
        accessibility: 4,
        overall: 3.5,
        comments: 'Some seats are broken and the room could use better cleaning. Audio system works well though.',
        images: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205']
      },
      { 
        id: '3', 
        roomId: '3',
        roomName: 'Office 220', 
        buildingName: 'Main Building',
        evaluatorName: 'Robert Johnson',
        evaluationDate: '2025-03-31',
        cleanliness: 4,
        maintenance: 4,
        equipment: 5,
        comfort: 4,
        accessibility: 4,
        overall: 4.2,
        comments: 'Well-maintained office space with good equipment. Some minor wear on furniture.',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c']
      },
      { 
        id: '4', 
        roomId: '4',
        roomName: 'Lab 5', 
        buildingName: 'Science Center',
        evaluatorName: 'Emily Chen',
        evaluationDate: '2025-03-30',
        cleanliness: 4,
        maintenance: 4,
        equipment: 4,
        comfort: 4,
        accessibility: 4,
        overall: 4.0,
        comments: 'Lab equipment is up-to-date and the space is generally well-maintained.',
        images: ['https://images.unsplash.com/photo-1581093588401-fbb62a02f120']
      },
      { 
        id: '5', 
        roomId: '5',
        roomName: 'Study Space', 
        buildingName: 'Library',
        evaluatorName: 'Michael Brown',
        evaluationDate: '2025-03-29',
        cleanliness: 5,
        maintenance: 4,
        equipment: 4,
        comfort: 5,
        accessibility: 5,
        overall: 4.5,
        comments: 'Quiet, comfortable space with plenty of outlets. Tables are well-spaced and the lighting is excellent.',
        images: ['https://images.unsplash.com/photo-1558442086-8ea5ff4eb07f']
      },
      { 
        id: '6', 
        roomId: '6',
        roomName: 'Computer Lab', 
        buildingName: 'Engineering Hall',
        evaluatorName: 'Sarah Wilson',
        evaluationDate: '2025-03-28',
        cleanliness: 4,
        maintenance: 3,
        equipment: 4,
        comfort: 4,
        accessibility: 4,
        overall: 3.8,
        comments: 'Some computers need updating but overall a functional lab. Could use better air conditioning.',
        images: ['https://images.unsplash.com/photo-1571260899304-425eee4c7efc']
      },
    ]
  };
}

function scoreColor(score: number) {
  if (score >= 4.5) return 'bg-green-100 text-green-800';
  if (score >= 3.5) return 'bg-blue-100 text-blue-800';
  if (score >= 2.5) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getCriteriaScore(name: string, score: number) {
  return (
    <div className="flex items-center">
      <span className="text-sm text-gray-500 w-24">{name}:</span>
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${score >= 4.5 ? 'bg-green-500' : score >= 3.5 ? 'bg-blue-500' : score >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'}`} 
          style={{ width: `${(score / 5) * 100}%` }}
        ></div>
      </div>
      <span className="ml-2 text-sm text-gray-600">{score}</span>
    </div>
  );
}

export default async function EvaluationsPage() {
  const { evaluations } = await getEvaluations();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Room Evaluations</h1>
          <Link 
            href="/evaluations/new" 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Evaluation
          </Link>
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
          <div className="md:grid md:grid-cols-5 md:gap-6">
            <div className="col-span-1">
              <label htmlFor="building" className="block text-sm font-medium text-gray-700">Building</label>
              <select
                id="building"
                name="building"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Buildings</option>
                <option value="Main Building">Main Building</option>
                <option value="Science Center">Science Center</option>
                <option value="Library">Library</option>
                <option value="Engineering Hall">Engineering Hall</option>
              </select>
            </div>
            
            <div className="col-span-1 mt-6 md:mt-0">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date Range</label>
              <select
                id="date"
                name="date"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Time</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
                <option value="last_3_months">Last 3 Months</option>
                <option value="last_year">Last Year</option>
              </select>
            </div>
            
            <div className="col-span-1 mt-6 md:mt-0">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Minimum Rating</label>
              <select
                id="rating"
                name="rating"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ (Excellent)</option>
                <option value="4">4.0+ (Very Good)</option>
                <option value="3.5">3.5+ (Good)</option>
                <option value="3">3.0+ (Average)</option>
                <option value="2.5">2.5+ (Below Average)</option>
              </select>
            </div>
            
            <div className="col-span-1 mt-6 md:mt-0">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Categories</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="maintenance">Maintenance</option>
                <option value="equipment">Equipment</option>
                <option value="comfort">Comfort</option>
                <option value="accessibility">Accessibility</option>
              </select>
            </div>
            
            <div className="col-span-1 mt-6 md:mt-0 flex items-end">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Evaluations List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {evaluations.map((evaluation) => (
              <li key={evaluation.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        <Link href={`/evaluations/${evaluation.id}`} className="hover:underline">
                          {evaluation.roomName}
                        </Link>
                      </p>
                      <p className="ml-2 flex-shrink-0 font-normal text-sm text-gray-500">
                        {evaluation.buildingName}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${scoreColor(evaluation.overall)}`}>
                        {evaluation.overall.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {getCriteriaScore('Cleanliness', evaluation.cleanliness)}
                        {getCriteriaScore('Maintenance', evaluation.maintenance)}
                        {getCriteriaScore('Equipment', evaluation.equipment)}
                        {getCriteriaScore('Comfort', evaluation.comfort)}
                        {getCriteriaScore('Accessibility', evaluation.accessibility)}
                      </div>
                      {evaluation.comments && (
                        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                          "{evaluation.comments}"
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-4">
                      <div className="flex flex-col">
                        <p>
                          <span className="font-medium text-gray-900">Evaluated by:</span> {evaluation.evaluatorName}
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">Date:</span> {new Date(evaluation.evaluationDate).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                          <Link 
                            href={`/evaluations/${evaluation.id}`} 
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Pagination */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
              <span className="font-medium">42</span> results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
