import React, { useState } from 'react';
import { IUser } from '../page';

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
  onEdit: (user: IUser) => void;
}

const EditUser: React.FC<EditUserProps> = ({ isOpen, onClose, user, onEdit }) => {
  const [updatedUser, setUpdatedUser] = useState<Partial<IUser>>(user || {});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSave = () => {
    if (user) {
      onEdit({ ...user, ...updatedUser, updatedAt: new Date() } as IUser);
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div>
      {/* ...existing edit user modal structure... */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditUser;
