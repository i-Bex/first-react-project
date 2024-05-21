import { useState, useEffect } from "react";

function Quote({ adviceNumber, quoteText, errorMessage }) {
  return (
    <>
      <p className="quote-container__advice-number">advice # {adviceNumber}</p>
      <h2 className="quote-container__quote">
        {quoteText ? `"${quoteText}"` : errorMessage ? "" : "Loading Quote..."}
      </h2>
      {errorMessage && (
        <h2 className="quote-container__error-message">{errorMessage}</h2>
      )}
    </>
  );
}

function GenerateQuoteBtn({ generateQuote }) {
  return (
    <>
      <button
        type="button"
        className="quote-container__generate-quote-btn"
        aria-label="generate advice"
        onClick={generateQuote}
      >
        <img
          src="../images/icon-dice.svg"
          alt=""
          height={24}
          width={24}
          aria-hidden="true"
        ></img>
      </button>
    </>
  );
}

function App() {
  const [quote, setQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchQuote = async () => {
    try {
      setQuote(null);
      setErrorMessage(null);
      const quoteRequest = await fetch("https://api.adviceslip.com/advice");
      const quoteResponse = await quoteRequest.json();
      setQuote(quoteResponse);
    } catch (error) {
      setErrorMessage("Failed to Load Advice");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <Quote
        adviceNumber={quote?.slip?.id}
        quoteText={quote?.slip?.advice}
        errorMessage={errorMessage}
      ></Quote>
      <div className="quote-container__separator"></div>
      <GenerateQuoteBtn generateQuote={fetchQuote}></GenerateQuoteBtn>
    </>
  );
}

export default App;