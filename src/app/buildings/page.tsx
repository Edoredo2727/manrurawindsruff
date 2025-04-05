import Link from 'next/link';
import React from 'react';

// Ideally, this would fetch data from your API
async function getBuildings() {
  // Mock data for now
  return {
    buildings: [
      { 
        id: '1', 
        name: 'Main Building', 
        address: '123 University Ave', 
        city: 'College Town',
        roomCount: 42,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        departments: ['Administration', 'Faculty Offices']
      },
      { 
        id: '2', 
        name: 'Science Center', 
        address: '456 Research Blvd', 
        city: 'College Town',
        roomCount: 38,
        imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
        departments: ['Physics', 'Chemistry', 'Biology']
      },
      { 
        id: '3', 
        name: 'Student Center', 
        address: '789 Campus Drive', 
        city: 'College Town',
        roomCount: 22,
        imageUrl: 'https://images.unsplash.com/photo-1498677231914-50deb6ba4217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        departments: ['Student Services', 'Cafeteria']
      },
      { 
        id: '4', 
        name: 'Library', 
        address: '101 Knowledge Lane', 
        city: 'College Town',
        roomCount: 15,
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        departments: ['Library Services']
      },
      { 
        id: '5', 
        name: 'Engineering Hall', 
        address: '202 Innovation Way', 
        city: 'College Town',
        roomCount: 31,
        imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        departments: ['Mechanical Engineering', 'Electrical Engineering', 'Computer Science']
      },
      { 
        id: '6', 
        name: 'Arts Building', 
        address: '303 Creative Circle', 
        city: 'College Town',
        roomCount: 19,
        imageUrl: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80',
        departments: ['Fine Arts', 'Music', 'Theater']
      },
    ]
  };
}

export default async function BuildingsPage() {
  const { buildings } = await getBuildings();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Buildings</h1>
          <Link 
            href="/buildings/new" 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Building
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buildings.map((building) => (
            <div key={building.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={building.imageUrl} 
                  alt={building.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <Link href={`/buildings/${building.id}`} className="hover:underline">
                    {building.name}
                  </Link>
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{building.address}, {building.city}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                    {building.roomCount} Rooms
                  </span>
                  {building.departments.slice(0, 2).map((dept, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                      {dept}
                    </span>
                  ))}
                  {building.departments.length > 2 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{building.departments.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <Link 
                    href={`/buildings/${building.id}`} 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View details
                  </Link>
                  <Link 
                    href={`/buildings/${building.id}/rooms`} 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View rooms
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
