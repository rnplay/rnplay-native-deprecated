## React Native Playground Runner

iOS app for running React Native apps from the [React Native Playground](http://rnplay.org).

Use your Phone camera to read a QR code from the site and run the associated the app code.

It will only work on a device at the moment, as simulators don't have cameras.

### Try it out live

Here are some direct links to apps that are hosted on the web and run
through [Appetize.io](http://www.appetize.io) in the browser via RNPlay.

- [Oracle (a soup generator, yum)](https://appetize.io/embed/dhw0pbp14v89w60quwrj6w70dg?device=iphone6&scale=100&autoplay=false&orientation=portrait&deviceColor=black&params=%7B%22appId%22:%22yQ2fnQ%22,%22moduleName%22:%22Oracle%22%7D)
- [Parallax example](https://appetize.io/embed/dhw0pbp14v89w60quwrj6w70dg?device=iphone5s&scale=100&autoplay=false&orientation=portrait&deviceColor=black&params=%7B%22appId%22:%22qAFzcA%22,%22moduleName%22:%22ParallaxExample%22%7D)

### Setup

Clone the repo.

Run 'npm install' in the project directory.

Open the RNPlayNative.xcodeproj file in XCode.

Set the XCode build target to a plugged-in device.

Build the project for use on your phone.

### Usage

Point the camera at a [play listed here](http://rnplay.org/plays) or [create one](http://rnplay.org/plays/new). The app should load on your phone.

You can start over by shaking the phone and hitting Reload, or quitting and starting the app again.


#### This release is alpha/experimental. Suggestions welcome!
 
