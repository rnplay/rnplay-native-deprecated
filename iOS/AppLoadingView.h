//
//  AppLoadingView.h
//  RNPlayNative
//
//  Created by Dave Sibiski on 9/2/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AppLoadingView : UIView

@property (weak, nonatomic) IBOutlet UILabel *LoadingText;

- (instancetype)initWithLoadingText:(NSString *)loadingText;

@end
