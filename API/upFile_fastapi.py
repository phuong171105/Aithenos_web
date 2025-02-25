from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import Any, List
import io
from PIL import Image
import numpy as np
import cv2
from ultralytics import YOLO
from fastapi.responses import JSONResponse
import logging
from io import BytesIO
import base64

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Mapping class IDs to class names
class_mapping = {
    '0': 'Chai nhựa',
    '1': 'Nắp chai',
    '2': 'Cốc giấy',
    '3': 'rope',
    '4': 'Skewer stick',
    '5': 'Spray nozzle of glass cleaner bottle',
    '6': 'Paper cup',
    '7': 'Rubber band',
    '8': 'Fabric',
    '9': 'Motor',
    '10': 'Mini fan blade attached to motor',
    '11': 'Small electrical wire',
    '12': 'Battery',
    '13': 'Battery tray',
    '14': 'Mini switch',
    '15': 'Cardboard box',
    '16': 'White paper',
    '17': 'Toilet paper core',
    '18': 'Button',
    '19': 'Wooden clip',
    '20': 'Straw',
    '21': 'Foam'
}

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model
model = YOLO('best.pt')

def pil_to_cv2(image: Image.Image) -> np.ndarray:
    """Convert a PIL image to OpenCV format."""
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

def cv2_to_pil(image: np.ndarray) -> Image.Image:
    """Convert an OpenCV image to PIL format."""
    return Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

def encode_image_to_base64(image: Image.Image) -> str:
    """Convert a PIL image to base64 string."""
    if image.mode == "RGBA":
        image = image.convert("RGB")
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")

def convert_numpy_types(obj: Any):
    """Recursively convert numpy types to native Python types."""
    if isinstance(obj, (np.int64, np.int32, np.int16, np.int8)):
        return int(obj)
    elif isinstance(obj, (np.float64, np.float32)):
        return float(obj)
    elif isinstance(obj, list):
        return [convert_numpy_types(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_numpy_types(value) for key, value in obj.items()}
    return obj

@app.post("/det")
async def detection(file: UploadFile = File(...)):
    """
    Detect objects in an uploaded image and return results.
    Input: Uploaded image file.
    Output: JSON response with base64 images, class counts, and detected IDs.
    """
    try:
        # Đọc file ảnh từ UploadFile
        image_data = await file.read()
        image = Image.open(BytesIO(image_data))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to process image")

    # Perform prediction
    prediction = model(source=image, conf=0.5, iou=0.5)

    # Convert PIL to OpenCV format for drawing
    img_cv2 = pil_to_cv2(image)

    # Initialize variables to store results
    class_counts = {}
    det = [0] * len(class_mapping)  # Initialize a list of zeros with length equal to class_mapping

    # Process predictions
    for result in prediction:
        boxes = result.boxes.cpu().numpy()
        xyxy = boxes.xyxy
        cls_ids = boxes.cls.astype(int)  # Class IDs as integers

        # Draw bounding boxes and count classes
        for box, cls_id in zip(xyxy, cls_ids):
            # Draw rectangle
            cv2.rectangle(img_cv2, (int(box[0]), int(box[1])), (int(box[2]), int(box[3])), (0, 255, 0), 1)

            # Get class name from mapping
            class_name = class_mapping.get(str(cls_id), 'Unknown')

            # Count class occurrences
            if class_name in class_counts:
                class_counts[class_name] += 1
            else:
                class_counts[class_name] = 1

            # Update the `det` list
            det[cls_id] += 1  # Increment the count for the corresponding class ID

    # Convert OpenCV back to PIL format
    img_pil_with_boxes = cv2_to_pil(img_cv2)

    # Encode images to base64
    encoded_image = encode_image_to_base64(image)
    encoded_image_results = encode_image_to_base64(img_pil_with_boxes)

    # Prepare response
    response = {
        "data": {
            # "base64": encoded_image,
            "base64_r": encoded_image_results,
            "class_mapping": class_mapping,
            "result": {
                "dict": class_counts,
                "det": det,  # List of detected class counts
            },
        },
        "msg": "success",
        "code": 200
    }

    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)