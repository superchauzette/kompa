import { LoaderFunction, useLoaderData, useNavigate } from "remix";
import { Album, getAlbumBySlug, Track } from "~/data/apiClient";
import { RiArrowLeftLine } from "react-icons/ri";
import { useTrack } from "~/components/trackContext";

type Data = {
  album: Album;
};

export const loader: LoaderFunction = async ({ params }): Promise<Data> => {
  const { name, albumname } = params;
  const album = await getAlbumBySlug(String(name), String(albumname));
  return { album };
};

export default function TrackList() {
  const { album } = useLoaderData<Data>();
  const navigate = useNavigate();
  const { setTrackSelected, setAlbumSelected, trackSelected } = useTrack();

  return (
    <div className="track_page">
      <button onClick={() => navigate(-1)}>
        <RiArrowLeftLine color="white" fontSize={30} />
      </button>

      <div className="track_album_hero">
        <img src={album.url} alt="pochette" />
        <div>
          <h1>{album.name}</h1>
          <h2>{album.artist}</h2>
        </div>
      </div>

      <div className="trackContainer">
        {album.tracks
          .sort((a, b) => a.trackNumber - b.trackNumber)
          .map((track) => (
            <Track
              key={track.trackNumber}
              selected={track.url === trackSelected?.url}
              track={track}
              onClick={() => {
                setAlbumSelected(album);
                setTrackSelected(track);
              }}
            />
          ))}
      </div>
    </div>
  );
}

type TrackProps = {
  track: Track;
  selected: boolean;
  onClick: () => void;
};

function Track({ track, selected, onClick }: TrackProps) {
  return (
    <div className={selected ? "track track_selected" : "track"} onClick={onClick}>
      <div className="track_title">
        <p style={{ marginRight: "12px" }}>{track.trackNumber}</p>
        <div>
          <p style={{ fontWeight: selected ? "bold" : "normal" }}>{track.title}</p>
          <p>{track.artist}</p>
        </div>
      </div>
    </div>
  );
}
