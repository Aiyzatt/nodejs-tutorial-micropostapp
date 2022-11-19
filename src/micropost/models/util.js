
function getTimestomp(date = null) {
  const d = (date) ? date : new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day  = d.getDate();
  const hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  const min = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  const sec = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();

  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}

module.exports = {
  getTimestomp,
};