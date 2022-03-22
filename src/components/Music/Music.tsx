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
  const [filteredArtists, setFilteredArtists] = useState<Set<string>>(new Set()); // A list of filtered artists

  // Toggle filtering a single artist
  function toggleFilteredArtist(id: string) {
    filteredArtists.has(id)
      ? filteredArtists.delete(id)
      : filteredArtists.add(id);
    setFilteredArtists(new Set(filteredArtists));
  }

  // Persist filtered artists on refresh
  useEffect(() => {
    const filteredArtistsString = window.sessionStorage.getItem('filtered_artists');
    if (filteredArtistsString) {
      setFilteredArtists(new Set(filteredArtistsString.split(',')));
    }
  }, []);
  useEffect(() => {
    const filteredArtistsString = Array.from(filteredArtists).join(',');
    window.sessionStorage.setItem('filtered_artists', filteredArtistsString);
  }, [filteredArtists]);

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
          <div className={styles.artistsContainerHeader}>
            <h3 className={styles.sectionHeading}>Filter Artists</h3>
            {
              // Only display clear filters button when filters are set
              filteredArtists.size > 0 &&
                <button onClick={() => setFilteredArtists(new Set())}>
                  <p>clear</p>
                </button>
            }
          </div>
          <ArtistList>
            {
              artists.map(({ id, name }) => (
                <ArtistListItem
                  key={id}
                  name={name}
                  isFiltered={filteredArtists.has(id)}
                  onClick={() => toggleFilteredArtist(id)}
                />
              ))
            }
          </ArtistList>
        </div>
        <div className={styles.tracksContainer}>
          <div className={styles.tracksContainerHeader}>
            <h3 className={styles.sectionHeading}>Recently Played Tracks</h3>
          </div>
          <TrackGrid>
            {
              // Filter tracks by artist:
              // - If there are no filters set display all artists
              // - Else just display filtered artists
              tracks.filter(({ artistId }) => {
                return filteredArtists.size === 0 || filteredArtists.has(artistId);
              }).map(({ id, name, artist, album, imageUrl }) => (
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