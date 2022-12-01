import quoteItems from "../../data/quoteItems";


export default function Quote(props) {

    let filteredItem = quoteItems.filter(function (item){
        return item.id === props.id
    });


    return (

        <>
            {filteredItem
                .map(filteredItem => (
                    <div
                        key={filteredItem.id}
                        className="flex flex-row md:px-0 px-6 py-16 bg-newGunmetal.50">

                        <section className="max-w-7xl mx-auto md:w-2/3">
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-col  text-newGunmetal.700">
                                    <div className="text-center font-light text-xl">&quot;{filteredItem.text}&quot;</div>
                                    <div className="text-center font-light text-lg pt-3"> - {filteredItem.author}, {filteredItem.title}</div>
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
        </>

    )
}






