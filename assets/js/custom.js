let fieldWidth, 
    fieldHeight, 
    ceilingHeight, 
    floorsNumber, 
    doorWidth, 
    doorHeight, 
    doorNumber,
    windowWidth, 
    windowHeight, 
    windowNumber,
    totalWallArea, 
    totalCeilingArea,
    counter,
    counterDoor = 0,
    counterWindow = 0;

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    calculate();
})

calculate = async () => {
    this.fieldWidth = document.getElementById("fieldWidth").value
    this.fieldHeight = document.getElementById("fieldHeight").value
    this.ceilingHeight = document.getElementById("ceilingHeight").value
    this.floorsNumber = document.getElementById("floorsNumber").value


    let _totalDoorArea = await totalDoor()
    let _totalWindowArea = await totalWindow()

    this.totalWallArea = (this.floorsNumber * ((2 * this.fieldWidth) + (2 * this.fieldHeight)) * this.ceilingHeight) - (_totalDoorArea + _totalWindowArea)
    this.totalCeilingArea = (this.fieldWidth * this.fieldHeight * this.floorsNumber)
    
    print()
}

function print() {
    document.getElementById("wallArea").innerHTML = this.totalWallArea + " m²"
    document.getElementById("ceilingArea").innerHTML = this.totalCeilingArea + " m²"
    document.getElementById("insulation").innerHTML = this.totalWallArea * 16 + ' adet'
    document.getElementById("pilup").innerHTML = this.totalWallArea * 22 + ' adet'
    document.getElementById("twentyfive").innerHTML = this.totalWallArea * 28 + ' adet'
    document.getElementById("thirteenhalf").innerHTML = this.totalWallArea * 27 + ' adet'

    const whatsappButton = document.getElementById('whatsappButton')
    whatsappButton.disabled = false
    const emailButton = document.getElementById('emailButton')
    emailButton.disabled = false
    const imageButton = document.getElementById('imageButton')
    imageButton.disabled = false
}

function send(which) {
    var text = "";
    text += "Alanın Eni: " + this.fieldWidth + " m\n";
    text += "Alanın Boyu: " + this.fieldHeight + " m\n";
    text += "Tavan Yükseliği: " + this.ceilingHeight + " m\n";
    text += "Kat Sayısı: " + this.floorsNumber + "\n\n\n";

    text += "Kapılar\n";
    text += doorValues()
    text += "\n";

    text += "Pencereler\n";
    text += windowValues()
    text += "\n";

    text += "Duvar Alanı: " + this.totalWallArea + " m²\n";
    text += "Tavan Alanı: " + this.totalCeilingArea + " m²\n";
    
    switch (which) {
        case 'whatsapp':
            var whatsappLink = "https://wa.me/905061324455?text=" + encodeURI(text);
            window.open(whatsappLink);
            break;
        case 'email':
            var emailLink = "mailto:info@artovy.com" + "?subject=Duvar%20Alanı%20Hesap%20Sistemi%20Sonuçları&body=" + encodeURI(text);
            window.open(emailLink);
            break;
        default:
            break;

    }
}

function openImage() {
    let div = document.getElementById('photo');
    html2canvas(div).then(
        function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            var image = new Image();
            image.src = myImage;
            var w = window.open(window.location.href);
            w.document.write(image.outerHTML);
        })
}

function add(which) {
    let name

    switch (which) {
        case 'door':
            name = 'Kapı'
            counterDoor++
            counter = counterDoor
            break;
        case 'window':
            name = 'Pencere'
            counterWindow++
            counter = counterWindow
            break;
        default:
            break;
    }

    document.getElementById(which + '-0').insertAdjacentHTML("afterend", `
    <div id="${which}-${counter}" class="grid grid-cols-4 gap-2 pt-4 mb-5">
        <div>
            <label class="text-xs text-gray-400">${name} Eni (m)</label>
            <input type="number" step="0.01" id="${which}Width-${counter}" class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4">
        </div>
        <div>
            <label class="text-xs text-gray-400">${name} Boyu (m)</label>
            <input type="number" step="0.01" id="${which}Height-${counter}" class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4">
        </div>
        <div>
            <label class="text-xs text-gray-400">${name} Sayısı</label>
            <input type="number" step="0.01" id="${which}Number-${counter}" class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4">
        </div>
        <button type="button" onclick="remove('${which}-${counter}')" class="h-12 w-12 my-5 bg-red-500 rounded-full focus:outline text-white hover:bg-red-600 justify-self-center"> - </button>
    </div>
    `)
}

doorValues = () => {
    let doors = document.getElementById("doors").children
    let _doorWidth, _doorHeight, _doorNumber, text = ""

    for (let i = 0; i < doors.length; i++) {
        _doorWidth = document.getElementById("doorWidth-" + i).value
        _doorHeight = document.getElementById("doorHeight-" + i).value
        _doorNumber = document.getElementById("doorNumber-" + i).value

        text += `Kapı ${i + 1} Eni: ` + _doorWidth + " m\n";
        text += `Kapı ${i + 1} Boyu: ` + _doorHeight + " m\n";
        text += `Kapı ${i + 1} Sayısı: ` + _doorNumber + "\n\n";
    }

    return text
}

windowValues = () => {
    let windows = document.getElementById("windows").children
    let _windowWidth, _windowHeight, _windowNumber, text = ""

    for (let i = 0; i < windows.length; i++) {
        _windowWidth = document.getElementById("windowWidth-" + i).value
        _windowHeight = document.getElementById("windowHeight-" + i).value
        _windowNumber = document.getElementById("windowNumber-" + i).value

        text += `Pencere ${i + 1} Eni: ` + _windowWidth + " m\n";
        text += `Pencere ${i + 1} Boyu: ` + _windowHeight + " m\n";
        text += `Pencere ${i + 1} Sayısı: ` + _windowNumber + "\n\n";
    }

    return text
}

totalDoor = () => {
    let doors = document.getElementById("doors").children
    let _totalDoorArea = 0

    for (let i = 0; i < doors.length; i++) {
        this.doorWidth = document.getElementById("doorWidth-" + i).value
        this.doorHeight = document.getElementById("doorHeight-" + i).value
        this.doorNumber = document.getElementById("doorNumber-" + i).value

        _totalDoorArea += (this.doorWidth * this.doorHeight * this.doorNumber)
    }

    return _totalDoorArea
}

totalWindow = () => {
    let windows = document.getElementById("windows").children
    let _totalWindowArea = 0

    for (let i = 0; i < windows.length; i++) {
        this.windowWidth = document.getElementById("windowWidth-" + i).value
        this.windowHeight = document.getElementById("windowHeight-" + i).value
        this.windowNumber = document.getElementById("windowNumber-" + i).value
        _totalWindowArea += (this.windowWidth * this.windowHeight * this.windowNumber)
    }

    return _totalWindowArea
}

function remove(which) {
    document.getElementById(which).remove()
}
