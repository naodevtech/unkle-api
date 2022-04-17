import notifier from 'node-notifier';

export default function responseNotification(response, code, data, message) {
  notifier.notify({
    code: code,
    message: message
  });
  return response.status(code).json({
    code,
    data,
    message
  });
}
