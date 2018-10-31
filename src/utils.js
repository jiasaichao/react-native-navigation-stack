import { SimpleNavigation } from './';
import { config } from './config';
import { NavigationBar } from './navigationbar';
import { NavigationBarProps } from './type/nav';
/*global JSX */
type tUtils = {
  simpleNavigation: ?SimpleNavigation,
  navigationBar: ?NavigationBar,
  /**
   * 所有的tab都保存到这里，可以通过name查找
   * [{name:'aaaaa',screen:{}}]
   */
  navigationTab: ?[],
  dxToValue: ({ targetWidth: number, dx: number }) => number,
  /**
   * 根据id获取navigationOptions，已经包含了默认值
   */
  getNavigationOptionsById: (id: number) => NavigationBarProps,
  /**
   * 根据id获取对应展示组件的this
   */
  getNavigationThisById: (id: number) => JSX.Element,
  /**
   * 根据id和params获取navigationOptions
   * 这个是修改已经存在页眉用的，所以参数采用覆盖方式，不需要穿所有参数，在原来的参数上覆盖
   */
  getNavigationOptionsByIdParams: (id: number, params: any, setParams: () => void) => NavigationBarProps,
  /**
   * 是否为根页面
   */
  isRoot: (id: number) => boolean,
  /**
   * 区别于byId,这个是初始化的时候用的，还没有navigationOptions
   * 根据id和navigationOptions获取navigationOptions，已经包含了默认值
   */
  getNavigationOptions: (id: number, navigationOptions: NavigationBarProps, params: any, setParams: () => void) => NavigationBarProps,
  /**
   * 设置页眉参数,
   * 重新渲染
   */
  setNavigationOptionsParams: (id: number, params: any, callBack: () => void) => void
};
export let utils: tUtils = {
  simpleNavigation: null,
  navigationBar: null,
  navigationTab: null,
  /**
   * dx根据对应目标值转换为对应值
   */
  dxToValue: (targetWidth, dx) => {
    return (dx / config.screenWidth) * targetWidth;
  },
  /**
   * 根据id获取navigationOptions，已经包含了默认值
   */
  getNavigationOptionsById(id) {
    let currentNavigation = utils.simpleNavigation.stackRouter.find(item => item.id == id);
    let currentNavigationOptions = currentNavigation.headerOptions;
    let navigationOptions = config.navigationBarExtend(
      typeof currentNavigationOptions == 'function'
        ? currentNavigationOptions({ id, params: currentNavigation.params, setParams: currentNavigation.setParams })
        : currentNavigationOptions
    );
    return navigationOptions;
  },
  /**
   * 区别于byId,这个是初始化的时候用的，还没有navigationOptions
   * 根据id和navigationOptions获取navigationOptions，已经包含了默认值
   */
  getNavigationOptions(id, navigationOptions, params, setParams) {
    console.log('getNavigationOptions:' + id);
    return config.navigationBarExtend(typeof navigationOptions == 'function' ? navigationOptions({ id, params, setParams }) : navigationOptions);
  },
  /**
   * 根据id和params获取navigationOptions
   * 这个是修改已经存在页眉用的，所以参数采用覆盖方式，不需要穿所有参数，在原来的参数上覆盖
   */
  getNavigationOptionsByIdParams(id, params) {
    let currentNavigation = utils.simpleNavigation.stackRouter.find(item => item.id == id);
    let currentNavigationOptions = currentNavigation.screen.navigationOptions;
    let navigationOptions = config.navigationBarExtend(
      typeof currentNavigationOptions == 'function'
        ? currentNavigationOptions({ id, params: { ...currentNavigation.params, ...params }, setParams: currentNavigation.setParams })
        : currentNavigationOptions
    );
    return navigationOptions;
  },

  /**
   * 根据id获取对应展示组件的this
   */
  getNavigationThisById(id) {
    return utils.simpleNavigation.stackRouter.find(item => item.id == id)._this;
  },
  isRoot(id) {
    if (utils.simpleNavigation.stackRouter.findIndex(item => item.id == id) == 0) {
      return true;
    }
    return false;
  },
  /**
   * 设置页眉参数
   */
  setNavigationOptionsParams(id, params, callBack) {
    let currentNavigation = utils.simpleNavigation.stackRouter.find(item => item.id == id);
    currentNavigation.headerOptions = utils.getNavigationOptionsByIdParams(id, params);
    currentNavigation.header.update(callBack);
  }
};
