// https://www.thecolorapi.com/scheme
const seedColor = document.getElementById("seedColor")
const schemeMode = document.getElementById("schemeMode")
const getScheme = document.getElementById("getScheme")
console.log(schemeMode.value)
console.log(seedColor.value.slice(1))
renderScheme(seedColor.value.slice(1), schemeMode.value)

function renderScheme(seedColor, mode){
fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`)
.then(res => res.json())
.then(data =>{
    let schemeColors =""
    console.log(data.colors[0].hex)
    data.colors.forEach(color => {
        schemeColors += 
        `<div>
                <button class="copy-color" id="copyColor" style="background-color:${color.hex.value}"></button>
                <p class="hex-value" id="hexValue">${color.hex.value}</p>
        </div>
        `});
        document.getElementById("schemeColors").innerHTML = schemeColors
})
}

getScheme.addEventListener('click', () =>{
    renderScheme(seedColor.value.slice(1), schemeMode.value)
})
