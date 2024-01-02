
function scb(item) {
    // extract date from ocr
    const dateMatch = item.text.match(/(\d{1,2}.*\d{4}\s-\s\d{1,2}:\d{2})/);
    let date = dateMatch ? dateMatch[0] : null;

    // date from image create
    let _date = new Date(item.ts)

    const textLines = item.text.split('\n').map(line => line.replace(/(\r\n|\n|\r|口)/gm, '').trim()).filter(line => line.trim().length)

    // Extract all info using a regular expression
    const refId = textLines[textLines.findIndex(line => /(รหัสอ้างอิง|หมายเลขร้านค้า1)/.test(line))]?.split(':')[1]?.trim()

    let fromName = textLines[textLines.findIndex(line => /(จาก)/.test(line)) + 2]?.trim()
    let fromAccount = textLines[textLines.findIndex(line => /(จาก)/.test(line)) + 3]?.replaceAll('×', 'X')?.toLocaleUpperCase()?.trim()

    let toName = textLines[textLines.findIndex(line => /(ไปยัง)/.test(line)) + 3]?.trim()
    let toAccount = textLines[textLines.findIndex(line => /(ไปยัง)/.test(line)) + 4]?.replaceAll('×', 'X')?.toLocaleUpperCase()?.trim()
    let toAccountName = textLines[textLines.findIndex(line => /(ชื่อบัญชี)/.test(line))]?.split(':')[1]?.trim()

    let billerId = textLines[textLines.findIndex(line => /(Biller ID)/.test(line))]?.split(':')[1]?.trim()
    let storeId = textLines[textLines.findIndex(line => /(รหัสร้านค้า|หมายเลขร้านค้า1)/.test(line))]?.split(':')[1]?.trim()
    let branchId = textLines[textLines.findIndex(line => /(รหัสสาขา)/.test(line))]?.split(':')[1]?.replaceAll('×', 'X').toLocaleUpperCase().trim()
    let refId1 = textLines[textLines.findIndex(line => /(เลขที่อ้างอิง1|ข้อมูลอ้างอิง 1)/.test(line))]?.split(':')[1]?.trim()
    let refId2 = textLines[textLines.findIndex(line => /(เลขที่อ้างอิง2|รหัสธุรกรรม|ข้อมูลอ้างอิง 2|เลขที่บิล)/.test(line))]?.split(':')[1]?.trim()
    let refId3 = textLines[textLines.findIndex(line => /(เลขที่อ้างอิง 3|เลขที่อ้างอิง3|ข้อมูลอ้างอิง 3)/.test(line))]?.split(':')[1]?.trim()
    let refId4 = textLines[textLines.findIndex(line => /(รหัสอ้างอิงร้านค้า)/.test(line))]?.split(':')[1]?.trim()
    let amount = textLines[textLines.findIndex(line => /(จำนวนเงิน)/.test(line)) + 1]?.replace(',', '')?.trim()
    let cardNumber = textLines[textLines.findIndex(line => /(หมายเลขบัตร)/.test(line))]?.split(':')[1]?.replaceAll('×', 'X').toLocaleUpperCase().trim()
    let paymentAccount = textLines[textLines.findIndex(line => /(บัญชีรับชำระ)/.test(line))]?.split(':')[1]?.replaceAll('×', 'X').toLocaleUpperCase().trim()

    if (/ข้อมูลเพิ่มเติมจากผู้ให้บริการ/.test(item.text)) {
        amount = textLines[textLines.findIndex(line => /(ข้อมูลเพิ่มเติมจากผู้ให้บริการ)/.test(line)) + 2]
    }

    if (/(เติมเงินพร้อมเพย์)/.test(toName)) {
        const additionalInfoLine = textLines.findIndex(line => /(ข้อมูลเพิ่มเติมจากผู้ให้บริการ)/.test(line))
        toName = textLines[additionalInfoLine + 1]
        amount = textLines[additionalInfoLine + 2]
    }

    // if have store id put to account id
    if (storeId) {
        toAccount = storeId
    }

    // if have card number put o account id
    if (cardNumber) {
        toAccount = cardNumber
    }

    // if have บัญชีรับชำระ put to account id
    if (paymentAccount) {
        toAccount = paymentAccount
        refId2 = cardNumber
    }

    // if have account name put to name
    if (toAccountName) {
        toName = `${toName} - ${toAccountName}`
    }

    // if have branch id put to account id
    if (branchId) {
        toAccount = branchId
    }

    return {
        date,
        _date,
        refId,
        amount: +amount,
        from: {
            name: fromName,
            account: fromAccount
        },
        to: {
            name: toName,
            account: toAccount,
            billerId,
            refId1,
            refId2,
            refId3,
            refId4
        }
    }
}

module.exports = { scb }
