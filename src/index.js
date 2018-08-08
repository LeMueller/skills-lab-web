import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

import * as cursorSubmit from './cursorSubmit';
import * as drawerOpen from './drawerOpen';
import * as doorOpen from './doorOpen';
import * as clockRoll from './clockRoll';
import * as handDisinfection from './handDisinfection';
import * as wasteBinCapOpen from './wasteBinCapOpen';
import * as clothBottleCapOpen from './clothBottleCapOpen';
import * as portfolio from './portfolio';
import * as portfolioCheck from './portfolioCheck';
import * as glove from './glove';
import * as disinfectionClothInBottle from './disinfectionClothInBottle';
import * as disinfectionClothOnTable from './disinfectionClothOnTable';
import * as bottleNacl500 from './bottleNacl500';
import * as infusionSet from './infusionSet';
import * as drawerOpenWithInfusionSet from './drawerOpenWithInfusionSet';
import * as nameLabelStamper from './nameLabelStamper';
import * as drawerOpenWithHandle from './drawerOpenWithHandle';
import * as toggleBoxPortfolioCheck from './toggleBoxPortfolioCheck';
import * as bottle_nacl_500_vive from './bottleNacl500Vive';

import * as toggleBoxDesk from './toggleBoxDesk';
import * as toggleBoxTrashCan from './toggleBoxTrashCan';

import * as disinfectionClothOnTableVive from './disinfectionClothOnTableVive';

import * as getWorldBound from '../utils/getWorldPositionAndBound';

import * as sectionSelection from './sectionSelection';

import * as controllerManage from '../utils/controllerManage';


import * as debugTool from './debugTool';

import * as controllerActions from '../utils/controllerActions';

stateIndex.init();
controllerStateIndex.initControllerState();
