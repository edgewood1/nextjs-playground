import React, { useState, useEffect, useRef } from 'react';
import { Button as MantineButton } from '@mantine/core'; // Import Mantine Button

function AudioPlayer() {
  const [currentSong, setCurrentSong] = useState('');
  const [selectedSong, setSelectedSong] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = ['Ida Red', 'Mississippi Sawyer', 'Molly Hare', 'Road to Malvern', 'Johnny dont get drunk'];

  const map: {[key:string]: any} = {
    'Ida Red': 'ida_red.mp3', 
    'Molly Hare': 'old_molly.mp3',
    'Mississippi Sawyer': 'miss_sawyer.mp3',
    'Road to Malvern': 'road_to.m4a',
    'Johnny dont get drunk': 'johnny_dont.m4a',

  }

  const loadRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const songName = songs[randomIndex];
    const songTitle = map[songName];
    setCurrentSong(songName);
    setSelectedSong('');
    setIsCorrect(false);

    if (audioRef.current) {
      audioRef.current.src = `/${songTitle}`; // Assuming your files are named like 'Ida Red.mp3'
      audioRef.current.load(); // Load the new audio source
    }
  };

  useEffect(() => {
    loadRandomSong(); // Load a random song when the component mounts
  }, []);

  const handleSongSelect = (song: string) => {
    setSelectedSong(song);
    setIsCorrect(song === currentSong);

    if (song === currentSong) {
      setTimeout(loadRandomSong, 2000); // Load a new song after 2 seconds
    }
  };

  
  const createSongChoices = () => {
    // Shuffle the songs array to create random choices
    const shuffledSongs = [...songs].sort(() => 0.5 - Math.random());
    return shuffledSongs.map((song) => (
      <MantineButton
        key={song}
        onClick={() => handleSongSelect(song)}
        variant="outline" // Example: choose a Mantine variant
        m="xs" // Add some margin
        // sx={{ ... }} // Add custom styles here if needed to replicate button.css
      >
        {song}
      </MantineButton>
    ));
  };

  return (
    <div>
      <audio ref={audioRef} controls />

      <div>
        {createSongChoices()}
      </div>

      {selectedSong && (
        <div>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;