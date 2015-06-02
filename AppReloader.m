//
//  AppReloader.m
//  RNPlayNative
//
//  Created by Dave Sibiski on 6/2/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "AppReloader.h"
#import "AppDelegate.h"
#import "ViewController.h"

@implementation AppReloader

RCT_EXPORT_MODULE()

-(dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

/**
 *  var AppReloader = require('NativeModules').AppReloader;
 *  AppReloader.reloadAppWithURLString('https://example.com/index.ios.bundle', 'App')
 */
RCT_EXPORT_METHOD(reloadAppWithURLString:(NSString *)URLString moduleNamed:(NSString *)moduleName)
{
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  NSURL *JSBundleURL = [NSURL URLWithString:URLString];
  
  ViewController *appViewController = [[ViewController alloc] init];
  [appViewController reloadWithJSBundleURL:JSBundleURL moduleNamed:moduleName];
  
  UIView *baseView = delegate.window.rootViewController.view;
  
  [UIView transitionWithView:baseView
                    duration:kFlipTransitionDuration
                     options:kFlipTransitionType
                  animations:^{
                    [baseView addSubview:appViewController.view];
                  }
                  completion:NULL];
}

@end
