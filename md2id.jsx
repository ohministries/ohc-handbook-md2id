﻿var template = File.openDialog ("Select template","Templates:*.indt",false);var myDocument = app.open(template);myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;function addPageWithTextbox() {	var myNewPage = myDocument.pages.add();	var myMargin = myNewPage.marginPreferences;	var myBounds = [myMargin.top, myMargin.left, myDocument.documentPreferences.pageHeight - myMargin.bottom, myDocument.documentPreferences.pageWidth - myMargin.right];	var myOldRuler = myDocument.viewPreferences.rulerOrigin;	myDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;	var myNewTextFrame = myDocument.pages[-1].textFrames.add();	with(myNewTextFrame) {		geometricBounds = myBounds;		previousTextFrame = myDocument.pages[-2].textFrames[0];	}	myNewTextFrame.textFramePreferences.textColumnCount = 2;	myDocument.viewPreferences.rulerOrigin = myOldRuler;	return myNewTextFrame;}myFirstTextframe = addPageWithTextbox();var myPages = myDocument.pages;var numPages = myPages.length;for (var i = 0; i<(numPages-1); i++) {	myPages[i].remove();}var file = File.openDialog ("Select content markdown" , "Markdown:*.md", false );myFirstTextframe.place(file);function addThreadedPage() {	var myNewTextFrame = addPageWithTextbox();	return myNewTextFrame;}function addressOverflow(lastFrame) {    if (lastFrame.overflows === true) {		var myNewTextFrame = addThreadedPage();		addressOverflow(myNewTextFrame);    }}addressOverflow(myFirstTextframe);