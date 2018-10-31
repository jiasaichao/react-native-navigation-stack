import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { tPages, NavigationBarProps } from './type/nav';
import { utils } from './utils';
import { ScreenContainer } from './screencontainer';
import { config } from './config';
import { NavigationItem } from './navigationitem';
let pwidth = Dimensions.get('screen').width;
config.screenWidth = pwidth;
export class SimpleNavigation {
  constructor(pages: tPages, options = {}) {
    //修改默认配置
    config.navigationBarOptions = config.navigationBarExtend(options.navigationOptions);
    this.pages = pages;
    let InitialRoute = this.pages[options.initialRouteName];
    let startItem = new NavigationItem({
      screen: InitialRoute.screen,
      state: 1,
      toggleMode: 'current',
      id: 1,
      routerName: options.initialRouteName,
      params: options.initialRouteParams
    });
    startItem.headerOptions = utils.getNavigationOptions(
      1,
      InitialRoute.screen.navigationOptions,
      options.initialRouteParams,
      startItem.setParams
    ); //初始的页眉
    this.stackRouter.push(startItem);
    this.maxId = 1;
    utils.simpleNavigation = this;

    // let navigationBar = [config.navigationBarExtend(this.getCurrentScreen().screen.navigationOptions), {}];
    // this.getPrevScreen();
    // utils.simpleNavigation.navigationBar = navigationBar;
    return () => (
      <ScreenContainer
        ref={r => {
          if (r) {
            this.screenView = r;
          }
        }}
        pages={this.pages}
        stackRouter={this.stackRouter}
      />
    );
  }
  screenView: React.ReactElement;
  /**所有配置的页面 */
  pages: tPages = {};
  /**堆栈路由，所有已经打开的页面都会保存到这里 */
  stackRouter: Array<NavigationItem> = [];
  /**头部页眉数据 */
  navigationBar: NavigationBarProps;
  /**获取当前显示屏幕信息 */
  getCurrentScreen = () => {
    return this.stackRouter.find(item => item.state === 1);
  };
  getPrevScreen = () => {
    let list = this.stackRouter.filter(item => item.state === 2);
    return list[list.length - 1];
  };
  /**最大id号 */
  maxId = 0;
  /**是否动画过度中 */
  isTransitionRunning = false;
  /**是否在触摸中 */
  isResponding = false;
  /**跳转到新页面 */
  push = (routerName, params) => {
    if (this.isTransitionRunning) {
      return;
    }
    //不存在这个页面
    if (!(routerName in this.pages)) {
      console.warn(`push的页面“${routerName}”不存在`);
      return;
    }
    this.stackRouter.forEach(item => {
      item.switch = 'none';
      //原来的当前页面
      if (item.state === 1) {
        item.state = 2;
        item.switch = 'backHide';
      }
    });
    let screen = this.pages[routerName].screen;
    let router: NavigationItem = new NavigationItem({
      screen,
      routerName: routerName,
      state: 1,
      toggleMode: 'pushCurrent',
      id: this.maxId + 1
    });
    router.headerOptions = utils.getNavigationOptions(this.maxId + 1, screen.navigationOptions, params, router.setParams); //初始的页眉
    if (params !== undefined) {
      router.params = params;
    }
    this.stackRouter.push(router);
    this.maxId = router.id;
    // console.log(this.screenView1);
    this.screenView.refresh();
    // utils.navigationBar.next();
  };
  /**返回上一个页面 */
  back = () => {
    if (this.isTransitionRunning || this.stackRouter.findIndex(item => item.state === 2) == -1) {
      return;
    }
    this.stackRouter.forEach((item, index) => {
      item.switch = 'none';
      if (item.state == 1) {
        item.switch = 'pushHide';
        item.state = 2;
      }
      if (this.stackRouter.length - 2 == index) {
        item.switch = 'backCurrent';
        item.state = 1;
      }
    });

    this.screenView.refresh(() => {
      this.stackRouter.pop(); //完成后删除最后一个
    });

    // utils.navigationBar.back();
  };
  /**
   * 置返回隐藏属性，主要是为了滑动松手的时候如果是恢复原位需要隐藏的那个页面也要有动画。
   * 这个问题原因是如果新打开一个页面push当前页面这是为backHide，这个时候返回恢复是好的，但是如果返回两级就有问题，原来的backHide已经变为了none
   */
  setBackHide = () => {
    this.stackRouter.forEach((item, index) => {
      if (this.stackRouter.length - 2 == index) {
        item.switch = 'backHide';
      }
    });
  };
  /**
   * 复原
   */
  restore = () => {
    this.setBackHide();
    this.screenView.refresh();
  };
  /**替换当前页并加载新页面 */
  replace = () => {};
  /**跳转到最顶层页面 */
  backToTop = () => {};
  setTransitionRunning = value => {
    this.isTransitionRunning = value;
  };
}
export const Action = {
  push: (name, params) => {
    utils.simpleNavigation.push(name, params);
  },
  back: () => {
    utils.simpleNavigation.back();
  }
};
