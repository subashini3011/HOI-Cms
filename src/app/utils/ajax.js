// import { getCookie, removeCookie } from './session';
import * as User from "../shared/app-data/user";
const auth_string = "kjhchudygf78h484b9u405'HOI'874m,nfgkjdfgb-0848548";

const headers = {
  "Content-Type": "application/json",
  platform: "web",
  appVersion: "1.0.0",
  "x-frame-options": "SAMEORIGIN"
};
export async function get(url, data) {
  return new Promise(function(resolve, reject) {
    try {
      if (url === null || undefined === url || "" === url) {
        reject("URL not present.");
      } else {
        //   const token = getCookie('id_token');      //Required when authentication required
        //   if (undefined !== token) {
        //     headers.Authorization = 'Bearer ' + token;
        //   }
        const userInfo = User.getUserData();
        let userInfoId = User.getUserId();
        let userRole = User.getUserRole();
        if (!userInfoId && userRole) {
          userInfoId = 0;
          userRole = "";
        }
        const timeStampForHash = (Date.now() / 1000) | 0;
        const userDataForHash = (
          auth_string +
          timeStampForHash +
          userInfoId +
          ""
        ).replace(/\s/g, "");

        const hashedUserData = CryptoJS.SHA256(userDataForHash);
        var outString = hashedUserData.toString();
        headers.timeStamp = timeStampForHash;
        headers.authtoken = outString;
        headers.user_id = userInfoId;
        headers.role = userRole;
        const options = {
          // credentials: 'include', // Needed to set the cookies in few browsers (Safari)
          method: "GET",
          headers
          // mode: "cors"
        };
        fetch(url, options)
          .then(res => res.json())
          .then(res => {
            resolve(res);
          })
          .catch(error => reject(error));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function post(url, payload) {
  return new Promise(function(resolve, reject) {
    try {
      if (url === null || undefined === url || "" === url) {
        reject("URL not present.");
      } else {
        const userInfo = User.getUserData();
        let userInfoId = User.getUserId();
        let userRole = User.getUserRole();
        // hashing
        if (!userInfoId && !userRole) {
          userInfoId = 0;
          userRole = "";
        }
        const timeStampForHash = (Date.now() / 1000) | 0;
        const userDataForHash = (
          auth_string +
          timeStampForHash +
          userInfoId +
          JSON.stringify(payload.data)
        ).replace(/\s/g, "");

        const hashedUserData = CryptoJS.SHA256(userDataForHash);
        var outString = hashedUserData.toString();
        headers.timeStamp = timeStampForHash;
        headers.authtoken = outString;
        headers.user_id = userInfoId;
        headers.role = userRole;
        const options = {
          method: "POST",
          headers,
          // mode: "cors",
          body: JSON.stringify(payload.data)
        };
        console.log(options.body);
        fetch(url, options)
          .then(res => res.json())
          .then(res => {
            resolve(res);
          })
          .catch(error => reject(error));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function postFile(url, payload) {
  return new Promise(function(resolve, reject) {
    try {
      if (url === null || undefined === url || "" === url) {
        reject("URL not present.");
      } else {
        // const userInfo = User.getUserData();
        // if (userInfo) {
        //   const timeStampForHash = (Date.now() / 1000) | 0;
        //   const userDataForHash =
        //     auth_string +
        //     timeStampForHash +
        //     userInfo.id +
        //     JSON.stringify(payload.data);

        //   const hashedUserData = CryptoJS.SHA256(userDataForHash);
        //   var outString = hashedUserData.toString();
        //   headers.timeStamp = timeStampForHash;
        //   headers.authtoken = outString;
        //   headers.user_id = userInfo.id;
        // }
        const options = {
          method: "POST",
          body: payload.data
          // headers
        };
        fetch(url, options)
          .then(res => res.json())
          .then(res => {
            resolve(res);
          })
          .catch(error => reject(error));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function postRequestDownload(url, payload) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      var filename = "";
      var disposition = xhr.getResponseHeader("Content-Disposition");
      if (disposition && disposition.indexOf("attachment") !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1])
          filename = matches[1].replace(/['"]/g, "");
      } else {
        filename = "userdata_" + Date.now().toString() + ".csv";
      }
      var type = xhr.getResponseHeader("Content-Type");

      var blob =
        typeof File === "function"
          ? new File([this.response], filename, { type: type })
          : new Blob([this.response], { type: type });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);

        if (filename) {
          // use HTML5 a[download] attribute to specify filename
          var a = document.createElement("a");
          // safari doesn't support this yet
          if (typeof a.download === "undefined") {
            window.location = downloadUrl;
          } else {
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        } else {
          window.location = downloadUrl;
        }

        setTimeout(function() {
          URL.revokeObjectURL(downloadUrl);
        }, 100); // cleanup
      }
    }
  };
  xhr.open("POST", url, true);
  xhr.onerror = function() {
    alert("Internal Server error");
  };
  const userInfo = User.getUserData();
  if (userInfo) {
    const timeStampForHash = (Date.now() / 1000) | 0; //new Date().getTime();
    const userDataForHash =
      auth_string +
      timeStampForHash +
      userInfo.id +
      JSON.stringify(payload.data);

    const hashedUserData = CryptoJS.SHA256(userDataForHash);
    var outString = hashedUserData.toString();

    xhr.setRequestHeader("timeStamp", timeStampForHash);
    xhr.setRequestHeader("authtoken", outString);
    xhr.setRequestHeader("user_id", userInfo.id);
    xhr.setRequestHeader("platform", "web");
    xhr.setRequestHeader("appVersion", "1.0.0");
  }

  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.responseType = "arraybuffer";
  xhr.responseType = "blob";
  xhr.send(JSON.stringify(payload.data));
}
