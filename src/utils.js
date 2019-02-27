'use strict';

const {
  TRACE_HOST_DOMAIN,
  HEADERS,
  STATIC_TMP_FILE
} = require('./constants');

const axios = require('axios');
const fs = require('fs');
const path = require('path');

function saveFile(path, raw) {
  fs.writeFileSync(path, raw)
}

function downloadFileURL(fileUrl, returnAs = 'path', saveAs = '') {
  let _saveAs;
  if (!returnAs in ['path', 'bool', 'bin']) {
    return Promise.reject(new Error('Invaliid returnAs value'));
  }
  if (saveAs === '') {
    _saveAs = genTempFile();
  }
  const options = {
    method: 'GET',
    headers: { 'User-Agent': HEADERS['User-Agent'] },
    responseType: 'arraybuffer'
  };
  return axios(fileUrl, options)
    .then(res => {
      saveFile(_saveAs, res.data);
      if (returnAs === 'path') {
        return _saveAs;
      } else if (returnAs === 'bool') {
        return true;
      } else if (returnAs === 'bin') {
        return res.data
      }
    })
    .catch(err => {
      if (err.response) {
        throw err.response.data;
      } else {
        throw err.message;
      }
    });
}

function genTempFile(returnAs = 'path') {
  try {
    if (!returnAs in ['file', 'path']) {
      throw new Error('Invalid returnAs value')
    }
    const fName = `whatanimejs-${new Date().getTime()}-${Math.floor(Math.random() * 9)}.bin`;
    if (!fs.existsSync(STATIC_TMP_FILE)) {
      fs.mkdirSync(STATIC_TMP_FILE, { recursive: true });
    }
    if (returnAs === 'file') {
      return fName;
    }
    else if (returnAs === 'path') {
      return path.join(STATIC_TMP_FILE, fName);
    }
  } catch (err) {
    return err;
  }
}

function SearchResult(
  CacheHit = null,
  RawDocsCount = null,
  RawDocsSearchTime = null,
  ReRankSearchTime = null,
  docs = null,
  limit = null,
  limit_ttl = null,
  quota = null,
  quota_ttl = null
) {
  this.CacheHit = CacheHit;
  this.RawDocsCount = RawDocsCount;
  this.RawDocsSearchTime = RawDocsSearchTime;
  this.ReRankSearchTime = ReRankSearchTime;
  this.docs = docs;
  this.limit = limit;
  this.limit_ttl = limit_ttl;
  this.quota = quota;
  this.quota_ttl = quota_ttl;
}

function getSearchResultFromBinding(json) {
  const {
    CacheHit, RawDocsCount, RawDocsSearchTime,
    ReRankSearchTime, docs, limit,
    limit_ttl, quota, quota_ttl
  } = json;

  if (docs.length > 0) {
    for (let doc of docs) {
      let newKey = {
        'imagepreview': `${TRACE_HOST_DOMAIN}/thumbnail.php?anilist_id=${doc.anilist_id}&file=${doc.file}&t=${doc.t}&token=${doc.tokenthumb}`,
        'videopreview': `${TRACE_HOST_DOMAIN}/${doc.anilist_id}/${doc.file}?start=${doc.start}&end=${doc.end}&token=${doc.token}`
      };
      Object.assign(doc, newKey);
    }
  }
  return new SearchResult(CacheHit, RawDocsCount, RawDocsSearchTime,
    ReRankSearchTime, docs, limit,
    limit_ttl, quota, quota_ttl);
}

module.exports = {
  getSearchResultFromBinding,
  downloadFileURL
};
