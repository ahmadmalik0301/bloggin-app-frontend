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
    <div className="mt-4">
      <p className="text-gray-700 font-medium">Liked by:</p>
      <ul className="list-disc list-inside text-gray-600">
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({maskEmail(user.email)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedByList;
