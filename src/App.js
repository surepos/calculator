import { useEffect, useState } from 'react';
import './App.css';
import backspaceImage from './backspace.png';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentInput, setCurrentInput] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState([]);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [calcHistory, setCalcHistory] = useState('');
  const [isResultShown, setIsResultShown] = useState(false);
  const [operationOnGoing, setOperationOnGoing] = useState(false);
  const buttonContents = [
    'AC',
    '+/-',
    '%',
    '/',
    7,
    8,
    9,
    'x',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    '.',
    0,
    'IM',
    '=',
  ];
  const handleColorModeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.style.background = isDarkMode
      ? 'linear-gradient(to left, #232526, #414345)'
      : 'linear-gradient(to right, #abbaab, #ffffff)';
  }, [isDarkMode]);
 


  const handleButtonPress = (content) => {
    if (!isNaN(content) || content === '.') {
      setOperationOnGoing(true)
      if (operator === null) {
        setFirstNumber((prev) => prev + content);
        setCurrentInput((prev) => prev + content);
      } else {
        setSecondNumber((prev) => {
          const newSecondNumber = prev + content;
          setCurrentInput(newSecondNumber);
          return newSecondNumber;
        });
      }
    } else if (content === '+/-') {
      if (operator === null) {
        setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
        setCurrentInput((prev) => (parseFloat(prev) * -1).toString());
      } else {
        setSecondNumber((prev) => (parseFloat(prev) * -1).toString());
        setCurrentInput((prev) => (parseFloat(prev) * -1).toString());
      }
    }else if (content === 'AC') {
      setOperationOnGoing(false)
      setFirstNumber('');
      setSecondNumber('');
      setOperator(null);
      setCurrentInput('');
      setCalcHistory('');
      setResult('');
      setIsResultShown(false);
    } else if (content === '=') {
      let calcResult = '';
      switch (operator) {
        case '+':
          calcResult = parseFloat(firstNumber) + parseFloat(secondNumber);
          break;
        case '-':
          calcResult = parseFloat(firstNumber) - parseFloat(secondNumber);
          break;
        case 'x':
          calcResult = parseFloat(firstNumber) * parseFloat(secondNumber);
          break;
        case '/':
          calcResult = parseFloat(firstNumber) / parseFloat(secondNumber);
          break;
        case '%':
          calcResult = parseFloat(firstNumber) % parseFloat(secondNumber);
          break;
        default:
          break;
      }
      setResult(calcResult);
      setCalcHistory(`${firstNumber} ${operator} ${secondNumber} `);
      setFirstNumber(calcResult.toString());
      setSecondNumber('');
      setOperator(null);
      setCurrentInput('');
      setIsResultShown(true);
    }else if (content === 'IM') {
      if (operator === null) {
        setFirstNumber((prev) => prev.slice(0, -1));
        setCurrentInput((prev) => prev.slice(0, -1));
      } else {
        setSecondNumber((prev) => prev.slice(0, -1));
        setCurrentInput((prev) => prev.slice(0, -1));
      }
    } else {
      if (isResultShown) {
        setFirstNumber(result.toString());
        setSecondNumber('');
        setCurrentInput(result);
        setIsResultShown(false);

      } else {
        setOperator(content);
      }
      setOperator(content);
    }
  };

console.log(operator)


  return (
    <div className="App">
      <div className="colorMode">
        <input
          type="checkbox"
          name="colorMode"
          id="colorMode"
          onChange={handleColorModeChange}
        />
        <label htmlFor="colorMode">
          <svg
            className="night"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5739 1.11056L13.7826 2.69316C13.7632 2.73186 13.7319 2.76325 13.6932 2.7826L12.1106 3.5739C11.9631 3.64761 11.9631 3.85797 12.1106 3.93167L13.6932 4.72297C13.7319 4.74233 13.7632 4.77371 13.7826 4.81241L14.5739 6.39502C14.6476 6.54243 14.858 6.54243 14.9317 6.39502L15.723 4.81241C15.7423 4.77371 15.7737 4.74232 15.8124 4.72297L17.395 3.93167C17.5424 3.85797 17.5424 3.64761 17.395 3.5739L15.8124 2.7826C15.7737 2.76325 15.7423 2.73186 15.723 2.69316L14.9317 1.11056C14.858 0.963147 14.6476 0.963148 14.5739 1.11056Z" />
            <path d="M19.2419 5.07223L18.4633 7.40815C18.4434 7.46787 18.3965 7.51474 18.3368 7.53464L16.0009 8.31328C15.8185 8.37406 15.8185 8.63198 16.0009 8.69276L18.3368 9.4714C18.3965 9.4913 18.4434 9.53817 18.4633 9.59789L19.2419 11.9338C19.3027 12.1161 19.5606 12.1161 19.6214 11.9338L20.4 9.59789C20.42 9.53817 20.4668 9.4913 20.5265 9.4714L22.8625 8.69276C23.0448 8.63198 23.0448 8.37406 22.8625 8.31328L20.5265 7.53464C20.4668 7.51474 20.42 7.46787 20.4 7.40815L19.6214 5.07223C19.5606 4.88989 19.3027 4.88989 19.2419 5.07223Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4075 13.6642C13.2348 16.4915 17.6517 16.7363 20.6641 14.3703C20.7014 14.341 20.7385 14.3113 20.7754 14.2812C20.9148 14.1674 21.051 14.0479 21.1837 13.9226C21.2376 13.8718 21.2909 13.8201 21.3436 13.7674C21.8557 13.2552 22.9064 13.5578 22.7517 14.2653C22.6983 14.5098 22.6365 14.7517 22.5667 14.9905C22.5253 15.1321 22.4811 15.2727 22.4341 15.4122C22.4213 15.4502 22.4082 15.4883 22.395 15.5262C20.8977 19.8142 16.7886 23.0003 12 23.0003C5.92487 23.0003 1 18.0754 1 12.0003C1 7.13315 4.29086 2.98258 8.66889 1.54252L8.72248 1.52504C8.8185 1.49401 8.91503 1.46428 9.01205 1.43587C9.26959 1.36046 9.5306 1.29438 9.79466 1.23801C10.5379 1.07934 10.8418 2.19074 10.3043 2.72815C10.251 2.78147 10.1987 2.83539 10.1473 2.88989C10.0456 2.99777 9.94766 3.10794 9.8535 3.22023C9.83286 3.24485 9.8124 3.26957 9.79212 3.29439C7.32966 6.30844 7.54457 10.8012 10.4075 13.6642ZM8.99331 15.0784C11.7248 17.8099 15.6724 18.6299 19.0872 17.4693C17.4281 19.6024 14.85 21.0003 12 21.0003C7.02944 21.0003 3 16.9709 3 12.0003C3 9.09163 4.45653 6.47161 6.66058 4.81846C5.41569 8.27071 6.2174 12.3025 8.99331 15.0784Z"
            />
          </svg>
          <svg
            className="sun"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
            />
          </svg>
        </label>
      </div>
      <div
        className={
          !isDarkMode ? 'calculatorBody lightBackground' : 'calculatorBody'
        }>
        <div className="resultSection">
          <div className="resultDisplay">
            <div className="calcHistory">
            {calcHistory}
            </div>
            <div>{isResultShown ? `= ${result}` : currentInput}</div>
          </div>
        </div>
        <div className="buttonContainer">
          {buttonContents.map((content, index) => (
            <div
              className={`${
                index === 0 || index === 1 || index === 2
                  ? 'eachButton greenColor'
                  : 'eachButton'
              } ${
                index === 3 ||
                index === 7 ||
                index === 11 ||
                index === 15 ||
                index === 19
                  ? 'eachButton redColor'
                  : 'eachButton'
              } 
              ${
                content === operator ? 'operatorPressed' : ''
              } `}
              key={index}
              onClick={() => handleButtonPress(content)}
              
              >
               {index === 18 ? (
                <img src={backspaceImage} alt="Backspace" />
              ) : (
                content === "AC" && operationOnGoing ? "C" : content
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
