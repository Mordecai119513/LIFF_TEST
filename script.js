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
            .then((profile) => {
              // 顯示用戶資料
              displayUserProfile(profile);
              // 準備發送給漸強的資料
              const messageData = {
                userId: profile.userId,
                messages: [
                  {
                    type: "text",
                    text: "這是從LIFF應用程式發送的測試訊息",
                  },
                ],
              };
              sendToCrescendo(messageData); // 發送訊息給漸強
            })
            .catch((err) => {
              console.error("獲取用戶訊息失敗", err);
            });
        }
      })
      .catch((err) => {
        console.error("LIFF初始化失敗", err);
      });
  }

  initializeLiff("2004081412-31AxDOb0");
});

function sendToCrescendo(dataToSend) {
  const crescendoAPIKey = "e7be0eeff9489ea8ebe039db88a57561";
  const crescendoAPIUrl =
    "https://private-8803f5-cresclab.apiary-mock.com/openapi/v1/binding/bindlink/";

  fetch(crescendoAPIUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${e7be0eeff9489ea8ebe039db88a57561}`,
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
