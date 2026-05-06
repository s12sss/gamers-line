import cv2
import numpy as np
import sys
import os

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
        
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
    return warped

def main():
    if len(sys.argv) < 3:
        print("Usage: python crop_monitor.py <input> <output>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    image = cv2.imread(input_path)
    if image is None:
        print("Failed to load image")
        sys.exit(1)
        
    orig = image.copy()
    ratio = image.shape[0] / 500.0
    image = cv2.resize(image, (int(image.shape[1] / ratio), 500))
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(gray, 30, 150) # Tweak thresholds if needed
    
    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]
    
    screenCnt = None
    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        
        if len(approx) == 4:
            area = cv2.contourArea(approx)
            img_area = image.shape[0] * image.shape[1]
            if area > img_area * 0.15: # Must be at least 15% of the image
                screenCnt = approx
                break
                
    if screenCnt is None:
        print("Could not automatically find the monitor. Doing a fallback center crop.")
        h, w = orig.shape[:2]
        # Crop out 15% from top/bottom and 15% from left/right
        top = int(h * 0.15)
        bottom = int(h * 0.85)
        left = int(w * 0.15)
        right = int(w * 0.85)
        cropped = orig[top:bottom, left:right]
        cv2.imwrite(output_path, cropped)
    else:
        print("Found monitor contour. Applying perspective transform.")
        warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)
        cv2.imwrite(output_path, warped)
        
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    main()
