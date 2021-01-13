# Cigarete and smoke detection system
### This is a university project

This project has 2 Google Colab notebooks with pretrained network, backend(WIP) and frontend(WIP).

## How to use
### To test your image or video

1. Open notebooks/smoke-detection-camera.ipynb
2. Run all code blocks one by one to prepare system
3. Use block with `Download image` or `Download video` comment to download data. Simply put your url in appropriate spot.
4. Run test function (`test_video()`, `test_image()`, `get_frame()`). All examples with arguments can be found in notebook.

### To run backend

1. Open notebooks/smoke-detection-backend.ipynb
2. Run all code blocks one by one to prepare system
3. Get your ngrok address.
4. Available endpoints: 
	- `/image`
	(POST, {url: string, print_output: True or False)})
	- `/video`
	(POST, {url: string, print_output: True or False)})
	- `/frame`.
	(POST, {url: string})

It's not finished, so most probably some things won't work.
You can run it localy too. Just run all comands from notebook on your local machine.

### To run frontend

1. `npm i`
2. `npm run start`

It's not finished, so most probably some things won't work.
