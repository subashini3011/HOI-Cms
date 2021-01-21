const keyUserInfo = 'userInfo';
let userData = {};
const Key = CryptoJS.enc.Base64.parse('#base64Key#');
const iv = CryptoJS.enc.Base64.parse('#base64IV#');

function hasItem(key) {
  let isDataAvailable = sessionStorage.getItem(key);

  if (isDataAvailable) return true;
  else return false;
}

function removeItem(key) {
  return sessionStorage.removeItem(key);
}

function getItem(key) {
  // let userData = [];

  let decrypted = [];
  userData = sessionStorage.getItem(key);
  decrypted = CryptoJS.AES.decrypt(userData, Key, { iv });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

function setItem(key, data) {
  sessionStorage.setItem(key, data);
}

export function setUserData(data) {
  if (!data) return;
  if (hasItem(keyUserInfo)) {
    removeItem(keyUserInfo);
  }
  userData = data;

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(userData), Key, {
    iv
  });

  setItem(keyUserInfo, encrypted);
}

export function getUserData() {
  if (hasItem(keyUserInfo)) {
    userData = getItem(keyUserInfo);
    return userData;
  } else {
    userData = null;
    return userData;
  }
}

// export function isLoggedIn() {
//   if (userData.loginId) return true;

//   return false;
// }

export function getUserId() {
  if (userData && userData.id) {
    return userData.id;
  }
}

// export function getLoginId() {
//   return userData.loginId;
// }

export function getUserRole() {
  if (userData && userData.role) {
    return userData.role;
  }
}

export function getUserEmail() {
  if (userData && userData.email) {
    return userData.email;
  }
}

export function getUserName() {
  if (userData && userData.user_name) {
    return userData.user_name;
  }
}

// export function getCreateStatus() {
//   return userData.createStatus;
// }

// export function getTempPass() {
//   return userData.temppass;
// }

// export function getToken() {
//   return userData.jwtToken;
// }

// export function getFullName() {
//   return userData.profile_name ? userData.profile_name.toLowerCase() : "";
// }

// export function getFirstName() {
//   return userData.firstName ? userData.firstName.toLowerCase() : "";
// }

// export function getLoginTS() {
//   return userData.lastLoginTS;
// }

// export function getLoginDateTime() {
//   return userData.lastLoginDateTime;
// }

// export function getUserAccess() {
//   return userData.userAccess;
// }

// export function getPhoneUpdate() {
//   return userData.phoneUpdate;
// }

// export function getNotificationCount() {
//   return userData.notification_count;
// }

// By default set the session storage value
getUserData();
