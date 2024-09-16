const inputElm = document.getElementById("input") as HTMLInputElement;
const buttonElm = document.getElementById("button") as HTMLButtonElement;
const buttonElm2 = document.getElementById("button2") as HTMLButtonElement;

const init = () => {
  buttonElm.addEventListener("click", () => {
    listenLiveChat(inputElm.value);
  });
};

const listenLiveChat = (id: string) => {
  if (!id) return;
  console.log("channelId", id);
};

init();
