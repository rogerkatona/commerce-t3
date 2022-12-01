import serviceItems from "../../data/serviceItems";
import Link from "next/link";

export default function Service(props) {

    let filteredItem = serviceItems.filter(function (item){
        return item.type === props.type
    });

    return (
        <>
                <section className="flex flex-col md:px-6 px-6 py-12 pt-6 bg-newGunmetal.050">
                    {filteredItem
                        .filter(filteredItem => filteredItem.subtype === props.subtype && filteredItem.featured === "false")
                        .map(filteredItem => (
                            <div
                                key={filteredItem.id}
                                className={`flex lg:flex-row flex-col  md:space-y-12  space-y-6 max-w-7xl mx-auto  ${filteredItem.id % 2 === 0  ? 'lg:flex-row-reverse ' : 'lg:flex-row'}`}>

                                <div className="pt-12">
                                    <img
                                        className=""
                                        src={filteredItem.src}
                                        width={1000}
                                        alt={filteredItem.alt}
                                    />
                                </div>
                                <div className={`${filteredItem.id % 2 === 0  ? 'lg:pr-12' : 'lg:pl-12'} lg:w-4/5 w-full pt-0 `}>
                                    <div className='font-bebasNeue text-4xl text-gray-400 font-light border-b'>{filteredItem.number}</div>
                                    <div className='text-2xl text-gray-700 pt-4'>{filteredItem.title}</div>
                                    <p className="pt-2 text-gray-700">{filteredItem.description}</p>
                                    <p className="pt-2 text-gray-700">{filteredItem.actionDescription}</p>
                                    <div className={`${filteredItem.isButtonActive === 'true'  ? 'block' : 'hidden'} pt-6`}>
                                        <Link href={filteredItem.buttonHref}>
                                            <a
                                                target={"_blank"}
                                                rel="noreferrer"
                                                className="bg-newYellow.800 hover:bg-newYellow.900 hover:text-gray.100 text-xs text-gray-100 uppercase px-4 py-3 rounded-lg">
                                                {filteredItem.buttonText}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                    ))}
                </section>
        </>
    )
}






