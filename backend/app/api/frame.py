from flask import send_file, request
from flask_restful import Resource

import cv2

from lib.utils import download_video, prepare_stats, in_darknet
from lib.utils import in_darknet

class FrameApi(Resource):
    @in_darknet
    def post(self):
        json_data = request.get_json(force=True)
        video_path = 'result-video.mp4'
        image_output_path = 'requested_frame.jpg'
        frame_id = json_data['frame_id']

        vidcap = cv2.VideoCapture(video_path)
        fps = int(vidcap.get(cv2.CAP_PROP_FPS))
        rate = 1 / fps * 1000

        vidcap.set(cv2.CAP_PROP_POS_MSEC, frame_id * rate)

        hasFrames, image = vidcap.read()
        if hasFrames:
            cv2.imwrite(image_output_path, image)
            return send_file(image_output_path, attachment_filename=image_output_path, mimetype='image/jpg')
        else:
            return 'Frame doesn\'t exist'
