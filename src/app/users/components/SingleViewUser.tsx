import React from 'react';
import { IUser } from '../page';

interface SingleViewUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

const SingleViewUser: React.FC<SingleViewUserProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div>
      {/* ...existing view user modal structure... */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SingleViewUser;
