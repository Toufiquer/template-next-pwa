import React from 'react';
import { IUser } from '../page';

interface DeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
  onDelete: (userId: string) => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ isOpen, onClose, user, onDelete }) => {
  const handleDelete = () => {
    if (user) {
      onDelete(user.id);
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div>
      {/* ...existing delete user modal structure... */}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteUser;
