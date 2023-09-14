import React from 'react';
import { fetchOneUser } from '../store/services/user.service';

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = React.useState(null);
  const recipientId = chat?.members.find((id) => id !== user._id);
  React.useEffect(() => {
    const getUser = async () => {
        if(!recipientId) return null;
        const response = await fetchOneUser(recipientId);
        setRecipientUser(response);
    };
    getUser();
  }, []);
  return {recipientUser};
};
