import Link from "next/link";
import useModal from "../../lib/useModal";
import Modal from "./modal";
import promoItems from "../../data/promoItems";

export default function Promo(props) {

    let filteredItem = promoItems.filter(function (item){
        return item.id === props.id
    });

    const {isShowing, toggle} = useModal();

    return (

        <>
            {filteredItem
                .map(filteredItem => (
                    <div
                        key={filteredItem.id}
                        className="flex flex-row bg-newGunmetal.50">

                        <section className="flex flex-col xl:px-0 px-6 py-16 lg:mx-auto lg:max-w-7xl">

                            <div className="font-bebasNeue text-3xl text-gray-700 pb-4">{filteredItem.headline}</div>

                            <div className="py-4">
                                <div className="text-xl text-gray-700 font-medium">{filteredItem.title}</div>
                                <div className="text-xs text-gray-500 italic">{filteredItem.source}</div>
                            </div>

                            <div className="">
                                <div className="text-gray-700">{filteredItem.text}</div>
                                <div className="text-gray-700 pt-4">{filteredItem.actionText}</div>
                            </div>

                            <div className="pt-8">
                                <Link href=''>
                                    <button
                                        onClick={toggle}
                                        className="bg-newYellow.700 hover:bg-newYellow.900 hover:text-gray-100 text-xs text-newGunmetal.50 uppercase px-4 py-3 rounded-lg">
                                        {filteredItem.buttonLabel}
                                    </button>
                                </Link>
                            </div>

                        </section>

                        <section>
                            <Modal
                                isShowing={isShowing}
                                hide={toggle}
                            />
                        </section>
                    </div>
                ))}
        </>

    )
}






