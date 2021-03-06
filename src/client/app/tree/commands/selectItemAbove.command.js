'use strict';

(function() {

  class SelectItemAboveCommand {

    constructor(TreeStore, TreeNodeByIdStore, TreeSelection, TreeNode, TreeFocus) {
      this._TreeStore = TreeStore;
      this._TreeNodeByIdStore = TreeNodeByIdStore;
      this._TreeSelection = TreeSelection;
      this._TreeNode = TreeNode;
      this._TreeFocus = TreeFocus;
    }

    canExec() {
      return !this._TreeSelection.hasSelected() || (this._TreeSelection.selItemType() !== 'node' || this._TreeSelection.selItem().$meta.parentId);
    }

    exec() {
      if (this.canExec()) {
        let selItem = this._TreeSelection.selItem();
        if (!selItem) {
          this._select(this._TreeStore.rootNode, this._TreeStore.rootNode);
        } else {
          let aboveItemDef = this._TreeNode.getAboveNodeItem(this._TreeSelection.selNode(), selItem);
          if(aboveItemDef){
            this._select(aboveItemDef.node, aboveItemDef.item);
          }
        }
      }
    }

    _select(node, item){
      this._TreeSelection.select(node, item);
      this._TreeFocus.focusNode(node);
    }
  }

  angular.module('editorApp')
    .service('SelectItemAboveCommand', SelectItemAboveCommand)
    .config(function(CommandPaletteCfgProvider) {
      CommandPaletteCfgProvider.addCommand({
        service: 'SelectItemAboveCommand',
        name: 'core:Select Item Above',
        icon: 'arrow-up',
        hotkey: 'up',
      });
    });
})();
