'use strict';

let jQuery = require('jquery');

// Activate Magnific Popup plugin if needed
if (typeof jQuery.magnificPopup === 'undefined') {
    console.log('Activating Magnific Popup');
    require('magnific-popup');
}

let PagePopup = function PagePopup() {
    this._foldersPopupEnabled = {}
};

/**
 * @param folder {Folder}
 */
PagePopup.prototype.addPopupToPagesOfFolder = function addPopupToPagesOfFolder(folder) {
    if (this._foldersPopupEnabled[folder.id]) {
        return;
    }

    this._foldersPopupEnabled[folder.id] = true;
    folder.pageList.forEach(function (page) {
        jQuery(page.element).find('.page-large-img-anchor').magnificPopup({type:'image'});
    });
};

module.exports = PagePopup;
