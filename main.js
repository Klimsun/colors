const column = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLocaleLowerCase() === 'space') {
        setRandomColors()
    }
});

document.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')

    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
});

function generateRandomColor() {
    const hexCodes = '012345678ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    column.forEach((column, index) => {
        const isLocked = column.querySelector('i').classList.contains('fa-lock')
        const title = column.querySelector('.title')
        const button = column.querySelector('button')

        if (isLocked) {
            colors.push(title.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        title.textContent = color
        column.style.background = color

        setTextColor(title, color)
        setTextColor(button, color)
    });
    updateColorsHash(colors)
}


function setTextColor(title, color) {
    const luminance = chroma(color).luminance()
    title.style.color = luminance >= 0.4 ? 'black' : 'white'

}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map
        ((col) => {
            return col.toString().substring(1)
        })
        .join('-')
}
function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true)
