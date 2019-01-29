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
    target = null,
    listeners = { // list of event listeners
    "click": window.addEventListener('click', event => {
        if (mode !== SELECTING) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        mode = SELECTED;
        target = event.target;
        highlight(target, selected);
        if (selector) selector.remove();
    }, true),
    "mousemove": window.addEventListener('mousemove', event => {
        let target = event.target;
        if (!target.classList.contains('selected') && mode === SELECTING)
            highlight(target, selector);
    }),
    "keydown": window.addEventListener('keydown', event => {
        if (mode === CANCEL) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        switch (event.key) {
            case 'Escape':
                stop();
                break;
            case 'ArrowUp':
                target = target.parentElement || target;
                highlight(target, selected);
                break;
            case 'ArrowDown':
                target = target.firstElementChild || target;
                highlight(target, selected);
                break;
            case 'ArrowLeft':
                target = target.previousElementSibling || target;
                highlight(target, selected);
                break;
            case 'ArrowRight':
                target = target.nextElementSibling || target;
                highlight(target, selected);
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
