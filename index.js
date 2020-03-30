'use strict';


/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/semantic-dom-selectors.js', { type: 'test' });
    this.import('vendor/qunit-semantic-assertions.js', { type: 'test' });
  },

  treeForVendor(vendorTree) {
    const realPath = this._packageInfo.realPath;
    const nodeModulesPath = realPath.substring(0, realPath.lastIndexOf('/'));

    let semanticTestHelperTree = new Funnel(`${nodeModulesPath}/semantic-dom-selectors/dist`, {
      files: ['semantic-dom-selectors.js', 'semantic-dom-selectors.js.map'],
    });
    let qunitSemanticAssertionsTree = new Funnel(`${nodeModulesPath}/qunit-semantic-assertions/dist`, {
      files: ['qunit-semantic-assertions.js', 'qunit-semantic-assertions.js.map'],
    });
    if(vendorTree){
      //if tree is for app this is not null
      return new MergeTrees([vendorTree, semanticTestHelperTree, qunitSemanticAssertionsTree]);
    } else {
      //if is an addon this is null
      return new MergeTrees([qunitSemanticAssertionsTree,semanticTestHelperTree]);
    }
  },
}
