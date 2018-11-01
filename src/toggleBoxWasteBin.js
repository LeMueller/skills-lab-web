import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";
import {drop} from "./infusionSetCapVive";

let element;
let bottleNacl500Cap;
let infusionSetCap;

let currentControllerState;
let isInfusionSetCapOff = false;
let activeController;

export default AFRAME.registerComponent('toggle_box_waste_bin', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');
        infusionSetCap = document.querySelector('#infusionSetOpenCap');

        activeController = null;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

const schema = {
    naCl500CapInBinPosition: '0 0.679 -0.93',
    infusionSetCapInBinPosition: '-0.03 0.739 -0.920',
    dur : 500,
};

function dropBottleNacl500Cap(activeController) {
    $(bottleNacl500Cap).trigger('drop', [activeController]);
    aAnimationWrapper(bottleNacl500Cap, '', 'position', '', schema.naCl500CapInBinPosition, schema.dur, '', true, 'forwards');
}

function dropInfusionSetCap(activeController) {
    drop(activeController);
    // Wait for changing DOM element
    setTimeout(()=>{
        aAnimationWrapper(infusionSetCap, '', 'position', '', schema.infusionSetCapInBinPosition, schema.dur, '', true, 'forwards');
    }, 300);
}

export function handleControllerNotifyToggleBoxWasteBin( triggerEvent ) {

    if(
        controllerStateIndex.getControllerState('bottleNacl500CapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {


        // drop the cap of nacl 500
        if (
            detectCollision(element, triggerEvent.activeController)
            && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === triggerEvent.activeController.getAttribute('id')
        ) {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('bottleNacl500CapDroped', true);
            controllerStateIndex.setControllerState('isNacl500CapHandling', false);
        }
    }

    if (
        controllerStateIndex.getControllerState('infusionSetCapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {

        // drop the cap of infusion set
        if (
            detectCollision(element, triggerEvent.activeController)
            && controllerStateIndex.getControllerState('infusionSetCapInHand') === triggerEvent.activeController.getAttribute('id')
        ) {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('infusionSetCapOff', true);
        }
    }
}

export function handleControllerReleaseToggleBoxWasteBin( triggerEvent ) {

    console.log("controllerStateIndex.getControllerState('infusionSetCapInHand'): ", controllerStateIndex.getControllerState('infusionSetCapInHand'), typeof(controllerStateIndex.getControllerState('infusionSetCapInHand')));

    if(
        controllerStateIndex.getControllerState('bottleNacl500CapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {


        // drop the cap of nacl 500
        if (
            detectCollision(element, triggerEvent.activeController)
            && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === triggerEvent.activeController.getAttribute('id')
        ) {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('bottleNacl500CapDroped', true);
        }
    }

    if (
        controllerStateIndex.getControllerState('infusionSetCapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {
        // drop the cap of infusion set
        if (
            detectCollision(element, triggerEvent.activeController)
            && controllerStateIndex.getControllerState('infusionSetCapInHand') === triggerEvent.activeController.getAttribute('id')
        ) {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('infusionSetCapOff', true);
            controllerStateIndex.setControllerState('isInfusionSetCapInHandling', false);
            controllerStateIndex.setControllerState('infusionSetCapInHand', null);
            isInfusionSetCapOff = true;
        }
    }
}

export function handleControllerStateNotifyToggleBoxWasteBin (nextControllerState) {
    // drop cap of nacl 500 bottle
    if (
        nextControllerState.bottleNacl500CapInHand
        && nextControllerState.bottleNacl500CapDroped
        && !currentControllerState.bottleNacl500CapDroped
    ) {
        dropBottleNacl500Cap(activeController);
    }

    // drop cap of infusion set
    if (
        nextControllerState.infusionSetCapInHand
        && nextControllerState.infusionSetCapOff
        && !isInfusionSetCapOff
    ) {
        dropInfusionSetCap(activeController);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


