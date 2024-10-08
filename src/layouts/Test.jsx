import React, { useState } from 'react';

export const Test = () => {
  const [message, setMessage] = useState(''); // Xabar uchun state
  const [isLoading, setIsLoading] = useState(false); // Yuklanish holatini kuzatish uchun state

  // POST запрос
  const postData = async () => {
    const postBody = {
      balance: 100,
      chat_id: 0,
      id: 1,
      username: 'sadi',
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        'http://213.171.12.123:5000/api/user?chat_id=0',
        {
          method: 'POST',
          // headers: { 'Content-Type': 'application/json' }, // headersni olib tashladik
          body: JSON.stringify(postBody),
        }
      );

      if (!response.ok) {
        throw new Error('POST failure');
      }

      const data = await response.json();
      console.log("POST so'rovi muvaffaqiyatli:", data);
      setMessage('data changed');
    } catch (error) {
      console.error('POST error', error);
      setMessage('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>{message}</div>
      <button onClick={postData} disabled={isLoading}>
        {isLoading ? 'Loading...' : "POST so'rov yuborish"}
      </button>
    </div>
  );
};
