import Link from 'next/link';
import React from 'react';

// Ideally, this would fetch data from your API
async function getRooms() {
  // Mock data for now
  return {
    rooms: [
      { 
        id: '1', 
        name: 'Conference Room A',
        number: '101',
        buildingId: '1',
        buildingName: 'Main Building',
        capacity: 20,
        type: 'Conference',
        amenities: ['Projector', 'Whiteboard', 'Video Conferencing'],
        lastEvaluationDate: '2025-04-02',
        overallScore: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbmZlcmVuY2UlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: '2', 
        name: 'Lecture Hall 3',
        number: '301',
        buildingId: '2',
        buildingName: 'Science Center',
        capacity: 120,
        type: 'Lecture Hall',
        amenities: ['Projector', 'Sound System', 'Lecture Podium'],
        lastEvaluationDate: '2025-04-01',
        overallScore: 3.5,
        imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVjdHVyZSUyMGhhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: '3', 
        name: 'Office 220',
        number: '220',
        buildingId: '1',
        buildingName: 'Main Building',
        capacity: 4,
        type: 'Office',
        amenities: ['Desks', 'Filing Cabinet', 'Computer'],
        lastEvaluationDate: '2025-03-31',
        overallScore: 4.2,
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: '4', 
        name: 'Lab 5',
        number: '105',
        buildingId: '2',
        buildingName: 'Science Center',
        capacity: 30,
        type: 'Laboratory',
        amenities: ['Lab Equipment', 'Safety Shower', 'Fume Hood'],
        lastEvaluationDate: '2025-03-30',
        overallScore: 4.0,
        imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFib3JhdG9yeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: '5', 
        name: 'Study Space',
        number: '202',
        buildingId: '4',
        buildingName: 'Library',
        capacity: 40,
        type: 'Study Area',
        amenities: ['Tables', 'Power Outlets', 'WiFi'],
        lastEvaluationDate: '2025-03-29',
        overallScore: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1558442086-8ea5ff4eb07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBhcmVhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      },
      { 
        id: '6', 
        name: 'Computer Lab',
        number: '105',
        buildingId: '5',
        buildingName: 'Engineering Hall',
        capacity: 35,
        type: 'Computer Lab',
        amenities: ['Computers', 'Printers', 'Software'],
        lastEvaluationDate: '2025-03-28',
        overallScore: 3.8,
        imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXIlMjBsYWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
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

export default async function RoomsPage() {
  const { rooms } = await getRooms();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
          <Link 
            href="/rooms/new" 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Room
          </Link>
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
          <div className="md:grid md:grid-cols-4 md:gap-6">
            <div className="col-span-1">
              <label htmlFor="building" className="block text-sm font-medium text-gray-700">Building</label>
              <select
                id="building"
                name="building"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Buildings</option>
                <option value="1">Main Building</option>
                <option value="2">Science Center</option>
                <option value="3">Student Center</option>
                <option value="4">Library</option>
                <option value="5">Engineering Hall</option>
              </select>
            </div>
            
            <div className="col-span-1 mt-6 md:mt-0">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                <option value="Conference">Conference Room</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Office">Office</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Study Area">Study Area</option>
                <option value="Computer Lab">Computer Lab</option>
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
        
        {/* Room Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={room.imageUrl} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    <Link href={`/rooms/${room.id}`} className="hover:underline">
                      {room.name}
                    </Link>
                  </h3>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreColor(room.overallScore)}`}>
                    {room.overallScore.toFixed(1)}
                  </div>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Room {room.number} • {room.buildingName}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Capacity: {room.capacity} • Type: {room.type}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <Link 
                    href={`/rooms/${room.id}`} 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View details
                  </Link>
                  <Link 
                    href={`/evaluations/new?roomId=${room.id}`} 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Evaluate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
