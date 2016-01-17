'use strict';

let EventEmitter = require('events');
let requireOrgan = require('../requireOrgan');
let PageList = requireOrgan('models/pageList');

let assert = require('assert');

describe('PageList', function() {
    describe('#getNumberOfPages()', function () {
        it('should return 0 for an empty list', function () {
            let pageList = new PageList();
            assert.equal(0, pageList.getNumberOfPages());
        });

        it('should return the correct number of pages', function () {
            let page1 = {};
            let page2 = {};

            let pageList = new PageList();
            pageList.addPage(page1);
            pageList.addPage(page2);

            assert.equal(2, pageList.getNumberOfPages());
        });
    });

    describe('#addPage()', function () {
        it('should add pages to the end of the list by default', function () {
            let page1 = {id: 1};
            let page2 = {id: 2};

            let pageList = new PageList();
            pageList.addPage(page1);
            pageList.addPage(page2);

            assert.equal(page1, pageList.pages[0]);
            assert.equal(page2, pageList.pages[1]);
        });

        it('should add pages to the specified position', function () {
            let page1 = {id: 1};
            let page2 = {id: 2};
            let page3 = {id: 3};

            let pageList = new PageList();
            pageList.addPage(page1);
            pageList.addPage(page2);
            pageList.addPage(page3, 1);

            assert.equal(page1, pageList.pages[0]);
            assert.equal(page3, pageList.pages[1]);
            assert.equal(page2, pageList.pages[2]);
        });

        it('should set reference to the folder', function () {
            let folder = {name: 'foobar'};
            let page = {id: 1};

            let pageList = new PageList(folder);
            pageList.addPage(page);

            assert.equal(folder, page.folder);
        });

        it('should emit "page added" event', function () {
            let eventEmitter = new EventEmitter();
            let folder = {name: 'foobar'};
            let page = {id: 1};
            let eventTriggered = false;

            eventEmitter.on('page_added_to_folder',
                function (actualPage, actualFolder, actualPosition) {
                    assert.equal(page, actualPage);
                    assert.equal(folder, actualFolder);
                    assert.equal(0, actualPosition);
                    eventTriggered = true
                }
            );

            let pageList = new PageList(folder, eventEmitter);
            pageList.addPage(page);

            assert.ok(eventTriggered);
        });

    });

    describe('#removePage()', function () {
        it('should throw error when removing not available page', function () {
            let page = {id: 1};

            let pageList = new PageList();

            assert.throws(function () {
                pageList.removePage(page);
            }, Error);
        });

        it('should decrease the size of list', function () {
            let page = {id: 1};
            let pageList = new PageList();
            pageList.addPage(page);

            pageList.removePage(page);

            assert.equal(0, pageList.pages.length);
        });

        it('should remove the correct page', function () {
            let page1 = {id: 1};
            let page2 = {id: 2};
            let page3 = {id: 3};

            let pageList = new PageList();
            pageList.addPage(page1);
            pageList.addPage(page2);
            pageList.addPage(page3);

            pageList.removePage(page2);

            assert.equal(-1, pageList.pages.indexOf(page2));
            assert.equal(page1, pageList.pages[0]);
            assert.equal(page3, pageList.pages[1]);
        });

        it('should remove folder reference', function () {
            let folder = {name: 'foobar'};
            let page = {id: 1, folder: folder};
            let pageList = new PageList(folder);
            pageList.addPage(page);

            pageList.removePage(page);

            assert.notEqual(page.folder, folder);
        });

        it('should emit "page removed" event', function () {
            let eventEmitter = new EventEmitter();
            let folder = {name: 'foobar'};
            let page = {id: 1};
            let eventTriggered = false;

            eventEmitter.on('page_removed_from_folder',
                function (actualPage, actualFolder) {
                    assert.equal(page, actualPage);
                    assert.equal(folder, actualFolder);
                    eventTriggered = true
                }
            );

            let pageList = new PageList(folder, eventEmitter);
            pageList.addPage(page);

            pageList.removePage(page);

            assert.ok(eventTriggered);
        });

    });

    describe('#forEach()', function () {
        it('should properly loop over pages', function () {
            let page = {id: 1};

            let pageList = new PageList();
            pageList.addPage(page);

            pageList.forEach(function (pPage) {
                assert.equal(page, pPage);
            });
        });
    });

    describe('#sortPage()', function () {
        it('should throw error with invalid position', function () {
            let page = {id: 1};

            let pageList = new PageList();
            pageList.addPage(page);

            assert.throws(function () {
                pageList.sortPage(page, 1);
            }, Error);
        });

        it('should throw error with invalid page', function () {
            let page = {id: 1};
            let secondPage = {id: 2};

            let pageList = new PageList();
            pageList.addPage(page);

            assert.throws(function () {
                pageList.sortPage(secondPage, 0);
            }, Error);
        });

        it('should sort correctly', function () {
            let page = {id: 1};
            let secondPage = {id: 2};

            let pageList = new PageList();
            pageList.addPage(page);
            pageList.addPage(secondPage);

            pageList.sortPage(page, 1);

            assert.equal(secondPage, pageList.pages[0]);
            assert.equal(page, pageList.pages[1]);
        });

        it('should be idempotent', function () {
            let page = {id: 1};
            let secondPage = {id: 2};

            let pageList = new PageList();
            pageList.addPage(page);
            pageList.addPage(secondPage);

            pageList.sortPage(page, 0);
            pageList.sortPage(secondPage, 1);

            assert.equal(page, pageList.pages[0]);
            assert.equal(secondPage, pageList.pages[1]);
        });
    });
});