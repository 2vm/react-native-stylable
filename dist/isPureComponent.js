Object.defineProperty(exports,"__esModule",{value:true});function isPureComponent(comp){if(typeof comp==='string'){return false;}var p=comp.prototype;
return p && (p.render || p.isPureReactComponent || !p.setState);}exports.default=isPureComponent;
