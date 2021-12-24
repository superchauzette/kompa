import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Album, Track } from "~/data/apiClient";

type Value = {
  albumSelected?: Album;
  setAlbumSelected: React.Dispatch<React.SetStateAction<Album>>;
  trackSelected?: Track;
  setTrackSelected: React.Dispatch<React.SetStateAction<Track>>;
};

const context = createContext<Value>({
  albumSelected: undefined,
  setAlbumSelected: () => {},
  trackSelected: undefined,
  setTrackSelected: () => {},
});

export function TrackProvider({ children }: { children: ReactNode }) {
  const [albumSelected, setAlbumSelected] = useState<Album>(() => {
    try {
      return localStorage.getItem("albumSelected")
        ? JSON.parse(localStorage.getItem("albumSelected") || "")
        : undefined;
    } catch {
      return;
    }
  });
  const [trackSelected, setTrackSelected] = useState<Track>(() => {
    try {
      return localStorage.getItem("trackSelected")
        ? JSON.parse(localStorage.getItem("trackSelected") || "")
        : undefined;
    } catch {
      return;
    }
  });

  useEffect(() => {
    if (albumSelected) localStorage.setItem("albumSelected", JSON.stringify(albumSelected));
  }, [albumSelected]);

  useEffect(() => {
    if (trackSelected) localStorage.setItem("trackSelected", JSON.stringify(trackSelected));
  }, [trackSelected]);

  const value = {
    albumSelected,
    setAlbumSelected,
    trackSelected,
    setTrackSelected,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useTrack() {
  return useContext(context);
}
