import React from "react";

const Header = ({header, iconHeaderImageUrl}) => {

    return (
        <header className='bg-white max-h-32'>
            <nav className="mx-auto grid grid-cols-2 justify-initial max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="w-8">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src={iconHeaderImageUrl} alt="website icon" />
                    </a>
                </div>

                <div className="justify-center">     
                    <div className="relative justify-none">
                    <h5  className="text-lg font-semibold leading-6 text-gray-900">{header}</h5>
                    </div>
                </div>
                
            </nav>
        </header>
    )
}

export default Header