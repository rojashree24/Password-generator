let resultElement=document.getElementById('result');
let clipboardElement=document.getElementById('clipboard');
let lengthElement=document.getElementById('length');
let uppercaseElement=document.getElementById('uppercase');
let lowercaseElement=document.getElementById('lowercase');
let numberElement=document.getElementById('numbers');
let symbolElement=document.getElementById('symbols');
let generateElement=document.getElementById('generate');


let randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbols
};

generateElement.addEventListener('click',()=>{
    const length=+lengthElement.value;
    const hasUpper=uppercaseElement.checked;
    const hasLower=lowercaseElement.checked;
    const hasNumber=numberElement.checked;
    const hasSymbol=symbolElement.checked;
    
    
    resultElement.innerText=generatePassword(hasLower,hasNumber,hasUpper,hasSymbol,length);
});

clipboardElement.addEventListener('click',()=>{
    const textarea=document.createElement('textarea');
    const password=resultElement.innerText;

    if(!password){
        return;
    }

    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied');
});

function generatePassword(lower,upper,number,symbol,length){
    let generatedPassword='';
    const typesCount=lower+upper+number+symbol;
    const typesArr=[{lower},{upper},{number},{symbol}].filter(item=>Object.values(item)[0]);
    // console.log(typesArr);

    if(typesCount===0){
        return '';
    }

    for(let i=0;i<length;i+=typesCount){
        typesArr.forEach(type=>{
            const funcName=Object.keys(type)[0];
            // console.log(funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPass=generatedPassword.slice(0,length);
    return finalPass;
}



function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbols(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}