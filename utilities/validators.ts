export const emailValidator = (email: string) => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const passwordValidator = (password: string, passwordCheck: string) => {
  if (!password.trim()) {
    return false;
  }

  const num = password.search(/[0-9]/g);
  const eng = password.search(/[a-z]/ig);
  const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (password.length < 8 || password.length > 20) {
    toggleAlertModal('비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.');
    return false;
  } if (password.search(/\s/) !== -1) {
    toggleAlertModal('비밀번호는 공백 없이 입력해주세요.');
    return false;
  } if (num < 0 || eng < 0 || spe < 0) {
    toggleAlertModal('비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.');
    return false;
  }

  if (password !== passwordCheck) {
    toggleAlertModal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return false;
  }
};
