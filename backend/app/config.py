from flask import Flask
import os

app = Flask(__name__)
darknet_path = os.getcwd() + '/darknet'
