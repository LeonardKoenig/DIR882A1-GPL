/* svn info: $Revision: 997 $ $Date: 2018-08-03 18:12:24 +0800 (Fri, 03 Aug 2018) $ */
define(["wizPath/wizardView"],function(i){function t(){$("#WizardSection").css({top:"","max-height":""}),$("#SurveyListTable").css({"max-height":""});var i=$(window).height();i<300&&(i=300);var t=0,e=i/2-$("#WizardSection").outerHeight()/2;0<e&&e<80?$("#WizardSection").css({top:e,"max-height":""}):80<=e?$("#WizardSection").css({top:80,"max-height":""}):isTouch()?$("#WizardSection").css({top:0,"max-height":""}):($("#WizardSection").css({top:0,"max-height":i}),t=10);var a=$("#WizardSection").height()-220-t;$("#SurveyListTable").css({"max-height":a})}return{initView:function(){$(window).resize(function(){t()}),t()}}});