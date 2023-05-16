
const WelcomeBlock = ({handleSubmit,tel}) => {
  return (
    <section className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h3 className="text-2xl">Введите номер контакта для чата</h3>
            <input
                ref={tel}
                className="my-5 max-w-sm border outline-none py-1 px-3"
                type="tel"
                placeholder="Введите номер +7..."
                />
            <button>Начать чат</button>
        </form>
    </section>
  )
};

export default WelcomeBlock;
