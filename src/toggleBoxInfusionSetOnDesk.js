import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { controllerActions } from "../utils/controllerActions";

import {setCanTriggerCapAndWheel} from "./infusionSetOpenVive";
import stateIndex from "./state";
import hints from '../utils/hints';

let element;

let currentControllerState;
let activeController;


export default AFRAME.registerComponent('toggle_box_infusion_set_on_desk', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxInfusionSetOnDesk ( triggerEvent ) {
    /*// getWorldBound(element);
    
    if(
        // isEmitted(element, triggerEvent.position)
        detectCollision(element, triggerEvent.activeController)
        && triggerEvent.activeController === controllerStateIndex.getControllerState('infusionSetInPackInHand')
    ){
        controllerStateIndex.setControllerState('infusionSetOnDeskOpened', true);
        setTimeout(()=>{
            setCanTriggerCapAndWheel(true);
        }, 500);
    }*/
}

export function handleControllerReleaseToggleBoxInfusionSetOnDesk ( triggerEvent ) {
    if(
        detectCollision(element, triggerEvent.activeController)
        && triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('infusionSetInPackInHand')
        && controllerStateIndex.getControllerState('infusionSetChecked')
    ){
        controllerStateIndex.setControllerState('infusionSetOnDeskOpened', true);
        // controllerStateIndex.setControllerState('isInfusionSetInPackHandling', false);
        setTimeout(()=>{
            setCanTriggerCapAndWheel(true);
        }, 500);
        stateIndex.set('hint', hints.closeRoller);
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetOnDesk (nextControllerState) {
    
    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
    ) {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


