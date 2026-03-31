import "./App.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

function App() {
  return (
    <>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section5></Section5>
      <Section4></Section4>
      <div style={{ padding: "75% 0 0 0", position: "relative" }}>
        <iframe
          src="https://player.vimeo.com/video/1178566213?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          title="CODMOBILEBL9_16"
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
}

export default App;
