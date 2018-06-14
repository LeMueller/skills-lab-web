import $ from 'jquery';

const initState = {
    portfolio: {
        position: 'on-table', // 'on-table' || 'in-hand'
        checkPortfolio: {
            R1: false,
            R2: false,
            R3: false,
            R4: false,
            R5: false,
        },
    },
    tableDisinfection:{
        hasGlove: false,
        hasCloth: false,
        disinfected: false,
    },
    handDisinfection: false,
    bottlePrepare: {
        position: 'in-cupboard', // 'in-cupboard' || 'in-hand' || 'on-table' || 'hanged'
        checkBottle: {
            front: false,
            back: false,
            top: false,
        },
        withCap: true,
    },
    infusionSet: {
        position: 'in-drawer', // 'in-drawer' || 'in-hand' || 'on-table' || 'in-bottle'
        checkSet: {
            label: false,
        },
        rollerClapOpen: false,
        withCap: true,
        dripChamber:false,
        tubeEmpty: false,
        fixed: false,
    },
    nameLabel: {
        position: 'in-box', // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'If ready, please check the portfolio at first.'
};

let state;

export default class stateIndex {

    static init() {
        state = initState;
    }

    /**
     * Get the value of the prop in state.
     *
     * @param propString
     * @returns {*}
     */
    static get (propString) {
        return state[propString];
    }

    /**
     * Get the value of the props in state. Type of param should be array.
     *
     * @param propsArray
     * @returns {*}
     */
    static getIn (propsArray) {
        const lengthOfProps = propsArray.length;
        let result = state[propsArray[0]];
        if (lengthOfProps===1) {
            return result;
        }
        else {
            for(let i = 1; i < lengthOfProps; i++) {
                result = result[propsArray[i]];
            }
        }
        return result;
    }

    /**
     * Set the prop as the given value.
     *
     * @param propString
     * @param value
     */
    static set (propString, value) {
        state[propString] = value;
    }
}
