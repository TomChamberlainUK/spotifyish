import React, { useState, useEffect } from 'react';
import styles from './Music.module.scss';
import ArtistList, { ArtistListItem } from '../ArtistList/ArtistList';
import TrackGrid, { TrackGridItem } from '../TrackGrid/TrackGrid';

type Props = {
  user: User;
}

type Artist = {
  id: string;
  name: string;
}

type Track = {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  imageUrl: string;
}

export default function Music({ user }: Props) {

  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  // Handle fetching data from spotify API
  useEffect(() => {

    const { accessToken } = user;

    // If there's no access token available then no requests can be made to the API
    // Reset both tracks and artists and make no further requests
    if (!accessToken) {
      setTracks([]);
      setArtists([]);
      return;
    }

    // If an access token is available then fetch recently played artists from spotify API
    // (We'll use an async IIFE to allow async/await syntax in useEffect)
    (async function fetchRecentlyPlayedData() {

      // Configure the headers for the GET request
      const fetchOptions: RequestInit = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      }

      try {
        // Send a GET request to the API and stringify the response
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', fetchOptions);
        const data = await response.json();

        // Handle errors from server
        if (data.error) {
          const { error } = data;
          throw new Error(`(${error.status}) ${error.message}`);
        }

        // Init maps to efficiently parse track/artist data and prevent duplicates with O(n) time complexity
        const uniqueTracks = new Map<string, Track>();
        const uniqueArtists = new Map<string, Artist>();

        // Loop through each track from the response
        for (const { track } of data.items) {
          const artist = track.artists[0];

          // If the track is not already mapped, add it
          if (!uniqueTracks.has(track.id)) {
            uniqueTracks.set(track.id, {
              id: track.id,
              name: track.name,
              artist: artist.name,
              artistId: artist.id,
              album: track.album.name,
              imageUrl: track.album.images[0].url,
            });
          }
          
          // If the artist is not already mapped, add them
          if (!uniqueArtists.has(artist.id)) {
            uniqueArtists.set(artist.id, {
              id: artist.id,
              name: artist.name
            });
          }
        
        }

        // Update artists and tracks state
        setTracks(Array.from(uniqueTracks.values()));
        setArtists(Array.from(uniqueArtists.values()));

      } catch(error) {
        console.error(error);
      }

    })();

  }, [user]);

  
  return (
    <>
      <h2>Music</h2>
      <div className={styles.container}>
        <div className={styles.artistsContainer}>
          <h3>Artists</h3>
          <ArtistList>
            {
              artists.map(({ id, name }) => (
                <ArtistListItem
                  key={id}
                  name={name}
                />
              ))
            }
          </ArtistList>
        </div>
        <div className={styles.tracksContainer}>
          <TrackGrid>
            {
              tracks.map(({ id, name, artist, album, imageUrl }) => (
                <TrackGridItem
                  key={id}
                  name={name}
                  artist={artist}
                  album={album}
                  imageUrl={imageUrl}
                />
              ))
            }
          </TrackGrid>
        </div>
      </div>
    </>
  );
}