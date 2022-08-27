import { useState } from 'react';
import CryptoJS from 'crypto-js';

// upload a file to cloudinary using React Hooks
// see below for what hooks are
// https://reactjs.org/docs/hooks-intro.html

// make sure you fill these out:
const API_KEY = '224744376782588';
const SECRET = 'fEhIJwmF3MSbVnuIIYEKuevlPtc';
const CLOUD_NAME = 'mainiac';

export function useUploadToCloudinary(uri) {
  const [isUploading, setIsUplading] = useState(true);
  const [hasErrored, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState('');
  start(uri);
  const start = (
    uri = { uri },
    contentType = 'image',
    callback = (arg = object) => { },
  ) => {
    try {
      if (!uri) {
        throw new Error('missing URI to upload...😔');
      } else if (!contentType) {
        throw new Error('missing contentType to upload...📸📹');
      }
      const timestamp = ((Date.now() / 1000) | 0).toString();
      const apiKey = API_KEY;
      const apiSecret = SECRET;
      const cloud = CLOUD_NAME;
      const hashString = `timestamp=${timestamp}${apiSecret}`;
      const signature = CryptoJS.SHA1(hashString).toString();
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud}/${contentType}/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl);
      xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        if (callback) callback(res);
        setResponse(res);
        setUploadedUrl(res.secure_url);
      };
      xhr.onerror = e => {
        setIsUploading(false);
        setError(true);
        console.log(e, '🚨 story upload failed, never properly sent to cloudinary');
      };
      xhr.ontimeout = e => {
        setIsUploading(false);
        setError(true);
        console.warn(e, '⏰ cloudinary upload timed out');
      };

      let array = uri.split('.');
      let fileEnding = array[array.length - 1].toLowerCase();
      fileEnding = fileEnding || 'jpg';

      const formData = new FormData();

      formData.append('file', {
        uri: uri,
        type: `${contentType}/${fileEnding}`,
        name: `upload.${fileEnding}`,
      });
      formData.append('timestamp', timestamp);
      formData.append('api_key', apiKey);
      formData.append('signature', signature);
      xhr.send(formData);
      if (xhr.upload) {
        xhr.upload.onprogress = ({ total, loaded }) => {
          setProgress(loaded / total);
        };
      }
    } catch (e) {
      console.error('upload to cloudinary hook error', e);
    }
  };
  console.log("inside Cloudinary", { start, uploadedUrl, response, isUploading, hasErrored, progress });
  return { start, uploadedUrl, response, isUploading, hasErrored, progress };
}