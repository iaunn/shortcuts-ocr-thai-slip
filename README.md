
# Thai Slip OCR - Apple Shortcuts
[Shortcuts](https://support.apple.com/th-th/guide/shortcuts/welcome/ios) อ่าน Slip ของธนาคาร แล้ว ocr โดยใช้ความสามารถของ iOS ในการ ocr ข้อมูลใน slip ให้ แล้วโยนไปยัง api ที่ต้องการได้

ตัวอย่าง [shortcuts](https://bit.ly/3tuPmcz)

## การติดตั้ง (Mobile)
- Download [shortcuts](https://bit.ly/3tuPmcz) นี้ใน mobile แล้วแก้ไข shortcuts เลือก filter folder ที่เราต้องการ 

![ตัวอย่างเลือก folder SCB Easy](/image/IMG_6109.PNG)
- แก้ไข api ปลายทางที่ต้องการส่งข้อมูลไป ซึ่งข้อมูลที่จะส่งไปก็คือ
	- field "ts" คือ วันที่รูปภาพ slip ถูกสร้าง เราอาจจะเอาค่านี้เป็นวันที่ transaction ถูกสร้างก็ได้ ทางผู้เขียนเลือกอันนี้ เพราะจะได้ไม่ต้องไป format ข้อมูล date ที่อยู่ใน slip ที่ ocr มา
	- field "album" คือ ชื่อ album ของ file ที่เราอ่าน
	- field "text" คือ text ที่ ocr มาได้

![ตัวอย่างเลือก ส่งไปที่ API Local](/image/IMG_6109.PNG)

## การติดตั้ง (Server)
```bash
git clone git@github.com:iaunn/thai-slip-ocr.git
npm install
node index.js
```

### Example Result
```javascript
{
  "date": "02 ม.ค. 2567 - 13:58",
  "_date": "2024-01-02T06:58:50.000Z",
  "refId": "202401023XXXXXXXXXXXX",
  "amount": 145,
  "from": {
    "name": "นาย ตัวอย่าง นามสกุล",
    "account": "XXX-XXX123-4"
  },
  "to": {
    "name": "CENTRAL RESTAURANTS GROUP",
    "account": "000002206765265",
    "billerId": "010753600037401",
    "refId2": "47829050002278004881",
    "refId3": "47829050"
  }
}
```

```javascript
{
  "date": "02 ม.ค. 2567 - 13:39",
  "_date": "2024-01-02T06:39:09.000Z",
  "refId": "202401025XXXXXXXXXXXX",
  "amount": 50,
  "from": {
    "name": "นาย ตัวอย่าง นามสกุล",
    "account": "XXX-XXX123-4"
  },
  "to": {
    "name": "K+ shop (AMZ_SD2045 BIG",
    "account": "401015508827001",
    "billerId": "010753600031508"
  }
}
```


```javascript
{
  "date": "02 ม.ค. 2567 - 12:57",
  "_date": "2024-01-02T05:57:53.000Z",
  "refId": "202401029XXXXXXXXXXXXXX",
  "amount": 90,
  "from": {
    "name": "นาย ตัวอย่าง นามสกุล",
    "account": "XXX-XXX123-4"
  },
  "to": {
    "name": "นาย ตัวอย่าง นามสกุล",
    "account": "XXX-XXX234-5"
  }
}
```

### Disclaimer
ในตัวอย่าง ทางผู้เขียนใช้งานธนาคาร SCB เป็นหลัก ในไฟล์ extractor.js จึงมีแต่การ extract ข้อมูล Slip ของธนาคาร SCB 