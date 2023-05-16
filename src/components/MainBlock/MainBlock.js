import { useRef, useState } from "react";
import ChatBlock from "./ChatBlock/ChatBlock";
import WelcomeBlock from "./WelcomeBlock/WelcomeBlock";
import ListUsers from "./ListUsers/ListUsers";
import { useUserContext } from "@/context/user";

const MainBlock = () => {

  const tel = useRef(''); // рев инпута телефона
  const [exist, setExist] = useState(false); // проверяем залогин ли юзер - от этого зависит увидит он окно телефона или сразу чат
  const [users, setUsers] = useState([]); // массив контактов юзера
  const {setTelContext} = useUserContext(); // берем функцию useState и записываем туда номер телефона

  const handleSubmit = (e) => { // ввод номера с кем чат
    e.preventDefault();
    const contact = `${tel.current.value}@c.us`;
    setTelContext(contact); // записываем телефон в контекст(шерим)
    setUsers(prev => [...prev, {id:contact}])
    if(tel.current.value > 10){
        setExist(true);
    }
  }

  return <div className="w-full h-[94vh] border bg-white text-black flex justify-between overflow-hidden">
            <ListUsers users={users}/>
            <div className="w-[70%] border flex flex-col">
                {exist 
                    ? <ChatBlock/>
                    : <WelcomeBlock tel={tel} handleSubmit={handleSubmit}/>
                }
            </div>
        </div>;
};

export default MainBlock;
