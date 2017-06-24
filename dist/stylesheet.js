Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _node=require('./node');var _node2=_interopRequireDefault(_node);var _selectors=require('./selectors');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Rule=function(){function Rule(selector,props,rank){_classCallCheck(this,Rule);this.selector=selector;this.rank=rank;this.props=props.props;this.style=props.style;this.mixins=props.mixins;}_createClass(Rule,[{key:'getKey',value:function getKey(){return this.selector.getName();}},{key:'getSelector',value:function getSelector(){return this.selector.toString();}},{key:'getRank',value:function getRank(){return this.rank;}},{key:'getOrder',value:function getOrder(){return this.selector.getSpecificity();}},{key:'matchContext',value:function matchContext(node){return this.selector.matchContext(node);}}]);return Rule;}();function ruleComparator(r1,r2){var cmp=r2.getRank()-r1.getRank();if(cmp===0)return r2.getOrder()-r1.getOrder();return cmp;}function mergeTo(target,source){for(var k in source){if(!target.hasOwnProperty(k))target[k]=source[k];}}function mergeRules(props,rules){var ownStyle=props.style;var style={};var isStyle=false;for(var i in rules){var rule=rules[i];if(rule.props!==undefined){mergeTo(props,rule.props);}if(rule.style!==undefined){mergeTo(style,rule.style);isStyle=true;}}if(isStyle){if(ownStyle===undefined){props.style=style;}else if(Array.isArray(ownStyle)){var newStyle=ownStyle.slice();newStyle.unshift(style);props.style=newStyle;}else{props.style=[style,ownStyle];}}}function shallowClone(props){var ret={};if(props!==undefined){for(var k in props){ret[k]=props[k];}}return ret;}var Stylesheet=function(){function Stylesheet(){_classCallCheck(this,Stylesheet);this.rules={};}_createClass(Stylesheet,[{key:'addDefaultRules',value:function addDefaultRules(rules){for(var selector in rules){this._addRule(selector,rules[selector],0);}}},{key:'addRules',value:function addRules(rules){for(var selector in rules){this._addRule(selector,rules[selector],1);}}},{key:'addDefaultRule',value:function addDefaultRule(selector,props){this._addRule(selector,props,0);}},{key:'addRule',value:function addRule(selector,props){this._addRule(selector,props,1);}},{key:'_addRule',value:function _addRule(selectorValue,props,rank){var selector=(0,_selectors.parseSelector)(selectorValue);var rule=new Rule(selector,props,rank);var key=rule.getKey();if(this.rules[key]===undefined){this.rules[key]=[rule];}else{var rules=this.rules[key];var i=rules.findIndex(function(el){return rule.getSelector()===el.getSelector()&&rule.getRank()===el.getRank();});if(i>=0){rules[i]=rule;}else{rules.push(rule);}}this.rules[key].sort(ruleComparator);}},{key:'getProps',value:function getProps(node){var ownProps=node.props;var props=shallowClone(ownProps);var rules=[];this.collectRules(rules,node);mergeRules(props,rules);return props;}},{key:'collectRules',value:function collectRules(target,node){if(this.rules[node.getName()]!==undefined){var rules=this.rules[node.getName()];for(var i in rules){var rule=rules[i];if(rule.matchContext(node)){target.push(rule);if(rule.mixins!==undefined){for(var j=0;j<rule.mixins.length;++j){var mixNode=new _node2.default(rule.mixins[j],undefined,node.getParent(),node.getStyleSheet());this.collectRules(target,mixNode);}}}}}}}]);return Stylesheet;}();exports.default=Stylesheet;