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
    totalCeilingArea;

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    calculate();
});

calculate = async () => {
    this.fieldWidth = document.getElementById("fieldWidth").value
    this.fieldHeight = document.getElementById("fieldHeight").value
    this.ceilingHeight = document.getElementById("ceilingHeight").value
    this.floorsNumber = document.getElementById("floorsNumber").value


    let _totalDoorArea = await totalDoor()
    let _totalWindowArea = await totalWindow()

    console.log(_totalDoorArea, "_totalDoorArea")
    console.log(_totalWindowArea, "_totalWindowArea")
    this.totalWallArea = (((2 * this.fieldWidth) + (2 * this.fieldHeight)) * this.ceilingHeight) - (_totalDoorArea + _totalWindowArea)
    this.totalCeilingArea = (this.fieldWidth * this.fieldHeight * this.floorsNumber)
    
    print()
};

function print() {
    document.getElementById("wallArea").innerHTML = this.totalWallArea + " m²"
    document.getElementById("ceilingArea").innerHTML = this.totalCeilingArea + " m²"
    document.getElementById("insulation").innerHTML = this.totalWallArea * 16 + ' adet'
    document.getElementById("pilup").innerHTML = this.totalWallArea * 22 + ' adet'
    document.getElementById("twentyfive").innerHTML = this.totalWallArea * 28 + ' adet'
    document.getElementById("thirteenhalf").innerHTML = this.totalWallArea * 27 + ' adet'
};

function sendWhatsapp() {
    var text = "";
    text += "Alanın Eni: " + this.fieldWidth + " m\n";
    text += "Alanın Boyu: " + this.fieldHeight + " m\n";
    text += "Tavan Yükseliği: " + this.ceilingHeight + " m\n";
    text += "Kat Sayısı: " + this.floorsNumber + "\n";
    text += "Kapı Eni: " + this.doorWidth + " m\n";
    text += "Kapı Boyu: " + this.doorHeight + " m\n";
    text += "Pencere Eni: " + this.windowWidth + " m\n";
    text += "Pencere Boyu: " + this.windowHeight + " m\n";
    text += "Kapı Sayısı: " + this.doorNumber + "\n";
    text += "Pencere Sayısı: " + this.windowNumber + "\n";
    text += "Duvar Alanı: " + this.totalWallArea + " m²\n";
    text += "Tavan Alanı: " + this.totalCeilingArea + " m²\n";
    
    var whatsappLink = "https://wa.me/905061324455?text=" + encodeURI(text);
    window.location.href = whatsappLink;
};

function add(which) {
    let name, howMany

    switch (which) {
        case 'door':
            name = 'Kapı'
            break;
        case 'window':
            name = 'Pencere'
            break;
        default:
            break;
    }

    howMany = document.getElementById(which + 's').children.length

    document.getElementById(which + '-0').insertAdjacentHTML("afterend", `
    <div id="${which}-${howMany}" class="grid grid-cols-4 gap-2 pt-4 mb-5">
        <div>
            <label class="text-xs text-gray-400">${name} Eni (m)</label>
            <input type="number" step="0.01" id="${which}Width-${howMany}" class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4">
        </div>
        <div>
            <label class="text-xs text-gray-400">${name} Boyu (m)</label>
            <input type="number" step="0.01" id="${which}Height-${howMany}" class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4">
        </div>
        <div>
            <label class="text-xs text-gray-400">${name} Sayısı</label>
            <input type="number" step="0.01" id="${which}Number-${howMany}" class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4">
        </div>
        <button type="button" onclick="remove('${which}-${howMany}')" class="h-12 w-12 my-5 bg-red-500 rounded-full focus:outline text-white hover:bg-red-600 justify-self-center"> - </button>
    </div>
    `)
};

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
};
