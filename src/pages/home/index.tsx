/* eslint-disable react/no-unescaped-entities */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Wrapper from './style';
import { Layout } from '../../../styles/global-style';
import MessageBox from '../../components/message-box/index';

import { chats } from './data';
import { IMessageBox } from 'src/types/message';

const Home: NextPage = (props) => {
  const [userRequestPrompt, setUserRequestPrompt] = useState<IMessageBox[]>([]);

  const [userInput, setUserInput] = useState('');
  const [command, setCommand] = useState('');

  const getUserInput = (event: any) => {
    setUserInput(event.target.value);
  };

  const submitRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setUserRequestPrompt([
      { isFromUser: true, message: userInput },
      ...userRequestPrompt,
    ]);

    try {
      const response = await fetch('api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userRequest: userInput, command }),
      });

      const result = await response.json();

      if (result) {
        setUserRequestPrompt([
          ...[{ isFromUser: false, message: result.response }],
          ...userRequestPrompt,
        ]);
      } else {
        setUserRequestPrompt([
          { isFromUser: false, message: 'Error: No response from OpenAI API' },
          ...userRequestPrompt,
        ]);
      }
    } catch (error: any) {
      setUserRequestPrompt([
        { isFromUser: false, message: `Error: ${error?.message}` },
        ...userRequestPrompt,
      ]);
    }

    setUserInput('');
  };

  useEffect(() => {
    console.log({ userRequestPrompt });
  }, [userRequestPrompt]);
  return (
    <Layout>
      <Wrapper.Home>
        <Wrapper.Header>
          <div>
            <h1>Engine Warvil</h1>
            <p>Your OpenAI Assistant | Edward Fernandez</p>
          </div>
        </Wrapper.Header>
        <Wrapper.Container>
          <Wrapper.Commands>
            <div>
              <h2>Choose Commands</h2>
            </div>
            <ul>
              <li>
                <i className="fas fa-question-circle"></i> Basic question
              </li>
              <li>
                <i className="fas fa-code"></i> Generate code
              </li>
              <li>
                <i className="fas fa-check"></i> Grammar correction
              </li>
              <li>
                <i className="fas fa-quote-right"></i>
                Paraphrase
              </li>
              <li>
                <i className="fas fa-book-reader"></i> Summarize for a grade
                student
              </li>
              <li>
                <i className="fas fa-globe"></i> English to other language
              </li>
              <li>
                <i className="fas fa-file-code"></i> Explain programming code
              </li>
              <li>
                <i className="fas fa-balance-scale"></i> Evaluate a mathematical
                expression
              </li>
              <li>
                <i className="fas fa-calculator"></i> Evaluate a math equation
              </li>
              <li>
                <i className="fas fa-book-open"></i> Create study notes
              </li>
            </ul>
          </Wrapper.Commands>
          <Wrapper.Playground>
            <Wrapper.Header>
              <div className="message-box">
                <h2>Basic Question</h2>
                <p>Answers at your fingertips</p>
              </div>
            </Wrapper.Header>
            <Wrapper.EngineArea>
              <Wrapper.MessageBoxContainer>
                {chats.map((el, i) => (
                  <MessageBox
                    key={i}
                    isFromUser={el.isFromUser}
                    message={el.message}
                  />
                ))}
              </Wrapper.MessageBoxContainer>
              {/* <textarea></textarea> */}
            </Wrapper.EngineArea>

            <Wrapper.UserArea onSubmit={submitRequest}>
              <div>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  name="userRequest"
                  onChange={getUserInput}
                  value={userInput}
                  required
                />
                <button type="submit">
                  <i className="fas fa-paper-plane"> </i>
                </button>
              </div>
            </Wrapper.UserArea>
          </Wrapper.Playground>
        </Wrapper.Container>
      </Wrapper.Home>
    </Layout>
  );
};

export default Home;
