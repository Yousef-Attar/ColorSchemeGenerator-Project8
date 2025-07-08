// https://www.thecolorapi.com/scheme
const seedColor = document.getElementById("seedColor")
const schemeMode = document.getElementById("schemeMode")
const getScheme = document.getElementById("getScheme")
const darkBtn = document.getElementById("darkBtn")
let isDark = false

renderScheme(seedColor.value.slice(1), schemeMode.value)

function renderScheme(seedColor, mode){
fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`)
.then(res => res.json())
.then(data =>{
    let schemeColors =""
    data.colors.forEach(color => {
        schemeColors += 
        `<div>
                <button 
                class="copy-color"
                id="copyColor"
                data-hex="${color.hex.value}"
                style="background-color:${color.hex.value}"></button>
                <p id="hexValue">${color.hex.value}</p>
        </div>
        `});
        document.getElementById("schemeColors").innerHTML = schemeColors

        const colorButtons = document.querySelectorAll(".copy-color");
        colorButtons.forEach(button =>{
            button.addEventListener("click" , () =>{
                const hex = button.getAttribute("data-hex")
                navigator.clipboard.writeText(hex).then(()=>{
                    console.log(`copied ${hex} to clipboard`)
                    button.classList.add("copied")
                    setTimeout(() => { button.classList.remove("copied")}, 1000);
                }).catch(err => console.log("failed to copy",err))
            })
        })
    })
}

getScheme.addEventListener('click', () =>{
    renderScheme(seedColor.value.slice(1), schemeMode.value)
})
darkBtn.addEventListener('click',() =>{
    const styleBody = document.querySelector("body").style
   if(isDark){
    schemeMode.classList.remove("dark-mode-select")
    getScheme.classList.remove("dark-mode-btn")
    document.querySelector("header").classList.remove("dark-mode-header")
    styleBody.backgroundColor = "#fff"
    schemeMode.classList.add("light-mode-select")
    getScheme.classList.add("light-mode-btn")
    document.querySelector("header").classList.add("light-mode-header")
    darkBtn.classList.remove("switch-light-btn")
    darkBtn.classList.add("switch-dark-btn")
    darkBtn.textContent = "Switch to Dark"
    document.querySelectorAll("p").forEach(hex =>{
        hex.style.color = "#111827"  
    })
}
else{
    schemeMode.classList.remove("light-mode-select")
    getScheme.classList.remove("light-mode-btn")
    document.querySelector("header").classList.remove("light-mode-header")
    darkBtn.classList.remove("switch-dark-btn")
    darkBtn.classList.add("switch-light-btn")
    styleBody.backgroundColor = "#1A1919"
    schemeMode.classList.add("dark-mode-select")
    getScheme.classList.add("dark-mode-btn")
    document.querySelector("header").classList.add("dark-mode-header")
    darkBtn.textContent = "Switch to Light"
    document.querySelectorAll("p").forEach(hex =>{
        hex.style.color = "#fff"
    })
   }
   isDark = !isDark
})