//
//  AppLoadingView.m
//  RNPlayNative
//
//  Created by Dave Sibiski on 9/2/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "AppLoadingView.h"

@implementation AppLoadingView {
  NSString *_loadingText;
}

- (instancetype)initWithLoadingText:(NSString *)loadingText {
  _loadingText = loadingText;
  return [self init];
}

- (instancetype)init {
  if (self = [super initWithFrame:[UIScreen mainScreen].bounds]) {
    [self addSubviewFromNib];
    [self setupAttributedText];
  }
  return self;
}

- (void)setupAttributedText {
  _LoadingText.text = _loadingText;
  
  CGFloat textFontSize = 17.0f;
  
  NSRange range1 = [_LoadingText.text rangeOfString:@"Loading"];
  NSRange range2 = [_LoadingText.text rangeOfString:@"..."];
  
  NSMutableAttributedString *attributedText = [[NSMutableAttributedString alloc] initWithString:_LoadingText.text];
  
  [attributedText setAttributes:@{NSFontAttributeName:[UIFont systemFontOfSize:textFontSize weight:0]}
                          range:range1];
  [attributedText setAttributes:@{NSFontAttributeName:[UIFont systemFontOfSize:textFontSize weight:0]}
                          range:range2];
  
  _LoadingText.attributedText = attributedText;
}

- (UIView *)viewFromNib {
  NSString *nibName = NSStringFromClass([self class]);
  NSArray *nibViews = [[NSBundle mainBundle] loadNibNamed:nibName owner:self options:nil];
  UIView *view = [nibViews objectAtIndex:0];
  return view;
}

- (void)addSubviewFromNib {
  UIView *view = [self viewFromNib];
  view.frame = self.bounds;
  [self addSubview:view];
}

@end
