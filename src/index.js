import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./Components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Ok", "Good", "Great"]}
    />
    <StarRating
      maxRating={5}
      size={82}
      color="red"
      className="test"
      defaultRating={3}
    />
  </React.StrictMode>
);
