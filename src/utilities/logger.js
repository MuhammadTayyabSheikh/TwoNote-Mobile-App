// import Bugsnag from "@bugsnag/expo";

const log = (error) => Bugsnag.notify(error);

const start = () => Bugsnag.start('3c72f3deb2b7f52f5cbf73ef41c1f467');

export default {
  log, start
}