from flask import send_file, request
from flask_restful import Resource

import shlex
import subprocess
import os

class FrameApi(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        path = json_data['path']
        frame_id = json_data['frame_id']

        vidcap = cv2.VideoCapture(path)
        fps = int(vidcap.get(cv2.CAP_PROP_FPS))
        rate = 1 / fps * 1000

        vidcap.set(cv2.CAP_PROP_POS_MSEC, frame_id * rate)

        hasFrames, image = vidcap.read()
        if hasFrames:
            cv2.imwrite(path, image)
            return send_file(path, attachment_filename=path, mimetype='image/jpg')
        else:
            return 'Frame doesn\'t exist'
