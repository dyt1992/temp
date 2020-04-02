/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { setCookie } from "./utils";

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

setCookie('lippi-industry-bop_SSO_TOKEN_V2', '121A003FA6875717CC05354A83377E63273E6714AE6CB98FA9DBA63699F05AAC55F4F40A57F2B8E36F44BDE1773EF121CFE58D0F0CEA41167F53199E2CA4EFCA')
setCookie('lippi-industry-bop_USER_COOKIE', '17AF929BA729EB747DCA6269A64B3587071CBE123A585EFB88FE4D5C038A1E2B6A3EBBF6AF7D545669FD8E5A1262D047961166890B9E53A3EF4DBBBC3E3A7D771DEB36955CA6C7E177FC6E5694D832A56D0E698317F9BE59536B0B2118AC797C54DB2E8A2BF5B36F93AB2D2BEB419B84FBED20C2E93AF5345FEDA102CE77664D841E324541AF3E9ABA5AE9ECF531B340C9A3E29C8EEFB6AA6EBBFF8AE9D60EE06120356C637F0631FB9F9BCF2B1F17A876D29CC16BB99D55955DD8C51312D8C1')

export default request;
