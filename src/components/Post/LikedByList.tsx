// src/components/Post/LikedByList.tsx
import React from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  users: User[];
}

const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  const visible = name.slice(0, 2); // first 2 chars visible
  return `${visible}***@${domain}`;
};

const LikedByList: React.FC<Props> = ({ users }) => {
  if (!users.length) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-gray-700 font-semibold mb-2">Liked by:</p>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 bg-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              {user.firstName[0]}
            </div>
            <div className="text-gray-700">
              {user.firstName} {user.lastName}{" "}
              <span className="text-gray-400 text-sm">
                ({maskEmail(user.email)})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedByList;
