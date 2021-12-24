import { Link, Outlet } from "remix";
import { useEffect, useRef, useState } from "react";
import { RiPlayCircleFill, RiPauseCircleFill, RiSkipForwardFill } from "react-icons/ri";
import { useTrack } from "~/components/trackContext";

export default function ArtistsPage() {
  return (
    <main>
      <Outlet />
      <footer>
        <PlayerAudio />
      </footer>
    </main>
  );
}

function PlayerAudio() {
  const ref = useRef<HTMLAudioElement>();
  const [isPlay, setIsPlay] = useState(false);
  const { trackSelected, albumSelected } = useTrack();
  const src = trackSelected?.url;

  useEffect(() => {
    const audio = new Audio();
    ref.current = audio;
  }, []);

  useEffect(() => {
    if (src && ref.current) {
      ref.current.src = src;
      ref.current?.play();
      setIsPlay(true);
    }
  }, [src]);

  if (!Boolean(trackSelected)) return null;

  return (
    <div className="playerAudioContainer">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Link
          to={`/artists/${albumSelected?.slugArtist}/albums/${albumSelected?.slugAlbum}`}
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <div style={{ padding: "0 10px", height: "calc(100% - 10px)" }}>
            <img src={albumSelected?.url} alt="pochette album" height="100%" style={{ borderRadius: "5px" }} />
          </div>
          <div style={{ marginRight: "20px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontWeight: "bold" }}>{trackSelected?.title}</p>
            <p>{trackSelected?.artist}</p>
          </div>
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginRight: "6px" }}>
        {isPlay ? (
          <RiPauseCircleFill
            style={{ cursor: "pointer" }}
            onClick={() => {
              ref.current?.pause();
              setIsPlay(false);
            }}
            fontSize={50}
            color="#847BDD"
          />
        ) : (
          <RiPlayCircleFill
            style={{ cursor: "pointer" }}
            onClick={() => {
              ref.current?.play();
              setIsPlay(true);
            }}
            fontSize={50}
            color="#847BDD"
          />
        )}
        <RiSkipForwardFill style={{ cursor: "pointer" }} fontSize={25} />
      </div>
    </div>
  );
}
