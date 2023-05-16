
const ListUsers = ({users}) => {

  return (
    <aside className="w-[30%] h-[90%]">
        <div className="flex justify-between px-4 py-3">
            <div className="w-10 h-10">img user</div>
            <div>settings</div>
        </div>
        <ul className="border-t overflow-y-scroll overflow-auto h-full">
            <p>archive</p>
            {users.map((e,index) => // плохая практика использовать index как ключ, это тествый вариант
                <li key={index} className="px-1 border py-3 h-[72px] flex items-center justify-between">
                    <div className="bg-yellow-100 w-12 h-12 rounded-full text-sm flex items-center text-center">img user</div>
                    <div className="flex flex-col grow px-3">
                        <h2>{e.id}</h2>
                        <p>last message</p>
                    </div>
                    <p>date</p>
                </li>
            )}

        </ul>
    </aside>
  )
};

export default ListUsers;
