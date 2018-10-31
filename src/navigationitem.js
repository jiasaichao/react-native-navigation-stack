import React, { Component } from 'react';
// import { Dimensions } from 'react-native';
import { tPages, NavigationBarProps } from './type/nav';
import { Transitioner } from './transitioner';
import { tSwitch } from './type/enum';
import { NavigationBar } from './navigationbar';
import { utils } from './utils';
export class NavigationItem {
  /**id第一个为1 */
  id: number;
  /**屏幕组件，也就是要展示的组件 */
  screen: React.ReactElement & { navigationOptions: NavigationBarProps };
  element: Transitioner;
  /**传递的参数 */
  params: null;
  /**
   * 状态1当前显示，2已经显示过（打开过的，返回一级一级返回这些页面），3缓存
   */
  state: 1 | 2 | 3 | 4;
  /** */
  routerName: string;
  /**
   * none:不做任何变动（不需要执行动画，一般动画执行完成所有的都会变成none，以便下次不会执行动画）
   * current:瞬间到当前，pushCurrent:进入方式到当前<--，backCurrent:退出方式到当前-->，
   * pushHide:-->,backHide<--:
   *
   */
  switch: tSwitch;
  header: NavigationBar;
  /**
   * 页眉，就是screen里面的navigationOptions的属性，初始化是navigationOptions
   * 为了可能会修改所以保存一份
   */
  headerOptions: NavigationBarProps;
  /*global JSX*/
  /**当前屏幕组件的ref，可以调用里面的方法 */
  _this: JSX.Element;
  constructor({ id, screen, params, state, toggleMode, routerName, headerOptions }) {
    this.id = id;
    this.screen = screen;
    this.params = params;
    this.state = state;
    this.switch = toggleMode;
    this.routerName = routerName;
    this.headerOptions = headerOptions;
  }
  /**是否为根页面 */
  isRoot() {
    utils.isRoot(this.id);
  }
  //名称为params报错。。
  setParams = aaaa => {
    utils.setNavigationOptionsParams(this.id, aaaa);
  };
}
