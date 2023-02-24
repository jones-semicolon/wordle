import { useState, useEffect } from "react";

export default function Notification(props) {
  const [fade, setFade] = useState(true);
  useEffect(() => {
    if (props.notification.length) {
      setFade(false);
      setTimeout(function () {
        setFade(true);
        props.setNotif("");
      }, 2800);
    }
    console.log(fade);
  }, [props]);

  return (
    <div
      className="notification"
      style={{ display: props.notification.length ? "block" : "none" }}
      aria-hidden={fade}
    >
      {props.notification ? props.notification : null}
    </div>
  );
}
