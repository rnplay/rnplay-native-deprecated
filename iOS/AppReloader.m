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
 *  AppReloader.reloadAppWithURLString('https://example.com/index.ios.bundle', 'App', 'Sample App')
 */
RCT_EXPORT_METHOD(reloadAppWithURLString:(NSString *)URLString moduleNamed:(NSString *)moduleName appName:(NSString *)appName)
{
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  NSURL *JSBundleURL = [NSURL URLWithString:[NSString stringWithFormat:@"%@?platform=ios&dev=true", URLString]];
  
  @try {
    ViewController *appViewController = [[ViewController alloc] init];
    [appViewController reloadWithJSBundleURL:JSBundleURL moduleNamed:moduleName appName:appName];
    
    delegate.appViewController = appViewController;
    delegate.shouldRotate = YES;
    
    [UIView transitionWithView:delegate.window
                      duration:kFlipTransitionDuration
                       options:kFlipTransitionType
                    animations:^{
                      delegate.window.rootViewController = appViewController;
                    }
                    completion:NULL];
  }
  @catch (NSException *exception) {
    
    NSLog(@"exception: %@", exception);
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error!"
                                                    message:@"Sorry, this app doesn't work! Looks like someone needs to brush up on their JavaScript! :p"
                                                   delegate:nil
                                          cancelButtonTitle:nil
                                          otherButtonTitles:@"OK", nil];
    
    [alert show];
  }
}

@end
