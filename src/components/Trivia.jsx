import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";

const Trivia = ({ data, setTimeOver, setQuestionNumber, questionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classNamos, setClassNamos] = useState("answer");
  const [startSound] = useSound(play);
  const [correctMP3] = useSound(correctSound);
  const [wrongMP3] = useSound(wrongSound);

  useEffect(() => {
    startSound();
  }, [startSound]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (e) => {
    setSelectedAnswer(e);
    setClassNamos("answer active");
    delay(3000, () => {
      setClassNamos(e.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (e.correct) {
        correctMP3();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongMP3();
        delay(1000, () => {
          setTimeOver(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question"> {question?.question} </div>
      <div className="answers">
        {question?.answers.map((e, i) => (
          <div
            key={i}
            className={selectedAnswer === e ? classNamos : "answer"}
            onClick={() => handleClick(e)}
          >
            {e.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
