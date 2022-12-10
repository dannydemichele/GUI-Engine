/* eslint-disable react/no-unescaped-entities */

import { NextPage } from 'next';

import Wrapper from './style';
import { MessageBoxable } from 'lib/types/message';
import React from 'react';

const MessageBox: NextPage<MessageBoxable> = ({
  isFromUser,
  message = ``,
}: MessageBoxable): JSX.Element => {
  let html;

  if (!isFromUser && message.indexOf('\n') !== -1) {
    const formattedMessage = message.replace(/^\n\n/, '');
    const lines = formattedMessage.split('\n');
    html = lines.map((line, index) => `${line} <br/>`);

    html = html.join('');
  }

  return (
    <Wrapper.MessageBox>
      <div className={isFromUser ? 'user' : 'engine'}>
        <p>{isFromUser ? '👤 You' : '🤖 Warvil'}</p>
        <div>
          {isFromUser ? (
            <p>{message}</p>
          ) : (
            <pre dangerouslySetInnerHTML={{ __html: html || '' }}></pre>
          )}
        </div>
      </div>
    </Wrapper.MessageBox>
  );
};

export default MessageBox;
