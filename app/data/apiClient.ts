const baseURL = "https://superchauzette.github.io/api-kompa/api";

export async function getArtists(): Promise<Artist[]> {
  try {
    const res = await fetch(baseURL + "/artists.json");
    const artists: Artist[] = await res.json();
    return artists;
  } catch {
    return [];
  }
}

export async function getAlbumsByArtist(artist: string): Promise<Album[]> {
  try {
    const res = await fetch(baseURL + "/albums.json");
    const albums: Album[] = await res.json();
    const albumsByArtist = albums
      .filter((a) => a.slugArtist === artist)
      ?.map((a) => ({ ...a, url: `${baseURL}${a.url}` }));

    if (!albumsByArtist) throw new Response("Rien trouvé", { status: 404 });
    return albumsByArtist;
  } catch {
    return [];
  }
}

export async function getAlbumBySlug(slugArtist: string, slugAlbum: string): Promise<Album> {
  const albums = await getAlbumsByArtist(slugArtist);
  const album = albums.find((a) => a.slugAlbum === slugAlbum);
  if (!album) throw new Response("Rien trouvé", { status: 404 });
  const toto = { ...album, tracks: album.tracks.map((t) => ({ ...t, url: `${baseURL}${t.url}` })) };
  console.log({ toto });
  return toto;
}

export type Artist = {
  name: string;
  url: string;
  slug: string;
};

export type Album = {
  slugAlbum: string;
  slugArtist: string;
  artist: string;
  name: string;
  url: string;
  tracks: Track[];
};

export type Track = {
  url: string;
  title: string;
  artist: string;
  trackNumber: number;
  genre: string;
  album: string;
};
