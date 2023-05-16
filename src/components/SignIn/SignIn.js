import { useUserContext } from "@/context/user";
import { useState } from "react";

const SignIn = ({setSignIn,signIn}) => {
    
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [idInstance, setIdInstance] = useState('');
    const [message, setMessage] = useState('');
    const {setTokenContext, setIdInstanceContext} = useUserContext() // контекст юзера(токен, айди)

    const handleSubmit = async (e) => { // фетчим статус 
        e.preventDefault();
        setIdInstanceContext(idInstance); // записываем ади в контекст(шерим)
        setTokenContext(apiTokenInstance);// записываем токен в контекст(шерим)
        try {
            const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`, {method:'GET'});
            const result = await response.text();
            if(result){
                setMessage('Авторизованн! Перенаправляем...')
                setTimeout(()=>{
                    setSignIn(!signIn);                    
                    window.localStorage.setItem('auth',!signIn) 
                },2000);
            }
        } catch (error) {
            console.log('ошибка:', error)
            setMessage('Возникла ошибка, попробуйте снова...')
            setTimeout(()=>{
                setMessage('')
            },2000)
        }
    }

    const handleChangeToken = (e) => { // значение импута idInstance
        setApiTokenInstance(e.target.value);
    }
    const handleChangeId = (e) => { // значение импута apiTokenInstance
        setIdInstance(e.target.value)
    }

  return <section className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-fit h-5 text-red-600 font-bold text-lg mb-3">{message}</div>
            <h1 className="text-white uppercase text-2xl">Заполните поля что бы начать чат:</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/4 gap-3 my-3 items-center">
                <input
                    onChange={handleChangeId}
                    required
                    className="py-2 px-2 w-full"
                    value={idInstance} type="number"
                    placeholder="Введите idInstance"
                    />
                <input
                    onChange={handleChangeToken}
                    required
                    className="py-2 px-2 w-full"
                    value={apiTokenInstance}
                    type="text"
                    placeholder="Введите apiTokenInstance"
                    />
                <button className="bg-orange-700 rounded-md px-6 py-2 text-white">Go chat!</button>
            </form>
        </section>
};

export default SignIn;
