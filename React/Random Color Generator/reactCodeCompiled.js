"use strict";function _instanceof(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!_instanceof(e,t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var Main=function(e){function t(){var e;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(e=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this))),"cowClick",function(){e.rerollColors()}),e.state={allColors:[]},e}return _inherits(t,React.Component),_createClass(t,[{key:"componentDidMount",value:function(){this.rerollColors()}},{key:"rerollColors",value:function(){var e=randomColor({count:8,hue:"red"}),t=randomColor({count:10,hue:"orange"}),o=randomColor({count:10,hue:"yellow"}),r=randomColor({count:10,hue:"green"}),n=randomColor({count:10,hue:"blue"}),l=randomColor({count:10,hue:"purple"}),i=randomColor({count:10,hue:"pink"});this.setState({allColors:e.concat(t,o,r,n,l,i)})}},{key:"render",value:function(){return React.createElement("div",{id:"mainContent"},React.createElement(TextSquare,{cowClick:this.cowClick,textContent:"Randomize!"}),this.state.allColors.map(function(e){return React.createElement(ColorSquare,{bgColor:e,key:uuidv1()})}),React.createElement("h6",null,"Powered by ",React.createElement("a",{target:"_blank",href:"https://randomcolor.lllllllllllllllll.com/"},"randomColor.js")))}}]),t}(),TextSquare=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,_getPrototypeOf(t).apply(this,arguments))}return _inherits(t,React.Component),_createClass(t,[{key:"render",value:function(){return React.createElement("div",{className:"TextSquare "+this.props.cowClass,onClick:this.props.cowClick},this.props.textContent)}}]),t}(),ColorSquare=function(e){function t(){var e;return _classCallCheck(this,t),_defineProperty(_assertThisInitialized(e=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this))),"copyHexcode",function(){copyTextToClipboard(e.props.bgColor),e.setState({textContent:"Copied!"})}),_defineProperty(_assertThisInitialized(e),"resetTextToBGColor",function(){e.setState({textContent:e.state.bgColor})}),e.state={bgColor:"",textContent:"",textColor:""},e}return _inherits(t,React.Component),_createClass(t,[{key:"componentDidMount",value:function(){var e=invertCssColor(this.props.bgColor);this.setState({bgColor:this.props.bgColor,textContent:this.props.bgColor,textColor:e})}},{key:"render",value:function(){var e={background:this.state.bgColor,color:this.state.textColor};return React.createElement("div",{className:"ColorSquare",style:e,onClick:this.copyHexcode,onMouseOut:this.resetTextToBGColor},this.state.textContent)}}]),t}();ReactDOM.render(React.createElement(Main,null),reactRootDiv);