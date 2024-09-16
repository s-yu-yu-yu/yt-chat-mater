import { getChatId, getChat } from "./live";

// const inputElm = document.getElementById("input") as HTMLInputElement;
// const buttonElm = document.getElementById("button") as HTMLButtonElement;
// const buttonElm2 = document.getElementById("button2") as HTMLButtonElement;
const materGauge = document.getElementById("mater-gauge") as HTMLDivElement;
const materValue = document.getElementById("mater-value") as HTMLDivElement;

// ゲージの最大値(この件数以上のメッセージがあるとゲージが満タンになる)
const GAUGE_MAX = 20;

const init = () => {
  // buttonElm.addEventListener("click", () => {
  //   listenLiveChat(inputElm.value);
  // });
  // クエリからvを取得
  listenLiveChat(location.href.split("?v=")[1]);
};

const listenLiveChat = async (url: string) => {
  if (!url) return;
  console.log("url", url);

  const chatId = await getChatId(url).then((chatId) => {
    console.log("chatId", chatId);
    return chatId;
  });
  if (!chatId) return;

  // チャットのpageToken
  let pageToken = "";
  // ゲージ表示の現在値(%)
  let gaugeValue = 0;

  while (true) {
    // 5秒ごとにチャットを取得
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const { items, nextPageToken } = await getChat(chatId, pageToken);
    // 初回は既存コメントを拾うためpageTokenの更新だけ行う
    if (!pageToken) {
      pageToken = nextPageToken;
      continue;
    }

    pageToken = nextPageToken;

    // カタカナを含むメッセージを表示
    const results = items.filter((item) => {
      return true;
      // return /[ア-ン]/.test(item.snippet.textMessageDetails.messageText);
    });

    // プレビュー
    results.forEach((item) =>
      console.log(item.snippet.textMessageDetails.messageText)
    );
    console.log(results.length);

    // ゲージの更新
    gaugeValue = gaugeValue + (results.length / GAUGE_MAX) * 100;
    console.log("gaugeValue", gaugeValue);

    if (gaugeValue < 20) {
      materGauge.classList.add("--color-1");
    } else if (gaugeValue < 50) {
      materGauge.classList.add("--color-2");
    } else if (gaugeValue < 80) {
      materGauge.classList.add("--color-3");
    } else {
      materGauge.classList.add("--color-4");
    }

    if (gaugeValue >= 100) return;

    materGauge.style.height = `${gaugeValue}%`;
    // materValue.textContent = `${Math.floor(gaugeValue)}`;
  }
};

init();
