import { NextPage } from 'next';
import { useState } from 'react';

import Style from './style';
import Header from 'src/features/chat/components/header/index';

const Chat: NextPage = (props) => {
  const [userRequest, setUserRequest] = useState('');

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch('api/ai-bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userRequest: userRequest.trim() }),
    });

    console.log({ response });
  };

  return (
    <Style.Wrapper>
      <Style.SubWrapper>
        <Header />
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Enter your question"
            name="userRequest"
            onChange={(event) => setUserRequest(event.target.value)}
          />
        </form>
        <button type="submit">Request</button>
      </Style.SubWrapper>
    </Style.Wrapper>
  );
};

export default Chat;
