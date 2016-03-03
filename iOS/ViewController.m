//
//  ViewController.m
//  RNPlayNative
//
//  Created by Robert Payne on 6/05/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "ViewController.h"
#import "RCTRootView.h"
#import "AppLoadingView.h"

@implementation ViewController

- (void)reloadWithJSBundleURL:(NSURL *)JSBundleURL moduleNamed:(NSString *)moduleName appName:(NSString *)appName {
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:JSBundleURL
                                                      moduleName:moduleName
                                                      initialProperties: NULL
                                                      launchOptions:nil];

  if (appName == nil) {
    appName = @"app";
  }

  NSString *loadingText = [NSString stringWithFormat:@"Loading %@...", appName];
  AppLoadingView *appLoadingView = [[AppLoadingView alloc] initWithLoadingText:loadingText];

  rootView.loadingView = appLoadingView;
  rootView.loadingViewFadeDelay = 0.0;
  rootView.loadingViewFadeDuration = 0.15;
  rootView.frame = self.view.bounds;

  [self setView:rootView];

}

@end
