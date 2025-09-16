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
  const visible = name.slice(0, 2);
  return `${visible}***@${domain}`;
};

const LikedByList: React.FC<Props> = ({ users }) => {
  if (!users.length) return null;

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-xl shadow-md border border-gray-700">
      <p className="text-gray-200 font-semibold mb-3 tracking-wide">
        Liked by:
      </p>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold shadow-md">
              {user.firstName[0]}
            </div>

            <div className="text-gray-300">
              {user.firstName} {user.lastName}{" "}
              <span className="text-gray-500 text-sm">
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
