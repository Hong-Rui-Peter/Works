package main

import (
	"database/sql"
	"fmt"
	"log"

	"html/template"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

// const cardNum int = 13

var db *sql.DB

// 與DB連線。 init() 初始化，時間點比 main() 更早。
func init() {
	dbConnect, err := sql.Open(
		"mysql",
		"root:root@tcp(127.0.0.1:3306)/golang",
	)

	if err != nil {
		log.Fatalln(err)
	}

	err = dbConnect.Ping()
	if err != nil {
		log.Fatalln(err)
	}

	db = dbConnect // 用全域變數接

	db.SetMaxOpenConns(10) // 可設置最大DB連線數，設<=0則無上限（連線分成 in-Use正在執行任務 及 idle執行完成後的閒置 兩種）
	db.SetMaxIdleConns(10) // 設置最大idle閒置連線數。
}

func main() {

	createDb("`web_test`")
	_, err := db.Exec("CREATE TABLE IF NOT EXISTS `web_test`.`user`(`account` VARCHAR (20), `password` VARCHAR (20), `email` VARCHAR (100), `phone` VARCHAR (20))")
	if err != nil {
		log.Fatalln(err)
	}

	http.HandleFunc("/login", Login)
	http.HandleFunc("/signup", Signnup)

	err = http.ListenAndServe("localhost:8080", nil)

	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

// 帳號密碼姓名Email

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// t1, err := template.ParseFiles("view/login2.html")
		t1, err := template.ParseFiles("login.html")
		if err != nil {
			panic(err)
		}
		t1.Execute(w, "")
	} else {
		r.ParseForm()

		var account string
		var password string
		for k, v := range r.Form {
			if k == "account" {
				account = v[0]
			} else if k == "password" {
				password = v[0]
			}
		}

		rows, err := db.Query("SELECT COUNT(*) FROM `web_test`.`user` WHERE `account`=? AND `password`=?;", account, password)
		var tCount int
		for rows.Next() { // rows.Next() 前往下一個項目。如果成功（還有下一項的話）返回True、失敗（沒有下一項可讀）則返回False
			err = rows.Scan(&tCount) // 掃描後存進變數中
			if err != nil {
				log.Fatalln(err)
			}
			fmt.Printf("%q %d\n", tCount) // %q:quoted 用引號包起字串
		}
		if tCount == 1 {
			fmt.Fprint(w, "登入成功")
		} else {
			fmt.Fprint(w, "登入失敗")
		}
		defer rows.Close()
	}
}
func Signnup(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// t1, err := template.ParseFiles("view/signup.html")
		t1, err := template.ParseFiles("signup.html")
		if err != nil {
			panic(err)
		}
		t1.Execute(w, "")
	} else {
		r.ParseForm()

		fmt.Println(r.Form)

		var account string
		var password string
		var email string
		var phone string
		for k, v := range r.Form {
			if k == "account" {
				account = v[0]
			} else if k == "password" {
				password = v[0]
			} else if k == "email" {
				email = v[0]
			} else if k == "phone" {
				phone = v[0]
			}
		}
		rows, err := db.Query("SELECT COUNT(*) FROM `web_test`.`user` WHERE `account`=? AND `password`=?;", account, password)
		var tCount int
		for rows.Next() { // rows.Next() 前往下一個項目。如果成功（還有下一項的話）返回True、失敗（沒有下一項可讀）則返回False
			err = rows.Scan(&tCount) // 掃描後存進變數中
			if err != nil {
				log.Fatalln(err)
			}
			fmt.Printf("%q %d\n", tCount) // %q:quoted 用引號包起字串
		}
		if tCount == 0 {
			_, err = db.Exec("INSERT INTO `web_test`.`user`(`account` , `password`, `email`, `phone`) VALUES (? , ? , ? , ?)", account, password, email, phone)
			if err != nil {
				log.Fatalln("INSERT:", err)
			} else {
				http.Redirect(w, r, "/login", http.StatusSeeOther)
			}
		} else {
			fmt.Fprint(w, "該帳號已註冊")
		}
	}
}

func createDb(dbName string) {
	_, err := db.Exec("CREATE DATABASE IF NOT EXISTS " + dbName + ";")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Print(err)
}
