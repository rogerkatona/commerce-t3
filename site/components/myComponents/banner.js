import serviceItems from "../../data/serviceItems";
import Link from "next/link";

export default function Banner(props) {

    let filteredItem = serviceItems.filter(function (item){
        return item.featured === props.featured
    });

    return (
        <>
            {filteredItem
                .filter(filteredItem => filteredItem.type === props.type)
                .map(filteredItem => (

                    <section
                        key={filteredItem.id}
                        className="md:px-12 px-6 py-16 bg-gray-100">

                        <div className={`flex flex-col max-w-7xl mx-auto ${filteredItem.featuredID % 2 !== 0  ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            <div className=' '>
                                <img
                                    src={filteredItem.src}
                                    width={1750}
                                    alt={'Featured Article'}
                                />
                            </div>
                            <div className={`lg:pt-0 pt-6 ${filteredItem.featuredID % 2 !== 0  ? 'md:pr-6' : 'md:pl-6'}`}>
                                <div className="mb-3">

                                    <div className='font-bebasNeue text-5xl text-gray-600 pt-3'>
                                        {filteredItem.title}
                                    </div>

                                    <div className='text-gray-700 pb-3'>{filteredItem.description}</div>
                                    <div className='text-gray-700 pb-6'>{filteredItem.description2}</div>
                                    <div className="flex flex-row">
                                        <div className={`${filteredItem.isButtonActive === 'true'  ? 'block' : 'hidden'}  pr-2`}>
                                            <a
                                                target={"_blank"}
                                                rel="noreferrer"
                                                href={filteredItem.buttonHref}>
                                                <button className="hover:bg-newGunmetal.800 hover:text-newGunmetal.50 text-xs text-newGunmetal.700 uppercase px-4 py-3 border border-newGunmetal.500 rounded-lg">
                                                    {filteredItem.buttonText}
                                                </button>
                                            </a>
                                        </div>
                                        <div className="">
                                            <Link href={filteredItem.featuredHREF}>
                                                <button className="hover:bg-newGunmetal.800 hover:text-newGunmetal.50 text-xs text-newGunmetal.700 uppercase px-4 py-3 border border-newGunmetal.500 rounded-lg">
                                                    {filteredItem.featuredButtonLabel}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                ))}
        </>
    )
}






