document.addEventListener("DOMContentLoaded", function () {
  function displayUserProfile(profile) {
    // 創建元素來展示用戶名稱和頭像
    const userNameElement = document.createElement("p");
    const userImageElement = document.createElement("img");

    userNameElement.textContent = `Hello, ${profile.displayName}!`;
    userImageElement.src = profile.pictureUrl;
    userImageElement.alt = profile.displayName;

    // 將創建的元素添加到頁面的指定部分
    const profileContainer = document.getElementById("profile-container");
    profileContainer.appendChild(userNameElement);
    profileContainer.appendChild(userImageElement);
  }

  function initializeLiff(liffId) {
    liff
      .init({ liffId: liffId })
      .then(() => {
        if (!liff.isLoggedIn()) {
          // 如果用戶未登錄，讓用戶登錄
          liff.login();
        } else {
          // 用戶已登錄，獲取用戶信息
          liff
            .getProfile()
            .then(displayUserProfile)
            .catch((err) => {
              console.error("獲取用戶訊息失敗", err);
            });
        }
      })
      .catch((err) => {
        console.error("LIFF初始化失敗", err);
      });
  }

  // 呼叫initializeLiff函數並傳入您的LIFF ID
  initializeLiff("2004081412-31AxDOb0");
});

// 漸強實驗室串接測試

function sendToCrescendo(dataToSend) {
  const crescendoAPIKey =
    "$ dredd init -r apiary -j apiaryApiKey:e7be0eeff9489ea8ebe039db88a57561 -j apiaryApiName:lifftest"; // 漸強API金鑰
  const crescendoAPIUrl = "https://liff.line.me/2004081412-31AxDOb0"; // LIFF的URL

  fetch(crescendoAPIUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${crescendoAPIKey}`,
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log("漸強API已成功接收訊息", data);
    })
    .catch((error) => {
      console.error("漸強API調用失敗:", error);
    });
}

const messageData = {
  userId: profile.userId, // 使用從LIFF獲取的實際LINE用戶ID
  messages: [
    {
      type: "text",
      text: "這是從LIFF應用程式發送的測試訊息",
    },
  ],
};
sendToCrescendo(messageData); // 發送訊息給漸強
