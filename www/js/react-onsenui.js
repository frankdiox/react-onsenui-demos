/*! react-onsenui.js for onsenui - v2.0.0-beta.7 - 2016-03-08 */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

var createDialogClass = function createDialogClass(domName, showFun) {
  var myClass = {
    show: function show() {
      this.node.firstChild.show();
    },
    hide: function hide() {
      this.node.firstChild.hide();
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      console.log('mounting');
      this.node = document.createElement('div');
      document.body.appendChild(this.node);

      this.node.addEventListener('cancel', function () {
        _this.props.onCancel();
      });
      this.renderPortal(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {

      if (newProps.isOpen != this.props.isOpen) {
        console.log('true');
        this.animateShow = true;
      }
      this.renderPortal(newProps);
    },
    componentWillUnmount: function componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    },
    _update: function _update() {
      CustomElements.upgrade(this.node.firstChild);
      if (this.props.isOpen) {
        if (this.animateShow) {
          console.log('show');
          this.show();
        }
        this.animateShow = false;
      } else {
        this.hide();
      }
    },
    renderPortal: function renderPortal(props) {
      var element = React.createElement(domName, props);
      ReactDOM.render(element, this.node, this._update);
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
      return false;
    },
    render: function render() {
      return React.DOM.noscript();
    }
  };
  if (showFun) {
    myClass.show = showFun;
  };

  return React.createClass(myClass);
};

var OnsAlertDialog = createDialogClass('ons-alert-dialog');
var OnsDialog = createDialogClass('ons-dialog');

var showFun = function showFun() {
  var target = this.props.getTarget();
  if (ReactTestUtils.isElement(target)) {
    target = ReactDOM.findDOMNode(target);
  }
  return this.node.firstChild.show(target);
};

var OnsPopover = createDialogClass('ons-popover', showFun);
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsFab = React.createClass({
  displayName: "OnsFab",

  render: function render() {
    return React.createElement(
      "ons-fab",
      _extends({}, this.props, { "class": "fab", _compiled: "" }),
      React.createElement(
        "span",
        { className: "fab__icon" },
        this.props.children
      )
    );
  }
});
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsInput = React.createClass({
  displayName: "OnsInput",

  render: function render() {
    return React.createElement(
      "ons-input",
      { value: this.props.value, _compiled: "" },
      React.createElement("input", _extends({ className: "text-input" }, this.props)),
      React.createElement(
        "span",
        { className: "text-input__label", style: { color: 'rgba(0, 0, 0, 0.498039)' } },
        " "
      )
    );
  }
});
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OnsNavigator = (function (_React$Component) {
  _inherits(OnsNavigator, _React$Component);

  function OnsNavigator(props) {
    _classCallCheck(this, OnsNavigator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OnsNavigator).call(this, props));

    _this.pages = [];
    _this.state = {};
    return _this;
  }

  _createClass(OnsNavigator, [{
    key: "update",
    value: function update(pages, obj) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.setState({}, resolve);
      });
    }
  }, {
    key: "pushPage",
    value: function pushPage(route) {
      var _this3 = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (this.running) {
        return;
      }

      var newPage = this.props.renderScene(route, this);

      this.running = true;
      this.routes.push(route);
      this.refs.navi._pushPage(options, this.update.bind(this), this.pages, newPage).then(function () {
        _this3.running = false;
      });
    }
  }, {
    key: "popPage",
    value: function popPage() {
      var _this4 = this;

      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (this.running) {
        return;
      }

      this.running = true;
      this.routes.pop();
      this.refs.navi._popPage(options, this.update.bind(this), this.pages).then(function () {
        _this4.running = false;
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.refs.navi.popPage = this.popPage.bind(this);
      this.routes = [this.props.initialRoute];
      this.pages = [this.props.renderScene(this.props.initialRoute, this)];
      this.setState({});
    }
  }, {
    key: "render",
    value: function render() {
      // render the last two pages
      for (var index = this.pages.length - 1; index >= this.pages.length - 2 && index >= 0; index--) {
        this.pages[index] = this.props.renderScene(this.routes[index], this);
      }

      return React.createElement(
        "ons-navigator",
        _extends({}, this.props, { ref: "navi" }),
        this.pages
      );
    }
  }]);

  return OnsNavigator;
})(React.Component);
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsPage = React.createClass({
  displayName: "OnsPage",

  render: function render() {
    var toolbar;
    var modal;
    var otherChildren = [];

    React.Children.forEach(this.props.children, function (child) {
      if (child == null) return;
      if (reactUtil.rendersToOnsToolbar(child)) {
        toolbar = child;
      } else if (reactUtil.rendersToOnsModal(child)) {
        modal = child;
      } else {
        otherChildren.push(child);
      }
    });

    return React.createElement(
      "ons-page",
      _extends({}, this.props, { _compiled: "true" }),
      toolbar,
      React.createElement(
        "div",
        { className: "page__background" },
        " "
      ),
      React.createElement(
        "div",
        { className: "page__content" },
        otherChildren
      ),
      React.createElement(
        "div",
        { className: "page__extra", style: { zIndex: 10001 } },
        modal
      )
    );
  }
});
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsPullHook = React.createClass({
  displayName: 'OnsPullHook',

  componentDidMount: function componentDidMount() {
    window.addEventListener('changestate', this.props.onChange);
    this.refs.pullHook.setActionCallback(this.props.onLoad);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.refs.pullHook.removeEventListener('changestate', this.pullHookChanged);
  },
  render: function render() {
    return React.createElement('ons-pull-hook', _extends({ ref: 'pullHook' }, this.props));
  }
});
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsSpeedDial = React.createClass({
  displayName: "OnsSpeedDial",

  componentDidMount: function componentDidMount() {
    var node = this.node = ReactDOM.findDOMNode(this);
    node._updateClasses();
  },
  render: function render() {
    var items = [];
    var btnContent = [];
    React.Children.forEach(this.props.children, function (child) {
      if (child == null) return;
      if (reactUtil.rendersTo(child, '<ons-speed-dial-item')) {
        items.push(child);
      } else {
        btnContent.push(child);
      }
    });

    return React.createElement(
      "ons-speed-dial",
      _extends({}, this.props, { _compiled: "" }),
      React.createElement(
        OnsFab,
        null,
        btnContent
      ),
      items
    );
  }
});
"use strict";

var OnsSpeedDialItem = React.createClass({
  displayName: "OnsSpeedDialItem",

  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement("ons-speed-dial-item", this.props);
  }
});
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsSwitch = React.createClass({
  displayName: 'OnsSwitch',

  render: function render() {
    var myStyle = {
      WebkitUserSelect: 'none',
      TouchAction: 'pan-y',
      WebkitUserDrag: 'none',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
    };
    return React.createElement(
      'ons-switch',
      _extends({ style: myStyle, 'class': 'switch', _compiled: '' }, this.props),
      React.createElement('input', _extends({ type: 'checkbox', className: 'switch__input' }, this.props)),
      React.createElement(
        'div',
        { className: 'switch__toggle' },
        React.createElement(
          'div',
          { className: 'switch__handle' },
          React.createElement('div', { className: 'switch__touch' })
        )
      )
    );
  }
});
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var OnsTabbar = React.createClass({
  displayName: 'OnsTabbar',

  getInitialState: function getInitialState() {
    return {
      activeIndex: this.props.initialIndex || 0
    };
  },

  componentDidMount: function componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    node.setActiveTab(this.state.activeIndex);
    node.addEventListener('prechange', this.handleChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this);
    node.removeEventListener('prechange', this.handleChange);
  },

  handleChange: function handleChange(event) {
    this.setState({ activeIndex: event.index });
  },

  setActiveTab: function setActiveTab(index, options) {
    ReactDOM.findDOMNode(this).setActiveTab(index, options);
  },

  getActiveTabIndex: function getActiveTabIndex() {
    return ReactDOM.findDOMNode(this).getActiveTabIndex();
  },

  render: function render() {
    var tabs = this.props.renderTabs(this.state.activeIndex, this);

    return React.createElement(
      'ons-tabbar',
      _extends({}, this.props, { activeIndex: this.state.activeIndex, _compiled: 'true' }),
      React.createElement(
        'div',
        { 'no-status-bar-fill': true, className: 'ons-tab-bar__content tab-bar__content' },
        tabs.map(function (tab) {
          return tab.content;
        })
      ),
      React.createElement(
        'div',
        { className: 'tab-bar ons-tab-bar__footer ons-tabbar-inner' },
        tabs.map(function (tab) {
          return tab.tab;
        })
      )
    );
  }
});

var OnsTab = React.createClass({
  displayName: 'OnsTab',

  render: function render() {
    return React.createElement('ons-tab', this.props);
  }
});
'use strict';

var createSimpleWrapperClass = function createSimpleWrapperClass(domName) {
  var myClass = {
    render: function render() {
      return React.createElement(domName, this.props, this.props.children);
    }
  };
  return React.createClass(myClass);
};

var OnsButton = createSimpleWrapperClass('ons-button');
var OnsToolbar = createSimpleWrapperClass('ons-toolbar');
var OnsBackButton = createSimpleWrapperClass('ons-back-button');
var OnsRipple = createSimpleWrapperClass('ons-ripple');
var OnsCarousel = createSimpleWrapperClass('ons-carousel');
var OnsCarouselItem = createSimpleWrapperClass('ons-carousel-item');
var OnsCarouselCover = createSimpleWrapperClass('ons-carousel-cover');
var OnsToolbarButton = createSimpleWrapperClass('ons-toolbar-button');
var OnsBottomToolbar = createSimpleWrapperClass('ons-buttom-toolbar');
var OnsListItem = createSimpleWrapperClass('ons-list-item');
var OnsList = createSimpleWrapperClass('ons-list');
var OnsIcon = createSimpleWrapperClass('ons-icon');
var OnsScroller = createSimpleWrapperClass('ons-scroller');
var OnsTabActive = createSimpleWrapperClass('ons-tab-active');
var OnsTabInactive = createSimpleWrapperClass('ons-tab-inactive');
'use strict';

var ReactTestUtils = React.addons.TestUtils;
var reactUtil = {};

reactUtil.rendersToOnsPage = function (obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-page');
};

reactUtil.rendersTo = function (obj, str) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith(str);
};

reactUtil.rendersToOnsToolbar = function (obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-toolbar');
};

reactUtil.rendersToOnsModal = function (obj) {
  var htmlString = ReactDOMServer.renderToStaticMarkup(obj);
  return htmlString.startsWith('<ons-modal');
};

reactUtil.lastChild = function (el) {
  return el.children[el.children.length - 1];
};

reactUtil.createCustomDialog = function (component) {
  var body = document.body;
  var container = document.createElement('div');
  body.appendChild(container);

  return new Promise(function (resolve) {
    ReactDOM.render(component, container, function () {
      resolve(container.firstChild);
    });
  });
};

reactUtil.templateMap = {};