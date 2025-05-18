import cv2
import pytesseract

# 設置Tesseract-OCR的安裝路徑，根據你的系統調整路徑
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# 讀取圖像
image = cv2.imread("1051k7.jpg")
# image = cv2.imread("795366.jpg")
# image = cv2.imread("aaa.jpg")

# 將圖像轉換為灰度
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 進行邊緣檢測
edges = cv2.Canny(gray_image, 25, 100)

# 使用輪廓檢測找到車牌區域
contours, _ = cv2.findContours(
    edges.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

# 尋找車牌區域
plate = None
for contour in contours:
    perimeter = cv2.arcLength(contour, True)
    approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)

    if len(approx) > 0:
        plate = approx
        break

# 將車牌區域從圖像中提取並進行OCR辨識
if plate is not None:
    x, y, w, h = cv2.boundingRect(plate)
    plate_image = gray_image[y: y + h, x: x + w]
    plate_text = pytesseract.image_to_string(plate_image, config="--psm 8")
    print("車牌號碼：", plate_text)
else:
    print("未找到車牌")

# 顯示結果圖像
cv2.imshow("車牌圖像", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
