import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

let element;

let clothOnTable;

let currentControllerState;

export default AFRAME.registerComponent('toggle_box_trash_can', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        clothOnTable = document.querySelector('#clothOnTable');

    },

});

const schema = {
    inCan : '-0.89 0.1 -0.81',
    dur : 500,
};

function dropGloveCloth() {
    $(clothOnTable).trigger('drop');

    if(clothOnTable) {
        aAnimationWrapper(clothOnTable, '', 'position', '', schema.inCan, schema.dur, '',true , 'forwards');
    }
}

export function handleControllerNotifyToggleBoxTrashCan( triggerEvent ) {

    if(controllerStateIndex.getControllerState('deskDisinfection')) {

        getWorldBound(element);

        if(isEmitted(element, triggerEvent.position)){

            controllerStateIndex.setControllerState('deskDisinfectionAllFinish', true);

        }
    }
}

export function handleControllerStateNotifyToggleBoxTrashCan (nextControllerState) {

    if (nextControllerState.hasDisinfectionCloth && !currentControllerState.hasDisinfectionCloth) {
        setVisibleTrue(element);
    }

    if (nextControllerState.deskDisinfection && !currentControllerState.deskDisinfection) {
        $(element).attr('material', "color:#00ffff; transparent: true; opacity: 0.5");
    }

    if(nextControllerState.deskDisinfectionAllFinish && !currentControllerState.deskDisinfectionAllFinish) {
        dropGloveCloth();
        setVisibleFalse(element);
        stateIndex.setIn(['tableDisinfection', 'finish'], true);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


