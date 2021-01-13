from flask import send_file, request
from flask_restful import Resource
from config import darknet_path

from lib.utils import download_image, in_darknet

import shlex
import subprocess
import os

from lib.utils import in_darknet

class ImageApi(Resource):
    @in_darknet
    def post(self):
        json_data = request.get_json(force=True)

        url = json_data['url']
        print_output = json_data['print_output']

        image_path = download_image(url)

        command = f'./darknet detector test \
            build/darknet/x64/data/obj.data \
            cfg/yolov4-tiny-obj.cfg \
            build/darknet/x64/backup/yolov4-tiny-obj_last.weights { image_path } -i 0 -thresh 0.20'

        process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
        with open('out1.txt', 'w') as f1:
            print(process, command, file=f1) 
        process_alive = True
        while process_alive:
            output = process.stdout.readline()
            with open('out2.txt', 'w') as f2:
                print(output, file=f2) 
            if print_output:
                print(output)

            if output == b'' and process.poll() is not None:
                process_alive = False

        return send_file(darknet_path + '/predictions.jpg', mimetype='image/jpg')
        