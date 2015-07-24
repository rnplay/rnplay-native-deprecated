#import "SnapshotHelper.js"

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();


captureLocalizedScreenshot("About")
target.frontMostApp().tabBar().buttons()["Explore"].tap();
captureLocalizedScreenshot("Explore")
target.frontMostApp().tabBar().buttons()["My Apps"].tap();
captureLocalizedScreenshot("MyApps")
target.frontMostApp().tabBar().buttons()["Direct URL"].tap();
captureLocalizedScreenshot("DirectURL")
target.frontMostApp().tabBar().buttons()["Scan Code"].tap();
captureLocalizedScreenshot("ScanCode")

