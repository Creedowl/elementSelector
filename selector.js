function stop() {
    if(moveListener) window.removeEventListener(moveListener)
    if(keyListener) window.removeEventListener(keyListener)
    if(clickListener) window.removeEventListener(clickListener)
    selector.remove()
    moveListener = keyListener = clickListener = null
    status = -1
}

// highlight the element where the mouse is
function highlight(target, cover){
    let rect = target.getBoundingClientRect()
    let bodyRect = document.body.getBoundingClientRect()
    cover.style.top = rect.top - bodyRect.top + 'px'
    cover.style.left = rect.left - bodyRect.left + 'px'
    cover.style.width = rect.width + 'px'
    cover.style.height = rect.height + 'px'
    cover.style.zIndex = target.style.zIndex != '' ? target.style.zIndex + 1 : 100000000
}

var status = 0 //0: selecting, -1: cancelled, 1: selected
var selector = document.getElementById('selector') // selecting cover
var selected = document.getElementsByClassName('selected')[0] // selected cover

if(!selected){
    selected = document.createElement('div')
    selected.classList.add('selected')
    document.body.appendChild(selected)
}

if(!selector){
    selector = document.createElement('div')
    selector.id = 'selecting'
    document.body.appendChild(selector)
}

var moveListener = window.addEventListener('mousemove', event => {
    let target = event.target
    if(target.id === 'selecting' || target.classList.contains('selected') || status !== 0) return
    highlight(target, selector)
})

var keyListener = window.addEventListener('keydown', event => {
    if(status !== 0 || status !== 1) return
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    let target = event.target
    switch(event.key){
        case 'Escape':
        case 'a':
            stop()
            break
        case 'ArrowUp':
            selected(selected.parentElement, selected)
            break
        case 'ArrowDown':
            selected(selected.firstElementChild, selected)
            break
        case 'ArrowLeft':
            selected(selected.previousElementSibling, selected)
            break
        case 'ArrowRight':
            selected(selected.nextElementSibling, selected)
            break
    }
})

var clickListener = window.addEventListener('click', event => {
    if(status !== 0) return
    console.log(event)
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    status = 1
    let target = event.target
    if(selector) selector.remove()
    highlight(target, selected)
})