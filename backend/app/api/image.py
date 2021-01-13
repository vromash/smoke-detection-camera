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

        command = f'./content/darknet/darknet detector test \
            build/darknet/x64/data/obj.data \
            cfg/yolov4-tiny-obj.cfg \
            build/darknet/x64/backup/yolov4-tiny-obj_final.weights { image_path } -i 0 -thresh 0.20'

        process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
        process_alive = True
        while process_alive:
            output = process.stdout.readline()
            if print_output:
                print(output)

            if output == b'' and process.poll() is not None:
                process_alive = False  

        return send_file(darknet_path + '/predictions.jpg', mimetype='image/jpg')
        