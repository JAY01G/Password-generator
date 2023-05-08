
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomfunc = {
    lower: getrandomlower,
    upper: getrandomupper,
    number: getrandomnumber,
    symbol: getrandomsymbols
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const haslower = lowercaseEl.checked;
    const hasupper = uppercaseEl.checked;
    const hasnumber = numberEl.checked;
    const hassymbol = symbolEl.checked;
    resultEl.innerText = generatepassword(length, haslower, hasnumber, hasupper, hassymbol);
})

function generatepassword(length,lower,number,upper,symbol){

    let generatedpassword = '';
         
    const typescount = lower + number + upper + symbol

    // console.log('typescount: ', typescount )

    const typearr = [{ lower }, { number }, { upper } , { symbol }].filter(
        item => Object.values(item)[0]
    );
    // console.log(typearr)

    if(typescount === 0){
        return '';
    }

    for(let i=0; i< length; i += typescount){
        typearr.forEach((type) =>{
            const funcname = Object.keys(type)[0]
            // console.log(funcname)

            generatedpassword += randomfunc[funcname]();
        })
    }

    const finalpassword = generatedpassword.slice(0,length);

    return finalpassword;
}

clipboard.addEventListener('click' ,()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText

    if(!(password)){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); 
    textarea.remove();
    alert('password copied to  clipboard');
})

function getrandomlower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getrandomupper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getrandomnumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getrandomsymbols() {
    const symbols = '!@#$%^&*{}()`~<>:/?|';
    return symbols[Math.floor(Math.random() * symbols.length)]
}

// console.log(getrandomsymbols())

