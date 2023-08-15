import sys
from pytube import YouTube
import os

url = sys.argv[1]
yt = YouTube(url)
  
video = yt.streams.filter(only_audio=True).first()
  
destination = './downloadYoutube'
  
out_file = video.download(output_path=destination)
  
base, ext = os.path.splitext(out_file)
new_file = base + '.mp3'
os.rename(out_file, new_file)

print(yt.title + " has been successfully downloaded.")
