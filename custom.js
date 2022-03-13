var fieldWidth, 
    fieldHeight, 
    ceilingHeight, 
    floorsNumber, 
    doorWidth, 
    doorHeight, 
    windowWidth, 
    windowHeight, 
    doorsNumber, 
    windowNumber, 
    totalWallArea, 
    totalCeilingArea, 
    totalBrick;

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    calculate();
});

function calculate() {
    this.fieldWidth = document.getElementById("fieldWidth").value
    this.fieldHeight = document.getElementById("fieldHeight").value
    this.ceilingHeight = document.getElementById("ceilingHeight").value
    this.floorsNumber = document.getElementById("floorsNumber").value
    this.doorWidth = document.getElementById("doorWidth").value
    this.doorHeight = document.getElementById("doorHeight").value
    this.windowWidth = document.getElementById("windowWidth").value
    this.windowHeight = document.getElementById("windowHeight").value
    this.doorsNumber = document.getElementById("doorsNumber").value
    this.windowNumber = document.getElementById("windowNumber").value

    this.totalWallArea = (((2 * this.fieldWidth) + (2 * this.fieldHeight)) * this.ceilingHeight) - ((this.doorWidth * this.doorHeight * this.doorsNumber) + (this.windowWidth * this.windowHeight * this.windowNumber))
    this.totalCeilingArea = (this.fieldWidth * this.fieldHeight * this.floorsNumber)

    var select = document.getElementById('brickType');
    var value = select.options[select.selectedIndex].value;

    switch (value) {
        case "1":
            this.totalBrick = this.totalWallArea * 16
        case "2":
            this.totalBrick = this.totalWallArea * 22
        case "3":
            this.totalBrick = this.totalWallArea * 28
        case "4":
            this.totalBrick = this.totalWallArea * 27
        default:
            break;
    }
    
    print()
};
function print() {
    document.getElementById("wallArea").innerHTML = this.totalWallArea + " m²"
    document.getElementById("ceilingArea").innerHTML = this.totalCeilingArea + " m²"
    document.getElementById("totalBrick").innerHTML = this.totalBrick + " adet";
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
    text += "Kapı Sayısı: " + this.doorsNumber + "\n";
    text += "Pencere Sayısı: " + this.windowNumber + "\n";
    text += "Duvar Alanı: " + this.totalWallArea + " m²\n";
    text += "Tavan Alanı: " + this.totalCeilingArea + " m²\n";
    text += "Tuğla Adedi: " + this.totalBrick + " adet\n";
    
    var whatsappLink = "https://wa.me/905061324455?text=" + encodeURI(text);
    window.location.href = whatsappLink;
}