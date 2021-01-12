from flask_restful import Api
from config import app

import os

from api.image import ImageApi
from api.video import VideoApi
from api.frame import FrameApi

api = Api(app)

api.add_resource(ImageApi, '/image', '/image/')
api.add_resource(VideoApi, '/video', '/video/')
api.add_resource(FrameApi, '/frame', '/frame/')
