import {notification} from 'tezign-react-ui';

let actions = ['error', 'success', 'warn', 'warning', 'info'];

let notice = {
  close: notification.close,
  destroy: notification.destory
};

actions.forEach((action) => {
  notice[action] = function (message, description) {
    notification[action]({
      message: message,
      description: description
    });
  }
})

export default notice;