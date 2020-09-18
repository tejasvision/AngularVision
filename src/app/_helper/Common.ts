export function GetFormValue(FormInput) {
    let _tmpobj = {};

    for (const key in FormInput) {
        if (FormInput.hasOwnProperty(key)) {
            _tmpobj[key] = FormInput[key].value
        }
    }
    return _tmpobj
}

export function GetMethodData(body){
    let qry="";
    for (const key in body) {
        if (body.hasOwnProperty(key)) {
            if (qry == "") {
                qry += "?" + key.toString() + '=' + body[key]
            } else {
                qry += "&" + key.toString() + '=' + body[key]
            }
        }
    }
    return qry;
}