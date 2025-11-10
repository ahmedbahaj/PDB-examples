import subprocess
import os

HOST_ROOT_DIR = "C:/Users/Ahmed/Desktop/1ULL"
DOCKER_IMAGE = "andrpet/cocomaps-backend:0.0.19"
CONTAINER_EXECUTION = "python /app/coco2/begin.py"
INPUT_FILE_NAME = "example_input.json"

def run_frame_processing():

    # Iterate from 1 up to (and including) 7
    for i in range(1, 8):
        frame_folder = f"frame_{i}"
        
        container_input_path = f"/app/data/{INPUT_FILE_NAME}"
        docker_command = (
            f"docker run "
            f"-v {HOST_ROOT_DIR}/{frame_folder}:/app/data " #mount
            f"-it {DOCKER_IMAGE} "
            f"{CONTAINER_EXECUTION} "
            f"{container_input_path}"
        )
        print(f"processing: {docker_command}")

        try:
            subprocess.run(
                docker_command, shell=True, check=True,
                stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True 
            )
            print(f"done: {frame_folder}.\n")

        except subprocess.CalledProcessError as e:
            print(f"docker command failed for {frame_folder}.")
            print(f"Output:\n{e.output}")

if __name__ == "__main__":
    run_frame_processing()