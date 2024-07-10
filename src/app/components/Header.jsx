import React from "react";

const Header = ({header}) => {
    return (
        <header className='bg-white'>
            <nav className="mx-auto flex justify-initial max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>

                <div className="flex lg:flex-1 justify-center">     
                    <div className="relative justify-none">
                    <h5  className="text-lg font-semibold leading-6 text-gray-900">{header}</h5>
                    </div>
                </div>

                {/* <div className ='flex lg:flex-1 justify-end'>
                {children}
                </div> */}
                
            </nav>
        </header>
    )
}

export default Header