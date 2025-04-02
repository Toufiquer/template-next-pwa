/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

// import IUser from '@/app/api/v1/users/userModel';
import { useState } from 'react';

export interface IUser {
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}

const Page = () => {
  const [users, setUsers] = useState<IUser[]>([
    { name: 'John Doe', email: 'john@example.com', passCode: '1234', alias: 'johnd', role: 'user' },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      passCode: '5678',
      alias: 'janes',
      role: 'admin',
    },
  ]);

  const handleView = (user: IUser) => {
    alert(`Viewing user: ${user.name}`);
  };

  const handleEdit = (user: IUser) => {
    alert(`Editing user: ${user.name}`);
  };

  const handleDelete = (user: IUser) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter(u => u.email !== user.email));
    }
  };

  return (
    <main className="bg-slate-800 text-white flex flex-col items-center justify-start w-full h-screen p-4">
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
        Add User
      </button>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 border border-gray-600">Name</th>
              <th className="px-4 py-2 border border-gray-600">Email</th>
              <th className="px-4 py-2 border border-gray-600">Role</th>
              <th className="px-4 py-2 border border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-600">
                <td className="px-4 py-2 border border-gray-600">{user.name}</td>
                <td className="px-4 py-2 border border-gray-600">{user.email}</td>
                <td className="px-4 py-2 border border-gray-600">{user.role}</td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                    onClick={() => handleView(user)}
                  >
                    View
                  </button>
                  <button
                    className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Page;
