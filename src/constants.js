'use strict';

module.exports = {
  TRACE_HOST_DOMAIN: 'https://trace.moe',
  TRACE_SEARCH_QUERY_PATH: '/search',
  TRACE_INFO_QUERY_PATH: '/info',

  FORMAT_SUPPORTED: ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'wbmp'],

  HEADERS: {
    'Host': 'trace.moe',
    'Origin': 'https://trace.moe',
    'Referer': 'https://trace.moe/',
    'User-Agent': 'Opera/8.01 (J2ME/MIDP; Opera Mini/3.1.10423/1724; en; U; ssr)',
    'X-Requested-With': 'XMLHttpRequest'
  },

  STATIC_TMP_FILE: 'static/tmp/',

  REGEX_VALIDATION_URL: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
};