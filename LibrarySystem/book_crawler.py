import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
import pymysql

def main():
    all_books = []

    driver = uc.Chrome(version_main=121)

    driver.get("https://sto55.com/class_1_1.html")

    tag_count = len(driver.find_elements(By.CSS_SELECTOR, ".container li"))

    for i in range(tag_count):
        t = driver.find_elements(By.CSS_SELECTOR, ".container li")[i]

        tag = t.text

        url = t.find_element(By.TAG_NAME, "a").get_attribute("href")

        driver.get(url)

        books = driver.find_elements(By.CSS_SELECTOR, ".bookbox .bookinfo")

        for i in range(len(books)):
            b = driver.find_elements(By.CSS_SELECTOR, ".bookbox .bookinfo")[i]

            book_dict = {}

            book_dict["book_name"] = b.find_element(By.CSS_SELECTOR, ".bookname a").text
            book_dict["book_text"] = b.find_elements(By.CLASS_NAME, "update")[0].text.split("：")[1]
            print(book_dict["book_text"])
            book_dict["author"] = b.find_elements(By.CLASS_NAME, "author")[0].text.split("：")[1]
            print(book_dict["author"])

            driver.get(b.find_element(By.CSS_SELECTOR, ".bookname a").get_attribute("href"))

            book_dict["book_icon"] = driver.find_elements(By.TAG_NAME, "img")[0].get_attribute("src")
            book_dict["tag"] = tag

            all_books.append(book_dict)

            driver.back()

    conn = pymysql.connect(
        host='m7nj9dclezfq7ax1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user='r91da3ck0vve9p27',
        password='s1j41gu72w4mfrtq',
        database='xsnyjcrjiagwp4b8',
        port=3306,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    with conn.cursor() as cursor:
        sql = """
            INSERT INTO book (book_name, book_text, author, book_icon, tag, created_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
        """
        values = [
            (b["book_name"], b["book_text"], b["author"], b["book_icon"], b["tag"])
            for b in all_books
        ]

        cursor.executemany(sql, values)
        conn.commit()
    driver.quit()


if __name__ == '__main__':
    main()
