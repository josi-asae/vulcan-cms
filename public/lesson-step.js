Polymer({
  is: 'lesson-step',
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
  _contentChanged: function(e) {
    console.log(e);
  },
  activateScrollingFeature: function () {
    var bgHeader5 = document.querySelector('.bg-header4');
    var bgHeader6 = document.querySelector('.rightnavsections');
    var bgHeaderHeight = bgHeader5.offsetHeight;
    var bgHeaderHeight2 = bgHeader6.offsetHeight;
    var transformBgHeader = function () {
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
  ready: function () {
    this.updateStep();
  },
  updateStep: function () {
    this.$.newthing.innerHTML = '';

    var i;
    var j;
    for (i = 0; i < this.content.sections.length; i++) {
      var section = this.content.sections[i];
      var newSecEl = document.createElement("lesson-section");
      newSecEl.sectionName = section.name;
      if (i == 0) {
        newSecEl.$.lessonsectiondiv.classList.remove("section");
      }
      newSecEl.id = "1234";
      this.$.newthing.appendChild(newSecEl);
      for (j = 0; j < this.content.sections[i].assets.length; j++) {
        var assetContent = this.content.sections[i].assets[j];
        switch (assetContent.type) {
          case "text":
            var newEl = document.createElement("lesson-text");
            newEl.thecontent = assetContent.content;
            this.$.newthing.appendChild(newEl);
            break;
          case "link":
            var newEl = document.createElement("lesson-link");
            newEl.thecopy = assetContent.copy;
            newEl.theurl = assetContent.url;
            this.$.newthing.appendChild(newEl);
            break;
          case "image":
            var newEl = document.createElement("lesson-image");
            newEl.thepath = assetContent.path;
            newEl.thecaption = assetContent.caption;
            this.$.newthing.appendChild(newEl);
            break;
          case "warning":
            var newEl = document.createElement("lesson-warning");
            newEl.thetitle = assetContent.title;
            newEl.thecontent = assetContent.content;
            this.$.newthing.appendChild(newEl);
            break;
          case "notabene":
            var newEl = document.createElement("lesson-notabene");
            newEl.thetitle = assetContent.title;
            newEl.thecontent = assetContent.content;
            this.$.newthing.appendChild(newEl);
            break;
          case "video":
            var newEl = document.createElement("lesson-video");
            newEl.thepath = assetContent.path;
            newEl.thecaption = assetContent.caption;
            this.$.newthing.appendChild(newEl);
            break;
          case "codeblock":
            var newEl = document.createElement("lesson-codeblock");
            newEl.lang = assetContent.language;
            newEl.code = assetContent.code;
            newEl._render();
            this.$.newthing.appendChild(newEl);
            break;
          case "list_ordered":
            var newEl = document.createElement("lesson-list-ordered");
            newEl.points = assetContent.points;
            this.$.newthing.appendChild(newEl);
            break;
          case "list_unordered":
            var newEl = document.createElement("lesson-list-unordered");
            newEl.points = assetContent.points;
            this.$.newthing.appendChild(newEl);
            break;
          case "download_button":
            var newEl = document.createElement("lesson-download");
            newEl.thepath = assetContent.path;
            newEl.thecopy = assetContent.copy;
            this.$.newthing.appendChild(newEl);
            break;
          default:
            console.log("default");
        }
      }
    }
  },

  attributeChanged: function (name, type) {
  },
  properties: {
    content: {
      type: Object,
    }
  },
  handleOutboundLinkClicks: function (e) {
    ga('send', 'event', {
      eventCategory: 'Outbound Link',
      eventAction: 'click',
      eventLabel: event.target.href,
      transport: 'beacon'
    });
  },
  toggle: function (e) {
    collapsegroup = e.target.attributes['targetgroup'].value;
    this.$[collapsegroup].toggle();
  }
});
