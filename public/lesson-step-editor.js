Polymer({
    is: 'lesson-step-editor',

    /*********************************************************************************************************************/
    /*                                       PROPERTIES, LISTENERS, AND OBSERVERS                                        */
    /*********************************************************************************************************************/

    properties: {
        content: {
            type: Object,
            observer: '_contentChanged'
        },
        curentstep: {
            type: Number,
        },
        curentpart: {
            type: Number,
        },
        downloadsExist: {
            type: Boolean,
            value: false
        }
    },

    /*********************************************************************************************************************/
    /*                                                 POLYMER CALLBACKS                                                 */
    /*********************************************************************************************************************/

    ready: function() {
        this.updateStep();
    },

    /*********************************************************************************************************************/
    /*                                             PROPERTY CHANGED LISTENERS                                            */
    /*********************************************************************************************************************/

    _contentChanged: function(e) {
        console.log(e);
    },

    /*********************************************************************************************************************/
    /*                                              ID ASSIGNMENT FUNCTIONS                                              */
    /*********************************************************************************************************************/


    /*********************************************************************************************************************/
    /*                                            FUNCTIONS FOR FIRING EVENTS                                            */
    /*********************************************************************************************************************/


    /*********************************************************************************************************************/
    /*                                               INTERACTIVE FUNCTIONS                                               */
    /*********************************************************************************************************************/
    // These functions change elements on the page, such as updating text.

    updateStep: function() {
        this.$.contentsofeditor.innerHTML = '';
        var i;
        var j;
        for (i = 0; i < this.content.sections.length; i++) {
            var section = this.content.sections[i];
            var newSecElDiv = this._createNewSection(section, i);
            for (j = 0; j < section.assets.length; j++) {
                var assetContent = section.assets[j];
                this._appendAssets(newSecElDiv, assetContent);
            }
            this.$.contentsofeditor.appendChild(newSecElDiv);
        }
    },

    _createNewSection: function(section, i) {
        var newSecElDiv = document.createElement("DIV");
        var newSecEl = document.createElement("lesson-section-editor");
        var newSecElMenu = document.createElement("lesson-section-selector");
        newSecEl = this._initializeSectionEditor(newSecEl, i);
        newSecElMenu = this._initializeSectionSelector(newSecElMenu, i);
        this._appendSectionToDiv(newSecElDiv, newSecEl, newSecElMenu, section);
        return newSecElDiv;
    },

    _initializeSectionEditor: function(newSecEl, i) {
        return newSecEl;
        newSecEl.sectionName = section.name;
        if (i == 0) {
            newSecEl.$.lessonsectiondiv.classList.remove("section");
        }
        newSecEl.theid = section.id;
        newSecEl.id = section.id;
    },

    _initializeSectionSelector: function(newSecElMenu, i) {
        newSecElMenu.currentSection = i + 1;
        newSecElMenu.totalSections = this.content.sections.length;
        return newSecElMenu;
    },

    _appendSectionToDiv: function(newSecElDiv, newSecEl, newSecElMenu, section) {
        newSecElDiv.id = "section-" + section.id;
        newSecElDiv.appendChild(newSecElMenu);
        newSecElDiv.appendChild(newSecEl);
    },

    _appendAssets: function(newSecElDiv, assetContent) {
        switch (assetContent.type) {
            case "text":
                this._createTextAsset(newSecElDiv, assetContent);
                break;
            case "image":
                this._createImageAsset(newSecElDiv, assetContent);
                break;
            case "warning":
                this._createWarningAsset(newSecElDiv, assetContent);
                break;
            case "notabene":
                this._createNotaBeneAsset(newSecElDiv, assetContent);
                break;
            case "video":
                this._createVideoAsset(newSecElDiv, assetContent);
                break;
            case "codeblock":
                this._createCodeblockAsset(newSecElDiv, assetContent);
                break;
            case "list_ordered":
                this._createOrderedListAsset(newSecElDiv, assetContent);
                break;
            case "list_unordered":
                this._createUnorderedListAsset(newSecElDiv, assetContent);
                break;
            default:
                console.log("default");
        }
    },

    _createTextAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-text-editor");
        newEl.id = assetContent.id;
        newEl.thecontent = assetContent.content;
        newSecElDiv.appendChild(newEl);
    },

    _createImageAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-image-editor");
        newEl.id = assetContent.id;
        newEl.theid = assetContent.id;
        newEl.thepath = assetContent.path;
        newEl.thecaption = assetContent.caption;
        newSecElDiv.appendChild(newEl);
    },

    _createWarningAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-warning-editor");
        newEl.id = assetContent.id;
        newEl.theid = assetContent.id;
        newEl.thetitle = assetContent.title;
        newEl.thecontent = assetContent.content;
        newSecElDiv.appendChild(newEl);
    },

    _createNotaBeneAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-notabene-editor");
        newEl.id = assetContent.id;
        newEl.theid = assetContent.id;
        newEl.thetitle = assetContent.title;
        newEl.thecontent = assetContent.content;
        newSecElDiv.appendChild(newEl);
    },

    _createVideoAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-video-editor");
        newEl.id = assetContent.id;
        newEl.thepath = assetContent.path;
        newEl.thecaption = assetContent.caption;
        newSecElDiv.appendChild(newEl);
    },

    _createCodeblockAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-codeblock-editor");
        newEl.id = assetContent.id;
        newEl.theid = assetContent.id;
        newEl.lang = assetContent.language;
        newEl.code = assetContent.code;
        newSecElDiv.appendChild(newEl);
    },

    _createOrderedListAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-list-ordered-editor");
        newEl.id = assetContent.id;
        newEl.points = assetContent.points;
        newSecElDiv.appendChild(newEl);
    },

    _createUnorderedListAsset: function(newSecElDiv, assetContent) {
        var newEl = document.createElement("lesson-list-unordered-editor");
        newEl.id = assetContent.id;
        newEl.points = assetContent.points;
        newSecElDiv.appendChild(newEl);
    },

    /*********************************************************************************************************************/
    /*                                                  MISC FUNCTIONS                                                   */
    /*********************************************************************************************************************/

    activateScrollingFeature: function() {
        var bgHeader5 = document.querySelector('.bg-header4');
        var bgHeader6 = document.querySelector('.rightnavsections');
        var bgHeaderHeight = bgHeader5.offsetHeight;
        var bgHeaderHeight2 = bgHeader6.offsetHeight;
        var transformBgHeader = function() {
            var y = window.scrollY;
            if (y <= bgHeaderHeight) {
                y = 1.5 * y;
            }
            var s = bgHeader5.style;
            var s2 = bgHeader6.style;
            s.transform = s.webkitTransform = 'translate3d(0,' + -y + 'px,0)';
            if (y < 200) {
                s2.transform = s2.webkitTransform = 'translate3d(0,' + -y + 'px,0)';
            } else {
                s2.position = s2.webkitTransform = 'translate3d(0, -200px,0)';
            }
        }
        transformBgHeader();
    },

    /*********************************************************************************************************************/
    /*                                           POSSIBLY DEPRECATED FUNCTIONS                                           */
    /*********************************************************************************************************************/

    attributeChanged: function(name, type) {

    },

    handleOutboundLinkClicks: function(e) {
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: event.target.href,
            transport: 'beacon'
        });
    },

    toggle: function(e) {
        collapsegroup = e.target.attributes['targetgroup'].value;
        this.$[collapsegroup].toggle();
    }
});
