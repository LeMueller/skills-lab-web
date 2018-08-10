
const observerOptions = {
    childList: true,
};

export class controllerActions {

    constructor (element, activeController, scale = 1) {
        this.el = element;
        this.scene = null;
        this.activeController = activeController;
        this.scale = scale;
        this.observer = this.buildObserver(this.el, this.scale);
        this.bindController(this.activeController);
    }

    buildObserver(element) {
        return (
            new MutationObserver((event) => {
                let nodeAdded = event[0].addedNodes.length > 0;
                let nodeRemoved = event[0].removedNodes.length > 0;
                if (nodeAdded) {
                    element.setAttribute('position', '0 0 0');
                    element.setAttribute('scale', `${this.scale} ${this.scale} ${this.scale}`);
                    element.setAttribute('visible', true);
                }
                if (nodeRemoved) {
                    element.setAttribute('visible', true);
                    let activePosition = this.activeController.getAttribute('position');
                    element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);
                }
            })
        );
    }

    bindController(activeController) {
        this.observer.observe(activeController, observerOptions);
    }

    drag() {
        console.log("drag:", this.el);
        this.activeController.appendChild(this.el);
    }

    drop() {
        console.log("drop:", this.el);
        this.scene = document.querySelector('#allThings');
        this.scene.appendChild(this.el);
    }

}