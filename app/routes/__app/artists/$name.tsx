import { Link, LoaderFunction, useLoaderData, useParams } from "remix";
import { getAlbumsByArtist, Album as AlbumType } from "~/data/apiClient";

type Data = {
  albums: AlbumType[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const albums = await getAlbumsByArtist(String(params.name));
  return { albums };
};

export default function Albums() {
  const { albums } = useLoaderData<Data>();
  const params = useParams();

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <h2 style={{ margin: "16px" }}>{params.name}</h2>
      <div className="albumContainer">
        {albums.map((album) => (
          <Album key={album.name} album={album} />
        ))}
      </div>
    </div>
  );
}

function Album({ album }: { album: AlbumType }) {
  return (
    <Link to={`albums/${album.slugAlbum}`}>
      <img src={album.url} alt="pochette" width="200px" style={{ borderRadius: "20px" }} />
      <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>{album.name}</p>
      <p style={{ fontStyle: "italic" }}> {album.artist}</p>
    </Link>
  );
}
