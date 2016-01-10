'use strict';

let Page = function Page(id, thumbPath, imgPath) {
    this.id = id;
    this.folder = null;
    this.element = null;
    this.thumbPath = thumbPath;
    this.imgPath = imgPath;
};

module.exports = Page;
