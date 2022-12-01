import React from 'react';
import ReactDOM from 'react-dom';
import  { Form } from "./form";



const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(

    <>
        <div className="relative" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="w-full h-full z-20 bg-bg-contactModal bg-cover fixed top-0 left-0 flex flex-row">

                <section className="fixed right-0">
                    <div className="modal-close cursor-pointer z-20 p-4">
                        <button type="button" className="text-white.100" data-dismiss="modal" aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">
                                <svg className="fill-current text-white.700" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                     viewBox="0 0 18 18">
                                    <path
                                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto flex flex-col justify-center xl:w-1/2 w-full md:px-12 px-2 pt-24 ">
                    <div className="lg:p-12 p-6">
                        <div className="font-bebasNeue text-6xl text-white.100  flex flex-row justify-center pb-12">
                            Contact FryTech
                        </div>
                        <div className="text-gray.200 flex flex-row justify-center pb-12 text-center">
                            <div className="" >
                                Provide your information and we will reach out to quickly to discuss how we can help. We look forward to hearing from you soon!
                            </div>
                        </div>
                        <Form/>
                    </div>
                </section>

            </div>
        </div>
    </>, document.body
) : null;

export default Modal;
