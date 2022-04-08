import notifier from "node-notifier";

export default function (title, msg) {
  notifier.notify({
    title: title,
    message: msg,
  });
}
