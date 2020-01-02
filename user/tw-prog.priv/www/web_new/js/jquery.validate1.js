/* svn info: $Revision: 847 $ $Date: 2018-06-06 18:37:11 +0800 (Wed, 06 Jun 2018) $ */
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
!function(h){h.extend(h.fn,{validate:function(t){if(this.length){var i=h.data(this[0],"validator");return i||(this.attr("novalidate","novalidate"),i=new h.validator(t,this[0]),h.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(t){i.settings.submitHandler&&(i.submitButton=t.target),h(t.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==h(t.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(e){function t(){var t;return!i.settings.submitHandler||(i.submitButton&&(t=h("<input type='hidden'/>").attr("name",i.submitButton.name).val(h(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&t.remove(),!1)}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,t()):i.form()?i.pendingRequest?!(i.formSubmitted=!0):t():(i.focusInvalid(),!1)})),i)}t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){if(h(this[0]).is("form"))return this.validate().form();var t=!0,e=h(this[0].form).validate();return this.each(function(){t=t&&e.element(this)}),t},removeAttrs:function(t){var i={},s=this;return h.each(t.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},rules:function(t,e){var i=this[0];if(t){var s=h.data(i.form,"validator").settings,r=s.rules,n=h.validator.staticRules(i);switch(t){case"add":h.extend(n,h.validator.normalizeRule(e)),delete n.messages,r[i.name]=n,e.messages&&(s.messages[i.name]=h.extend(s.messages[i.name],e.messages));break;case"remove":if(!e)return delete r[i.name],n;var a={};return h.each(e.split(/\s/),function(t,e){a[e]=n[e],delete n[e]}),a}}var u=h.validator.normalizeRules(h.extend({},h.validator.classRules(i),h.validator.attributeRules(i),h.validator.dataRules(i),h.validator.staticRules(i)),i);if(u.required){var o=u.required;delete u.required,u=h.extend({required:o},u)}return u}}),h.extend(h.expr[":"],{blank:function(t){return!h.trim(""+h(t).val())},filled:function(t){return!!h.trim(""+h(t).val())},unchecked:function(t){return!h(t).prop("checked")}}),h.validator=function(t,e){this.settings=h.extend(!0,{},h.validator.defaults,t),this.currentForm=e,this.init()},h.validator.format=function(i,t){return 1===arguments.length?function(){var t=h.makeArray(arguments);return t.unshift(i),h.validator.format.apply(this,t)}:(2<arguments.length&&t.constructor!==Array&&(t=h.makeArray(arguments).slice(1)),t.constructor!==Array&&(t=[t]),h.each(t,function(t,e){i=i.replace(new RegExp("\\{"+t+"\\}","g"),function(){return e})}),i)},h.extend(h.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:h([]),errorLabelContainer:h([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t,e){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t,e){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){9===e.which&&""===this.elementValue(t)||(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t,e){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).addClass(e).removeClass(i):h(t).addClass(e).removeClass(i)},unhighlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).removeClass(e).addClass(i):h(t).removeClass(e).addClass(i)}},setDefaults:function(t){h.extend(h.validator.defaults,t)},messages:{},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=h(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||h(this.currentForm),this.containers=h(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var s=this.groups={};h.each(this.settings.groups,function(i,t){"string"==typeof t&&(t=t.split(/\s/)),h.each(t,function(t,e){s[e]=i})});var i=this.settings.rules;function t(t){var e=h.data(this[0].form,"validator"),i="on"+t.type.replace(/^validate/,"");e.settings[i]&&e.settings[i].call(e,this[0],t)}h.each(i,function(t,e){i[t]=h.validator.normalizeRule(e)}),h(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",t).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",t),this.settings.invalidHandler&&h(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),h.extend(this.submitted,this.errorMap),this.invalid=h.extend({},this.errorMap),this.valid()||h(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(t){t=this.validationTargetFor(this.clean(t)),this.lastElement=t,this.prepareElement(t),this.currentElements=h(t);var e=!1!==this.check(t);return e?delete this.invalid[t.name]:this.invalid[t.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(e){if(e){for(var t in h.extend(this.errorMap,e),this.errorList=[],e)this.errorList.push({message:e[t],element:this.findByName(t)[0]});this.successList=h.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){h.fn.resetForm&&h(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{h(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var e=this.lastActive;return e&&1===h.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var t=this,e={};return h(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),!(this.name in e||!t.objectLength(h(this).rules()))&&(e[this.name]=!0)})},clean:function(t){return h(t)[0]},errors:function(){var t=this.settings.errorClass.replace(" ",".");return h(this.settings.errorElement+"."+t,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=h([]),this.toHide=h([]),this.currentElements=h([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(t){var e=h(t).attr("type"),i=h(t).val();return"radio"===e||"checkbox"===e?h("input[name='"+h(t).attr("name")+"']:checked").val():"string"==typeof i?i.replace(/\r/g,""):i},check:function(e){e=this.validationTargetFor(this.clean(e));var t,i=h(e).rules(),s=!1,r=this.elementValue(e);for(var n in i){var a={method:n,parameters:i[n]};try{if("dependency-mismatch"===(t=h.validator.methods[n].call(this,r,e,a.parameters))){s=!0;continue}if(s=!1,"pending"===t)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(""!==t)return this.settings.messages[e.name]=t,this.formatAndAdd(e,a),!1}catch(t){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+a.method+"' method.",t),t}}if(!s)return this.objectLength(i)&&this.successList.push(e),!0},customDataMessage:function(t,e){return h(t).data("msg-"+e.toLowerCase())||t.attributes&&h(t).attr("data-msg-"+e.toLowerCase())},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(t,e){return this.findDefined(this.customMessage(t.name,e),this.customDataMessage(t,e),!this.settings.ignoreTitle&&t.title||void 0,h.validator.messages[e],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e.method),s=/\$?\{(\d+)\}/g;"function"==typeof i?i=i.call(this,e.parameters,t):s.test(i)&&(i=h.validator.format(i.replace(s,"{$1}"),e.parameters)),this.errorList.push({message:i,element:t}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e;for(t=0;this.errorList[t];t++){var i=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return h(this.errorList).map(function(){return this.element})},showLabel:function(t,e){var i=this.errorsFor(t);i.length?(i.removeClass(this.settings.validClass).addClass(this.settings.errorClass),i.html("<br>"+e)):(i=h("<"+this.settings.errorElement+">").attr("for",this.idOrName(t)).addClass(this.settings.errorClass).html("<br>"+e||""),this.settings.wrapper&&(i=i.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(i).length||(this.settings.errorPlacement?this.settings.errorPlacement(i,h(t)):i.insertAfter(t))),!e&&this.settings.success&&(i.text(""),"string"==typeof this.settings.success?i.addClass(this.settings.success):this.settings.success(i,t)),this.toShow=this.toShow.add(i)},errorsFor:function(t){var e=this.idOrName(t);return this.errors().filter(function(){return h(this).attr("for")===e})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(t){return h(this.currentForm).find("[name='"+t+"']")},getLength:function(t,e){switch(e.nodeName.toLowerCase()){case"select":return h("option:selected",e).length;case"input":if(this.checkable(e))return this.findByName(e.name).filter(":checked").length}return t.length},depend:function(t,e){return!this.dependTypes[typeof t]||this.dependTypes[typeof t](t,e)},dependTypes:{boolean:function(t,e){return t},string:function(t,e){return!!h(t,e.form).length},function:function(t,e){return t(e)}},optional:function(t){var e=this.elementValue(t);return!h.validator.methods.required.call(this,e,t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(t,e){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],e&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(h(this.currentForm).submit(),this.formSubmitted=!1):!e&&0===this.pendingRequest&&this.formSubmitted&&(h(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return h.data(t,"previousValue")||h.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,e){t.constructor===String?this.classRuleSettings[t]=e:h.extend(this.classRuleSettings,t)},classRules:function(t){var e={},i=h(t).attr("class");return i&&h.each(i.split(" "),function(){this in h.validator.classRuleSettings&&h.extend(e,h.validator.classRuleSettings[this])}),e},attributeRules:function(t){var e={},i=h(t),s=i[0].getAttribute("type");for(var r in h.validator.methods){var n;"required"===r?(""===(n=i.get(0).getAttribute(r))&&(n=!0),n=!!n):n=i.attr(r),/min|max/.test(r)&&(null===s||/number|range|text/.test(s))&&(n=Number(n)),n?e[r]=n:s===r&&"range"!==s&&(e[r]=!0)}return e},dataRules:function(t){var e,i,s={},r=h(t);for(e in h.validator.methods)void 0!==(i=r.data("rule-"+e.toLowerCase()))&&(s[e]=i);return s},staticRules:function(t){var e={},i=h.data(t.form,"validator");return i.settings.rules&&(e=h.validator.normalizeRule(i.settings.rules[t.name])||{}),e},normalizeRules:function(s,r){return h.each(s,function(t,e){if(!1!==e){if(e.param||e.depends){var i=!0;switch(typeof e.depends){case"string":i=!!h(e.depends,r.form).length;break;case"function":i=e.depends.call(r,r)}i?s[t]=void 0===e.param||e.param:delete s[t]}}else delete s[t]}),h.each(s,function(t,e){s[t]=h.isFunction(e)?e(r):e}),h.each(["rangelength","range"],function(){var t;s[this]&&(h.isArray(s[this])?s[this]=[Number(s[this][0]),Number(s[this][1])]:"string"==typeof s[this]&&(t=s[this].split(/[\s,]+/),s[this]=[Number(t[0]),Number(t[1])]))}),h.validator.autoCreateRanges&&s.min&&s.max&&(s.range=[s.min,s.max],delete s.min,delete s.max),s},normalizeRule:function(t){if("string"==typeof t){var e={};h.each(t.split(/\s/),function(){e[this]=!0}),t=e}return t},addMethod:function(t,e,i){h.validator.methods[t]=e,h.validator.messages[t]=void 0!==i?i:h.validator.messages[t],e.length<3&&h.validator.addClassRules(t,h.validator.normalizeRule(t))},methods:{required:function(t,e,i){if(!this.depend(i,e))return"dependency-mismatch";if("select"===e.nodeName.toLowerCase()){var s=h(e).val();return s&&0<s.length}return this.checkable(e)?0<this.getLength(t,e):0<h.trim(t).length},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString())},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9 \-]+/.test(t))return!1;for(var i=0,s=0,r=!1,n=(t=t.replace(/\D/g,"")).length-1;0<=n;n--){var a=t.charAt(n);s=parseInt(a,10),r&&9<(s*=2)&&(s-=9),i+=s,r=!r}return i%10==0},minlength:function(t,e,i){var s=h.isArray(t)?t.length:this.getLength(h.trim(t),e);return this.optional(e)||i<=s},rangelength:function(t,e,i){var s=h.isArray(t)?t.length:this.getLength(h.trim(t),e);return this.optional(e)||s>=i[0]&&s<=i[1]},min:function(t,e,i){return this.optional(e)||i<=t},max:function(t,e,i){return this.optional(e)||t<=i},range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},equalTo:function(t,e,i){var s=h(i);return this.settings.onfocusout&&s.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){h(e).valid()}),t===s.val()},remote:function(n,a,t){if(this.optional(a))return"dependency-mismatch";var u=this.previousValue(a);if(this.settings.messages[a.name]||(this.settings.messages[a.name]={}),u.originalMessage=this.settings.messages[a.name].remote,this.settings.messages[a.name].remote=u.message,t="string"==typeof t&&{url:t}||t,u.old===n)return u.valid;u.old=n;var o=this;this.startRequest(a);var e={};return e[a.name]=n,h.ajax(h.extend(!0,{url:t,mode:"abort",port:"validate"+a.name,dataType:"json",data:e,success:function(t){o.settings.messages[a.name].remote=u.originalMessage;var e=!0===t||"true"===t;if(e){var i=o.formSubmitted;o.prepareElement(a),o.formSubmitted=i,o.successList.push(a),delete o.invalid[a.name],o.showErrors()}else{var s={},r=t||o.defaultMessage(a,"remote");s[a.name]=u.message=h.isFunction(r)?r(n):r,o.invalid[a.name]=!0,o.showErrors(s)}u.valid=e,o.stopRequest(a,e)}},t)),"pending"}}}),h.format=h.validator.format}(jQuery),function(s){var r={};if(s.ajaxPrefilter)s.ajaxPrefilter(function(t,e,i){var s=t.port;"abort"===t.mode&&(r[s]&&r[s].abort(),r[s]=i)});else{var n=s.ajax;s.ajax=function(t){var e=("mode"in t?t:s.ajaxSettings).mode,i=("port"in t?t:s.ajaxSettings).port;return"abort"===e?(r[i]&&r[i].abort(),r[i]=n.apply(this,arguments),r[i]):n.apply(this,arguments)}}}(jQuery),function(r){r.extend(r.fn,{validateDelegate:function(i,t,s){return this.bind(t,function(t){var e=r(t.target);if(e.is(i))return s.apply(e,arguments)})}})}(jQuery);