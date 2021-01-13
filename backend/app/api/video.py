from flask import request
from flask_restful import Resource
from config import darknet_path

import shlex
import subprocess, os

from lib.video_helper import parse_line
from lib.utils import download_video, prepare_stats, in_darknet

class VideoApi(Resource):
    @in_darknet
    def post(self):
        json_data = request.get_json(force=True)

        url = json_data['url']
        print_output = json_data['print_output']
        output_video = 'result-video.mp4'
        
        video_path = download_video(url)

        command = f'./darknet detector demo \
            build/darknet/x64/data/obj.data \
            cfg/yolov4-tiny-obj.cfg \
            build/darknet/x64/backup/yolov4-tiny-obj_last.weights \
            -thresh 0.25 -dont_show test-video.mp4 -out_filename {output_video}'

        stats = prepare_stats(video_path)

        process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
        process_alive = True

        while process_alive:
            output = process.stdout.readline()
            if print_output:
                print(output)

            parse_line(output, ['smoke', 'cigarete'], stats)

            if output == b'' and process.poll() is not None:
                process_alive = False

        return stats