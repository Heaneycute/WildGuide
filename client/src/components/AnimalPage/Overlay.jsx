import { useEffect, useState } from "react";
import { scenes } from "./Experience";

export default function Overlay({sceneId, setSceneId}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);
  return (
    <>
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          bottom: "0px",
          left: "0px",
          right: "0px",
          top: "0px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "rgb(0,0,0)",
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s'
        }}
      >
        <svg style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2rem",
            width: "10rem"}}
          viewBox="0 0 342 35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"
            fill="currentColor"
          ></path>
        </svg>
        <div style={{position: "absolute",
  bottom: "0px",
  left: "0px",
  right: "0px",
  top: "0px",
  display: "flex",
  flex: "1 1 0%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem"}}>
          <svg
            onClick={() => {
              setSceneId((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
            }
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{pointerEvents: "auto",
  height: "2.5rem",
  width: "2.5rem",
  cursor: "pointer",
  transition: "opacity 0.2s",
  ":hover": { opacity: 0.6 }
}}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>   <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{pointerEvents: "auto",
              height: "2.5rem",
              width: "2.5rem",
              cursor: "pointer",
              transition: "opacity 0.2s",
              ":hover": { opacity: 0.6 }
            }}
            onClick={() =>{
              setSceneId((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
            }
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: "linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent)",
          padding: "1rem",
          paddingBottom: "2.5rem",
          paddingTop: "5rem",
          textAlign: "center"}}
        >
          <h1 style={{fontSize: "3rem", lineHeight: 1, fontWeight: 800}}>
            {scenes[sceneId].name}
          </h1>
          <p style={{fontStyle: "italic", opacity: 0.6}}>
            {scenes[sceneId].description}
          </p>
          <div style={{marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "3rem"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{height: "1.25rem", width: "1.25rem"}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <p style={{fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: 600}}>
                  ${scenes[sceneId].price.toLocaleString()}
                </p>
              </div>
              <p style={{fontSize: "0.875rem", lineHeight: "1.25rem", opacity: 0.8}}>After Federal Tax Credit</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{height: "1.5rem", width: "1.5rem"}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                  />
                </svg>
                <p style={{fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: 600}}>
                  {scenes[sceneId].range}km
                </p>
              </div>
              <p style={{fontSize: "0.875rem", lineHeight: "1.25rem", opacity: 0.8}}>With one single charge</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};