import { User } from "@/payload-types";

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
      {/* ... other user fields */}
    </div>
  );
};
