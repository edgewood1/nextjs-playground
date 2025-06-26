#!/bin/bash

for i in *.mp3 *.m4a; do
  # Extract the first two words of the filename
  first_word=$(echo "$i" | cut -d ' ' -f 1)
  second_word=$(echo "$i" | cut -d ' ' -f 2)
  new_filename="${first_word}_${second_word}.${i##*.}"

  ffmpeg -i "$i" -ss 0 -to 40 -c copy "$new_filename"

  if [[ $? -eq 0 ]]; then
    rm "$i"
  fi
done