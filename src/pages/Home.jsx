import { useEffect, useMemo, useState } from "react";
import Trivia from "../components/Trivia";
import Timer from "../components/Timer";
import { data } from "../data";
import Start from "../components/Start";

const Home = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOver, setTimeOver] = useState(false);
  const [score, setScore] = useState("$0");
  const [userName, setUserName] = useState(null);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1000" },
        { id: 6, amount: "$ 2000" },
        { id: 7, amount: "$ 4000" },
        { id: 8, amount: "$ 8000" },
        { id: 9, amount: "$ 16000" },
        { id: 10, amount: "$ 32000" },
        { id: 11, amount: "$ 64000" },
        { id: 12, amount: "$ 125000" },
        { id: 13, amount: "$ 250000" },
        { id: 14, amount: "$ 500000" },
        { id: 15, amount: "$ 1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setScore(
        moneyPyramid.find((each) => each.id === questionNumber - 1).amount
      );
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="home">
      {userName ? (
        <>
          <main className="main">
            {timeOver ? (
              <h1 className="end-text">
                {userName} you earned: {score}
              </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOver={setTimeOver}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setTimeOver={setTimeOver}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </main>
          <div className="pyramid">
            <ul className="money-list">
              {moneyPyramid.map((item) => (
                <li
                  key={item.id}
                  className={questionNumber === item.id ? "active" : ""}
                >
                  <span className="number"> {item.id} </span>
                  <span className="amount">{item.amount} </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
};

export default Home;
