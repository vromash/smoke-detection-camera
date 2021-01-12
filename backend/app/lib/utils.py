import cv2
import os, sys
import requests

from config import darknet_path
import shlex
import subprocess
import datetime

def in_darknet(func):
    def wrapper_in_darknet(*args, **kwargs):        
        os.chdir(darknet_path)
        try:
            return func(*args, **kwargs)
        except:
            e = sys.exc_info()[0]
            print('Error has occured', e)
    return wrapper_in_darknet

def prepare_stats(path):
    video_data = get_video_data(path)
    return {
        'frame_number': 0,
        'fps': video_data[1]
    }

def get_video_data(path):
    cap = cv2.VideoCapture(path)
    length = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    return (length, fps)

@in_darknet
def download_video(url):
    filename = f'build/darknet/x64/data/obj/test-video.mp4'
    command = f'youtube-dl -f \'[ext=mp4]\' -o {filename} {url}'
    process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
    process_alive = True
    while process_alive:
        output = process.stdout.readline()
        print(output)
        if output == b'' and process.poll() is not None:
            process_alive = False
            return filename

@in_darknet
def download_image(url):
    filename = f'build/darknet/x64/data/obj/test.jpg'
    command = f'wget {url} -O {filename}'
    process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
    process_alive = True
    while process_alive:
        output = process.stdout.readline()
        print(output)
        if output == b'' and process.poll() is not None:
            process_alive = False
            print(filename)
            return filename
