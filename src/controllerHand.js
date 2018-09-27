import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

let controllerRightHand;
let controllerLeftHand;

let controllerRight;
let controllerLeft;

let opacityByGrasping = 0.2;

export default AFRAME.registerComponent('controller_hand', {

    init: function(){
        // shallow copy
        controllerRightHand = document.querySelector('#rightHand');
        controllerLeftHand = document.querySelector('#leftHand');

        controllerRight = document.querySelector('#viveControllerRight');
        controllerLeft = document.querySelector('#viveControllerLeft');

        $(controllerRightHand).on('click', () => {
            controllerRightHand.setAttribute("animation-mixer", "loop: once");
            if (haveSthInHand(controllerRight)) {
                console.log("something in right hand!!!");
                setHandOpacity(controllerRightHand, opacityByGrasping);
            } else {
                controllerRightHand.removeAttribute("material");
                setHandOpacity(controllerRightHand, 1);
            }
        });

        controllerRightHand.addEventListener('animation-finished', ()=>{
            controllerRightHand.removeAttribute("animation-mixer");
        });

        $(controllerLeftHand).on('click', () => {
            controllerLeftHand.setAttribute("animation-mixer", "loop: once");
            if (haveSthInHand(controllerLeft)) {
                console.log("something in left hand!!!");
                setHandOpacity(controllerLeftHand, opacityByGrasping);
            } else {
                controllerLeftHand.removeAttribute("material");
                setHandOpacity(controllerLeftHand, 1);
            }
        });

        controllerLeftHand.addEventListener('animation-finished', ()=>{
            controllerLeftHand.removeAttribute("animation-mixer");
        });
    }
});

function setHandOpacity(handElement, opacity) {

    const mesh = handElement.getObject3D('mesh'); // For hand, the result is undefined
    if (!mesh) { return; }
    mesh.traverse(function (node) {
        if (node.isMesh) {
            node.material.opacity = opacity;
            node.material.transparent = opacity < 1.0;
            node.material.needsUpdate = true;
            node.material.alphaTest = 0.1;
        }
    });
}

export function setBothHandOpacity() {
    controllerLeftHand.removeAttribute("material");
    setHandOpacity(controllerLeftHand, 1);
    controllerRightHand.removeAttribute("material");
    setHandOpacity(controllerRightHand, 1);
}

function haveSthInHand(controllerElement){
    const children = controllerElement.childNodes;
    for (let i=0; i<children.length; i++) {
        if (
            children[i].nodeType === 1 // nodeType === 1: element
            && children[i].getAttribute('id') !== 'leftHand'
            && children[i].getAttribute('id') !== 'rightHand'
            && children[i].getAttribute('id') !== 'leftHandIndicator'
            && children[i].getAttribute('id') !== 'rightHandIndicator'
            && children[i].getAttribute('visible')
        ) {
            return true;
        }
    }
    return false;
}

export function handleNotifyControllerHand(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyControllerHand ( triggerEvent ) {
    if (triggerEvent.activeController.getAttribute('id')==='viveControllerRight') {
        $(controllerRightHand).trigger('click');
    }
    else if (triggerEvent.activeController.getAttribute('id')==='viveControllerLeft') {
        $(controllerLeftHand).trigger('click');
    }
}

export function handleControllerStateNotifyControllerHand (nextControllerState) {


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


