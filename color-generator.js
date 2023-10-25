// GLOBAL VARIABLES
const getColorBtn = document.getElementById("get-color-btn");

// STORING RECTANGLES IN ARRAY
const rectangles = [
    firstColor = document.getElementById("rectangle-one"),
    secondColor = document.getElementById("rectangle-two"),
    thirdColor = document.getElementById("rectangle-three"),
    fourthColor = document.getElementById("rectangle-four"),
    fifthColor = document.getElementById("rectangle-five"),
]
// STORING COLOR CODES IN ARRAY
const colorCodes = [
    colorOne = document.getElementById("color-one"),
    colorTwo = document.getElementById("color-two"),
    colorThree = document.getElementById("color-three"),
    colorFour = document.getElementById("color-four"),
    colorFive = document.getElementById("color-five"),
]
const titleLetters = [
    C = document.getElementById("letter-one"),
    O = document.getElementById("letter-two"),
    L = document.getElementById("letter-three"),
    O = document.getElementById("letter-four"),
    R = document.getElementById("letter-five"),
]

// FUNCTION FOR GETTING A SELECTED SEED COLOR
function getSeedColor() {
    const seedColor = document.getElementById("color-input").value;
    return seedColor.slice(1); // REMOVING "#" FROM HEX: NECESSARY FOR QUERY STRINGS LATER IN API...
}

// FUNCTION FOR GETTING SELECTED SCHEME
function getScheme() {
    const schemeMenu = document.getElementById("scheme");
    const selectedScheme = schemeMenu.options[schemeMenu.selectedIndex];
    return selectedScheme.value;
}

// BUTTON: EVENT LISTENER, FETCH API, CHANGING COLORS OF RECTANGLES
getColorBtn.addEventListener("click", function() {
    const color = getSeedColor();
    const scheme = getScheme();
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`)
    .then(resp => resp.json())
    .then(data => {
        const colorArray = data.colors; // EXTRACTING ARRAY FROM THE API GIVEN DATA
        let colors = colorArray.map(function(color) {
            return color.hex.value; // EXTRACTING THE HEX VALUE OF ALL 5 COLOR OBJECTS
        }); 
        // ITERATING OVER RECTANGLES AND CHANGING COLOR
        rectangles.forEach(function(rectangle, index) {
            rectangle.style.backgroundColor = colors[index];
        });
        // ITERATING OVER COLOR CODE VALUES AND CHANGING THEM TO CURRENT COLOR
        colorCodes.forEach(function(code, index) {
            code.textContent = colors[index];
        })
        titleLetters.forEach(function(letter, index) {
            letter.style.color = colors[index];
        })
    });
});

// COPYING THE HEX VALUES TO CLIPBOARD
function copyToClipboard(colorCode) {
    navigator.clipboard.writeText(colorCode)
        .then(function() {
            alert(`${colorCode} copied to clipboard!`);
        })
        .catch(function(error) {
            alert(`Failed to copy ${colorCode} to clipboard: ${error}`);
        });
}

rectangles.forEach(function(rectangle, index) {
    rectangle.addEventListener('click', function() {
        const colorCode = colorCodes[index].textContent;
        copyToClipboard(colorCode);
    });
});

colorCodes.forEach(function(code) {
    code.addEventListener('click', function() {
        const colorCode = code.textContent;
        copyToClipboard(colorCode);
    });
});