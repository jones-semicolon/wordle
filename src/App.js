import "./App.css";
import { ReactComponent as Instruction } from "./instruction.svg";
import { ReactComponent as Settings } from "./settings.svg";
import { useState, useEffect } from "react";
import { getWord, dictionary } from "./Api";
import { Setting, GameOver, HowTo } from "./Menu";
import Notification from "./Notification";

function App() {
  const [value, setValue] = useState([]);
  const [word, setWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [notification, setNotification] = useState("");
  const [menu, setMenu] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [menuType, setMenuType] = useState("");
  const [letters, setLetters] = useState(5);
  const [rows, setRows] = useState(6);

  useEffect(() => {
    if (word === "") {
      getWord(letters).then((e) => setWord(e.data[0]));
    }
  }, [letters, word]);

  // const detectKeyDown = (e) => {
  //   if(/^[a-zA-Z]$/.test(e.key) && value.length <= letters - 1) {
  //     setValue(value.concat((e.key).toLowerCase()))
  //   } else if (e.key === "Backspace" && value.length) {
  //     setValue(value.length -= 1)
  //   } else if (e.key === "Enter") {
  //     submittedWord()
  //   }
  //   // console.log(value)
  // }

  const typing = (e) => {
    if (e.target.value) {
      setValue(e.target.value.toLowerCase().replace(/\W/g, "").split(""));
    } else {
      setValue([]);
    }
  };

  useEffect(() => {
    // document.addEventListener('keyup', detectKeyDown, true);
    const selectedRow = document.body.querySelectorAll(
      '[aria-selected="true"] [aria-label="blank"]'
    );
    selectedRow.forEach((tile, i) => {
      tile.innerText = typeof value[i] === "undefined" ? "" : value[i];
    });

    if (currentRow === rows) {
      //console.log("hello");
      setMenuType("gameover");
      setGameStatus(false);
      setMenu(true);
      input.reset();
      input.disable();
      return;
    }
  }, [value, currentRow]);

  const submittedWord = (e) => {
    e?.preventDefault();
    input.disable();
    if (value.length === letters) {
      dictionary(value.join(""))
        .then((e) => {
          if (e && value.join("") === word) {
            setNotification("sheesh");
            document.body
              .querySelectorAll(`[aria-selected="true"] [aria-label="blank"]`)
              .forEach((tile) => tile.setAttribute("aria-label", "correct"));
            setMenu(true);
            setMenuType("gameover");
            setGameStatus(true);
            input.reset();
          } else if (e) {
            checkWord(value);
            input.reset();
            input.enable();
            setCurrentRow(currentRow + 1);
            changeRow();
          } else if (!e) {
            if (word === value.join("")) {
              setMenu(true);
              setGameStatus(true);
              input.reset();
            } else {
              setNotification("Not a word");
              input.enable();
            }
          }
        })
        .catch(() => null);
    } else {
      setNotification("Too Short");
      input.enable();
    }
  };

  const input = {
    reset: () => {
      document.body.querySelector("input").value = "";
      setValue([]);
    },
    disable: () => {
      document.body.querySelector("input").setAttribute("disabled", "disabled");
    },
    enable: () => {
      document.body.querySelector("input").removeAttribute("disabled");
    },
  };

  function checkWord(value) {
    value.forEach((v, index) => {
      if (word.includes(v)) {
        //console.log(value[index], word.split("")[index]);
        if (value[index] === word.split("")[index]) {
          document.body
            .querySelector(
              `[aria-selected="true"] > :nth-child(${
                index + 1
              }) > [aria-label="blank"]`
            )
            .setAttribute("aria-label", "correct");
        } else {
          document.body
            .querySelector(
              `[aria-selected="true"] > :nth-child(${
                index + 1
              }) > [aria-label="blank"]`
            )
            .setAttribute("aria-label", "maybe");
        }
      } else {
        document.body
          .querySelector(
            `[aria-selected="true"] > :nth-child(${
              index + 1
            }) > [aria-label="blank"]`
          )
          .setAttribute("aria-label", "wrong");
      }
      setValue("");
    });
  }

  function changeRow() {
    document.body
      .querySelector('.row[aria-selected="true"]')
      .setAttribute("aria-selected", false);
    document.body
      .querySelectorAll("[aria-selected=false]")
      [currentRow].setAttribute("aria-selected", "true");
  }

  function resetGame() {
    document.body.querySelectorAll(".tile > *").forEach((e) => {
      e.setAttribute("aria-label", "blank");
      e.innerText = "";
    });
    document.body
      .querySelectorAll(".row")
      .forEach((e) => e.setAttribute("aria-selected", "false"));
    setCurrentRow(0);
    setWord("");
    input.reset();
    input.enable();
    setMenu(false);
  }

  return (
    <div className="App">
      <div className="container">
        <nav>
          <Instruction
            className="icon"
            onClick={() => {
              setMenu(true);
              setMenuType("instruction");
            }}
          />
          <h1>wordle</h1>
          <Settings
            className="icon"
            onClick={() => {
              setMenu(true);
              setMenuType("settings");
            }}
          />
        </nav>
        <Notification
          notification={notification}
          setNotif={(e) => setNotification(e)}
        />
        <form className="board" onSubmit={submittedWord}>
          <input type="text" onChange={typing} maxLength={letters} />
          {[...Array(rows)].map((e, i) => (
            <div
              className="row"
              id={i}
              aria-selected={i === currentRow ? true : false}
            >
              {[...Array(letters)].map((e, i) => (
                <div className="tile">
                  <div aria-label="blank" key={i}></div>
                </div>
              ))}
            </div>
          ))}
        </form>
        <div className="menu" style={{ display: menu ? "block" : "none" }}>
          {menuType === "gameover" ? (
            <GameOver word={word} onClick={resetGame} status={gameStatus} />
          ) : menuType === "instruction" ? (
            <HowTo onClick={() => setMenu(false)} />
          ) : menuType === "settings" ? (
            <Setting onClick={() => setMenu(false)} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
