const Header = () => {

    const navigations = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
    ];

    return (
        <>
            <style jsx>{`
        .centerHeader{
          text-align: -webkit-center;
        }
      `}</style>
            <header className="centerHeader">
                <div className="h-16 flex items-center justify-between max-w-2xl px-4 hover:cursor-pointer">
                    <ul className="flex gap-4">
                        {navigations.map((item, index) => (
                            <a key={index} className="font-semibold text-gray-400 hover:text-gray-500">
                                {item.name}
                            </a>
                        ))}
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header