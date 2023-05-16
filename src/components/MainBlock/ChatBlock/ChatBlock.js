import { useUserContext } from "@/context/user";
import { useEffect, useRef, useState, useCallback } from "react";

const ChatBlock = () => {
  const text = useRef(''); // берем значение инпута через реф
  const containerRef  = useRef(null); // рев блока с сообщениями
  const [messages, setMessages] = useState([]); //массив сообщений исходящих
  const [incomeMessage, setIncomeMessage] = useState([]); //массив сообщений входящих

  const {idInstanceContext,tokenContext, telContext} = useUserContext() // получаем idInstanceContext, id и telphone  из контекста

  const handleSubmitText = async (e) => { // отправка сообщения юзеру
    e.preventDefault();
    try {
      const send = await fetch(`https://api.green-api.com/waInstance${idInstanceContext}/sendMessage/${tokenContext}`, {
        method: 'POST',
        headers:  { "Content-Type": "application/json" },
        redirect: "follow",
        body: JSON.stringify({
          "chatId": telContext,
          "message": text.current.value
        })
      })
      const result = await send.text();
      if(result){
        setMessages(prev => [...prev, {message: text.current.value}]);
        setTimeout(()=>{
          text.current.value = ''; // Очистка значения инпута
        },10)
      }
    } catch (error) {
        alert('произошла ошибка:', error)
    }
  }

  useEffect(()=>{
    const handleTakeMessages = async() => {
      try {
        const response = await fetch(`https://api.green-api.com/waInstance${idInstanceContext}/receiveNotification/${tokenContext}`,{method: 'GET'});
        const webhookBody = await response.json(); // делаем данные ввиде json
        console.log(webhookBody);
          if(webhookBody.body.typeWebhook === 'incomingMessageReceived'){
            const message = webhookBody.body.messageData.textMessageData.textMessage; // почему то иногда extendedTextMessageData.text
            setIncomeMessage(prev => [...prev, {message: message, status:'incomingMessageReceived'}]); // добавляем взодящее сообщение в массив
            console.log(message);
            console.log('ты тут');
            await fetch(`https://api.green-api.com/waInstance${idInstanceContext}/deleteNotification/${tokenContext}/${webhookBody.receiptId}`,{method: 'DELETE'});

          } else if (webhookBody.body.typeWebhook === 'stateInstanceChanged') {
            console.log('stateInstanceChanged');
            await fetch(`https://api.green-api.com/waInstance${idInstanceContext}/deleteNotification/${tokenContext}/${webhookBody.receiptId}`,{method: 'DELETE'});
  
          } else if (webhookBody.body.typeWebhook === 'outgoingMessageStatus') {
            console.log('outgoingMessageStatus');
            await fetch(`https://api.green-api.com/waInstance${idInstanceContext}/deleteNotification/${tokenContext}/${webhookBody.receiptId}`,{method: 'DELETE'});
  
          } else if (webhookBody.body.typeWebhook === 'deviceInfo') {
            console.log('deviceInfo');
            await fetch(`https://api.green-api.com/waInstance${idInstanceContext}/deleteNotification/${tokenContext}/${webhookBody.receiptId}`,{method: 'DELETE'});
          }
      }
      catch (error) {
        console.log(error);
      }
  }
    handleTakeMessages();
    console.log(incomeMessage);
  const interval = setInterval(handleTakeMessages, 3000);
  return () => clearInterval(interval);
  },[idInstanceContext,incomeMessage,tokenContext])

  const scrollToBottom = () => { // прокрутка скрола вниз при новом сообщении
    if (containerRef .current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(()=>{ // при изменение массива сообщений вызывается эффект который скроллит вниз
    scrollToBottom();
  },[messages])

  return (
    <section className="h-full flex flex-col">
        <header className="flex w-full justify-between px-3 py-2 bg-[#f0f2f5]">
            <div>chosen user img</div>
            <button>settings</button>
        </header>
        <main className="flex py-3 px-9 h-full overflow-hidden flex-grow justify-end bg-[#efeae2]">
          <div ref={containerRef} className="flex flex-col justify-between no-scrollbar w-full items-end overflow-y-scroll gap-2">

            <div className="w-auto self-start gap-2 flex flex-col">
                {incomeMessage.map((e,index)=><p className={"px-2 py-1 w-auto flex bg-white"} key={index}>{e.message}</p>)}
            </div>
            <div className="w-auto self-end gap-2 flex flex-col">
                {messages.map((e,index)=> <p className={"bg-[#dcf8c6] px-2 py-1 w-auto flex"} key={index}>{e.message}</p>)}
            </div>

          </div>
        </main>
        <footer className="bg-[#f0f2f5] h-16 flex items-center px-2 justify-between">
            <div className="w-[5%] mr-5 p-1 cursor-pointer">smiles, attach</div>
            <form onSubmit={handleSubmitText} action="POST" className="w-[90%] h-full py-3">
                <input
                  required
                  ref={text}
                  className="w-full px-2 h-full rounded-md outline-none"
                  type="text"
                  placeholder="Введите сообщение"
                  />
            </form>
            <button className="w-[5%] ml-2 p-1 border">voice</button>
        </footer>
    </section>
  )
};

export default ChatBlock;
