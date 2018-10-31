import React, { Component } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { tSwitch } from './enum';
import { Transitioner } from '../transitioner';
import { NavigationBar } from '../navigationbar';

export type NavigationBarProps = Array<{
  /**当前页面模式,none：没有，normal：默认方式（正常），transparent：透明 */
  headerMode: 'none' | 'normal' | 'transparent',
  /**当前页面标题，也就是中间显示的 */
  headerTitle: ?string | React.ReactElement,
  /**当前页面标题(Text的样式)样式，本来不想加想改变可以用headerTitle是一个组件来代替，但是想如果能设置一个默认值改变所有的还是有用的 */
  headerTitleStyle: ?TextStyle,
  /**当前页面左侧 */
  headerLeft: ?React.ReactElement,
  /**当前页面右侧 */
  headerRight: ?React.ReactElement,
  /**是否显示back,默认显示 */
  isHeaderBack: boolean,
  /**头部左侧（容器）样式 */
  headerLeftStyle: ?ViewStyle,
  /**头部又侧（容器）样式 */
  headerRightStyle: ?ViewStyle,
  /**返回图片可以是图片require('./assets/back-icon.png')也可以是组件 */
  headerBackImage: ?string | React.ReactElement,
  headerBackTitle: ?string | React.ReactElement,
  headerBackTitleStyle: ?TextStyle,
  /**背景色 */
  headerBackground: ?string

  // /**下一页页面模式,none：没有，normal：默认方式（正常），transparent：透明 */
  // headerModeNext: 'none' | 'normal' | 'transparent',
  // /**下一步页面标题，也就是中间显示的 */
  // headerTitleNext: string | React.ReactElement,
  // headerTitleStyleNext: ?TextStyle,
  // /**下一步页面左侧 */
  // headerLeftNext: string | React.ReactElement,
  // /**下一步页面右侧 */
  // headerRightNext: string | React.ReactElement,
  // /**是否显示back,默认显示 */
  // isHeaderBackNext: boolean,
  // headerBackImageNext: ?string | React.ReactElement,
  // headerBackTitleNext: ?string | React.ReactElement,
  // headerBackTitleStyleNext: ?TextStyle,
  // /**背景色 */
  // headerBackgroundNext: ?string
}>;
export type tPage = { screen: React.Component };
export type tPages = { [string]: tPage };
