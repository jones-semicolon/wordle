import { ReactComponent as Refresh } from "./refresh.svg";
import { ReactComponent as Cancel } from "./cancel.svg";




export function HowTo(props) {
  return (
    <div className="menu-container">
      <div className="settings-nav">
        <div className="title">How To Play</div>
        <Cancel className="icon" onClick={props.onClick} />
      </div>
      <div className="description">Guess the Wordle in 6 tries.</div>
      <ul>
        <li>Each guess must be a valid 5-letter word.</li>
        <li>
          The color of the tiles will change to show how close your guess was to
          the word.
        </li>
      </ul>
      <div className="sample">Examples</div>
      <div className="sample-1">
        <span>W</span>
        <span>E</span>
        <span>A</span>
        <span>R</span>
        <span>Y</span>
      </div>
      <div className="exp">W is in the word and in the correct spot</div>
      <div className="sample-2">
        <span>P</span>
        <span>i</span>
        <span>l</span>
        <span>l</span>
        <span>s</span>
      </div>
      <div className="exp">I is in the word but in the wrong spot</div>
      <div className="sample-3">
        <span>v</span>
        <span>a</span>
        <span>g</span>
        <span>u</span>
        <span>e</span>
      </div>
      <div className="exp">U is not in the word in any spot</div>
    </div>
  );
}

export function Setting(props) {
  const colorblind = (e) => {
    const right = getComputedStyle(document.documentElement).getPropertyValue('--right-color');
    const maybe = getComputedStyle(document.documentElement).getPropertyValue('--maybe-color');
    if (e.target.checked) {
      const bright = getComputedStyle(document.documentElement).getPropertyValue('--blind-right-color');
      const bmaybe = getComputedStyle(document.documentElement).getPropertyValue('--blind-maybe-color');
  
      document.body.style.setProperty("--right-color", bright)
      document.body.style.setProperty("--maybe-color", bmaybe)
    } else {
      document.body.style.setProperty("--right-color", right)
      document.body.style.setProperty("--maybe-color", maybe)
    }
  }
  return (
    <div className="menu-container">
      <div className="settings-nav">
        <div className="settings-title">Settings</div>
        <Cancel className="icon" onClick={props.onClick} />
      </div>
      <div className="switch-container">
        <div>
          <span>Colorblind Mode</span>
          <span>For improve color vision</span>
        </div>
        <label className="toggle">
          <input className="toggle-checkbox" type="checkbox" onChange={(e) => colorblind(e)}/>
          <div className="toggle-switch"></div>
        </label>
      </div>
      <div className="switch-container">
        <div>
          <span>Hard Mode</span>
          <span>Any revealed hints must be used in subsequent guesses {"(currently unnavailable)"}</span>
        </div>
        <label className="toggle">
          <input className="toggle-checkbox" type="checkbox" disabled/>
          <div className="toggle-switch"></div>
        </label>
      </div>
    </div>
  );
}

export function GameOver(props) {
  return (
    <div className="gameOver">
      <div className="title">
        {props.status ? "Congratulation" : "Game Over"}
      </div>
      <div disabled>The answer is</div>
      <div className="answer">{props.word}</div>
      <button onClick={props.onClick}>
        <Refresh className="icon" />
        Try Again
      </button>
    </div>
  );
}
