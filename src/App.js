import React, { useEffect, useState } from "react";

function UnityComponent() {
  const [position] = useState(1);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/Build/UnityLoader.js";
    script.onload = () => {
      if (typeof window.UnityLoader !== "undefined") {
        window.UnityInstance = window.UnityLoader.instantiate(
          "unityContainer",
          "/Build/Downloads.json",
          {
            onProgress: (progress) => {
              console.log(`Loading progress: ${progress}`);
            },
            Module: {
              onRuntimeInitialized: () => {
                console.log("Unity runtime initialized.");
              },
            },
          }
        );
      } else {
        console.error("UnityLoader is not defined");
      }
    };

    document.body.appendChild(script);
  }, []);

  const moveCamera = (direction) => {
    if (typeof window.UnityInstance !== "undefined") {
      window.UnityInstance.SendMessage(
        "Main Camera", // GameObjectの名前を正確に指定する
        `Move${direction.charAt(0).toUpperCase() + direction.slice(1)}`,
        position
      );
    } else {
      console.error("UnityInstance is not defined");
    }
  };

  return (
    <div>
      <h1>ReactでUnityのシーンの中のカメラを動かす</h1>
      <div id="unityContainer" style={{ width: "960px", height: "600px" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button onClick={() => moveCamera("up")}>Move Up</button>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button onClick={() => moveCamera("left")}>Move Left</button>
          <button onClick={() => moveCamera("right")}>Move Right</button>
        </div>
        <button onClick={() => moveCamera("down")}>Move Down</button>
      </div>
    </div>
  );
}

export default UnityComponent;
