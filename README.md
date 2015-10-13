## React Native Playground Runner

Native app for iOS (and soon, Android), for running React Native apps from the [React Native
Playground](http://rnplay.org). This is also the app that powers the
in-browser simulators on the site.

![](https://raw.githubusercontent.com/rnplay/rnplay-ios/master/screenshot.png)

### Try it out live

[Download the latest release](https://itunes.apple.com/us/app/react-native-playground/id1002032944) from the iTunes Store.

Here are some direct links to apps that are hosted on the web and run
through [Appetize.io](http://www.appetize.io) in the browser via RNPlay.

- [Oracle (a soup generator,
  yum)](https://appetize.io/embed/dhw0pbp14v89w60quwrj6w70dg?device=iphone6&scale=100&autoplay=false&orientation=portrait&deviceColor=black&params=%7B%22appId%22:%22yQ2fnQ%22,%22moduleName%22:%22Oracle%22%7D)
- [Parallax
  example](https://appetize.io/embed/dhw0pbp14v89w60quwrj6w70dg?device=iphone5s&scale=100&autoplay=false&orientation=portrait&deviceColor=black&params=%7B%22appId%22:%22qAFzcA%22,%22moduleName%22:%22ParallaxExample%22%7D)

### Setup

- Clone the repo.
- Run `npm install` in the project directory.

#### iOS
- Open the `RNPlayNative.xcodeproj` file in XCode.
- Set the XCode build target to a plugged-in device.
- Build the project for use on your phone.

#### Android
- Follow the instructions to [install the Android SDK & emulators](http://facebook.github.io/react-native/docs/android-setup.html).
- Open up your emulator/device. (`android avd`)
- Run `react-native run-android` in the root of the project to build the project, install on the emulator/device & start the packager.
- If using a device, follows [these instructions](http://facebook.github.io/react-native/docs/running-on-device-android.html).

### Usage

Just run the app and explore. To exit a running app, tap four times in the same spot.
