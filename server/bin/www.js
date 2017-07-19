/**
 * Created by mytream on 17/7/19.
 */

// WEB 应用
require('../app');

// 全局（进程）错误处理
process.on('uncaughtException', (err) => {
  console.error('系统进程异常', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('未捕获的Promise异常', reason);
});
