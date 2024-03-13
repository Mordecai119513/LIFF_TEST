liff
  .init({ liffId: "你的LIFF ID" })
  .then(() => {
    // LIFF初始化後，你可以在此處調用LIFF API
    if (!liff.isLoggedIn()) {
      // 如果用戶未登錄，讓用户登錄
      liff.login();
    } else {
      // 用戶已登錄，例如，你可以獲取用戶信息
      liff.getProfile().then((profile) => {
        console.log(profile.displayName);
      });
    }
  })
  .catch((err) => {
    console.error("LIFF初始化失败", err);
  });
