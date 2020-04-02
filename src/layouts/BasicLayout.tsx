/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
import {
  AppstoreOutlined
} from '@ant-design/icons';
import logo from '../assets/logo.svg';
import { queryMenu } from "@/services/menu";

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {

  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);

  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }

    queryMenu().then(async (response) => {
      if (response.success) {
        let menu: Array<MenuDataItem> = [{
          name: '系统配置',
          path: '/system/config',
          children: [{
            path: '/system/config/template',
            icon: false,
            name: '模板配置',
          }]
        }]
        const data: Array<any> = response.result;
        data.forEach((item) => {
          let temp: MenuDataItem = { name: item.menuCategory, children: [] };
          let tempChild: MenuDataItem = {
            name: item.menuName,
            path: '/singlton',
            icon: false,
            singlton: item.singlton,
            templateCode: item.code,
            templateId: item.id
          }
          if (item.singlton === "false") {
            tempChild.path = '/instance';
          }
          temp.children?.push(tempChild);
          menu.push(temp);
        })
        setMenuData(menu);
      }
    })

  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
          {/* {titleDom ? <h1>新教育运营后台</h1> : null} */}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      subMenuItemRender={(menuItemProps, defaultDom) => {
        return <><AppstoreOutlined /><span>{defaultDom}</span></>
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return <><AppstoreOutlined />{defaultDom}</>;
        }
        if (menuItemProps.singlton !== undefined) {
          return <Link to={`${menuItemProps.path}?templateCode=${encodeURIComponent(menuItemProps.templateCode)}&templateId=${encodeURIComponent(menuItemProps.templateId)}`}>{menuItemProps.icon && <AppstoreOutlined />}{defaultDom}</Link>;
        }
        return <Link to={`${menuItemProps.path}`}>{menuItemProps.icon && <AppstoreOutlined />}{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: "首页",
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
            <span>{route.breadcrumbName}</span>
          );
      }}
      menuDataRender={() => menuData}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
