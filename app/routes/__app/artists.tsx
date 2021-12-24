import { LoaderFunction, NavLink, Outlet, useLoaderData, Form } from "remix";
import { getArtists, Artist } from "~/data/apiClient";

type Data = {
  artists: Artist[];
};

export const loader: LoaderFunction = async () => {
  const artists = await getArtists();
  return { artists };
};

export default function ArtistsPage() {
  const { artists } = useLoaderData<Data>();

  return (
    <div style={{ padding: "16px 0 0 0" }}>
      <h1 style={{ margin: "0 16px" }}>Kompa Musics</h1>
      <Form method="get" style={{ margin: "16px" }}>
        <input type="search" name="q" placeholder="Search ..." />
      </Form>
      <h2 style={{ margin: "16px" }}>Artists</h2>
      <div className="artistContainer">
        {artists.map((artist) => (
          <ArtistItem key={artist.name} artist={artist} />
        ))}
      </div>
      <Outlet />
    </div>
  );
}

function ArtistItem({ artist }: { artist: Artist }) {
  return (
    <NavLink
      to={"/artists/" + artist.slug}
      className={({ isActive }) => `artistItem ${isActive ? "artistItem_selected" : ""}`}
    >
      <p>{artist.name}</p>
    </NavLink>
  );
}
