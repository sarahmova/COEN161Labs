function ceasar(str , shift){
    let newstring = ""
    let length = str.length
    let lower = 'abcdefghijklmnopqrstuvwxyz'
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let index = null
    let offset = null
    let newletter = null

    for (let i = 0; i < length; i++){
        if (str.charCodeAt(i) >=97 && str.charCodeAt(i) <=122){  //lower case
            index = lower.indexOf(str[i])
            offset = (index + shift) % 26
            newletter = lower[offset]
        } else if (str.charCodeAt(i)>=65 && str.charCodeAt(i) <=90) { //upper case
            index = upper.indexOf(str[i])
            offset = (index + shift) % 26
            newletter = upper[offset]
        } else {
            newletter = str[i]
        }
        newstring += newletter
    }
    return newstring
}


console.log("ceasar cipher")
console.log(ceasar("aBcz", 1)) //this should spit out "bCda"
console.log(ceasar("irk", 13)) //this should spit out "vex"
console.group(ceasar("fus!#ion", 6))