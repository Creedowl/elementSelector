/* Utility Functions */

// exit selecting mode & reset event listeners
function stop() {
    mode = CANCEL;
    selector.remove();
    target = null;
    Object.keys(listeners).map(key => { window.removeEventListener(key, listeners[key]); });
}

// highlight the element where the mouse is
function highlight(target, cover){
    let rect = target.getBoundingClientRect(),
        bodyRect = document.body.getBoundingClientRect();
    cover.style.top = rect.top - bodyRect.top + 'px';
    cover.style.left = rect.left - bodyRect.left + 'px';
    cover.style.width = rect.width + 'px';
    cover.style.height = rect.height + 'px';
    cover.style.zIndex = target.style.zIndex !== '' ? target.style.zIndex + 1 : 100000000;
}

/* Main Procedure */

var CANCEL = -1, SELECTED = 0, SELECTING = 1, // constants representing current mode
    mode = SELECTING; // current mode: CANCLE, SELECTED or SELECTING
    selected = document.getElementsByClassName('selected')[0], // cover for selected element
    selector = document.getElementById('selector'); // cover for selecting element
    target = null, // selector
    listeners = { // list of event listeners
    "click": window.addEventListener('click', event => {
        if (mode !== SELECTING) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        mode = SELECTED;
        let target = event.target;
        highlight(target, selected);
        if (selector) selector.remove();
    }, true),
    "mousemove": window.addEventListener('mousemove', event => {
        target = event.target;
        if (!target.classList.contains('selected') && mode === SELECTING)
            highlight(target, selector);
    }),
    "keydown": window.addEventListener('keydown', event => {
        if (mode !== SELECTING) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        switch (event.key) {
            case 'Escape':
                stop();
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
                target = target.parentElement || target;
                highlight(target, selector);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                target = target.firstElementChild || target;
                highlight(target, selector);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                target = target.previousElementSibling || target;
                highlight(target, selector);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                target = target.nextElementSibling || target;
                highlight(target, selector);
                break;
        };
    })};

if (!selected) {
    selected = document.createElement('div');
    selected.className = 'selected';
    document.body.appendChild(selected);
}

if (!selector) {
    selector = document.createElement('div');
    selector.id = 'selecting';
    document.body.appendChild(selector);
}
