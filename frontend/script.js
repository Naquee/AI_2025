const input = document.querySelector("#input");
const chatContainer = document.querySelector("#chat-container");
const askBtn = document.querySelector("#ask");
// console.log(input)

const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2,8)

const loading = document.createElement('div');
loading.className="my-6 animate-pulse";
loading.textContent="Thinking..."

async function generate(text) {
  // 1, Append message to ui
  // 2 send it to LLM
  // 3 append respond to ui
  const msg = document.createElement("div");
  msg.className = `bg-neutral-800 my-6 p-3 rounded-xl ml-auto max-w-fit`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  input.value = "";

  chatContainer.appendChild(loading)

//   call server
const assistantMessage=  await callServer(text)

  const assistantMessageElem = document.createElement("div");
  assistantMessageElem.className = `my-6 p-3 max-w-fit`;
  assistantMessageElem.textContent = assistantMessage;
  loading.remove();
  chatContainer.appendChild(assistantMessageElem);
// console.log("assistantMessage",assistantMessage)
}

async function callServer(inputText){
    const response = await fetch("http://localhost:3001/chat", {
        method:"POST",
        headers:{
            'content-type':"application/json",
        },
        body:JSON.stringify({threadId,message:inputText})
    })

    if(!response.ok){
        throw new Error("Error Generating the response")

    }
    const result = await response.json();
    return result.message;
}

input?.addEventListener("keyup", handleEnter);
askBtn.addEventListener("click", handleAsk);

async function handleAsk(e) {
  const text = input.value.trim();
  // console.log("text",text)
  if (!text) {
    return;
  }
 await generate(text);
}

async function handleEnter(e) {
  if (e.key === "Enter") {
    const text = input.value.trim();
    // console.log("text",text)
    if (!text) {
      return;
    }
    await generate(text);
  }
}
