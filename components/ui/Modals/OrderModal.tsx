import React, { useState } from "react";

const OrderModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay with opacity */}
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-3xl">
            <section className="rounded-3xl">
              <div className="p-8 text-center sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                  Tu pedido está en camino
                </p>

                <h2 className="mt-6 text-3xl font-bold">
                  Gracias por tu compra, ¡lo estamos preparando!
                </h2>

                <button
                  onClick={toggleModal}
                  className="mt-12 inline-block w-full rounded-md bg-primary-500 py-4 text-sm font-bold text-primary-50 shadow-xl"
                >
                  Continuar
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModal;
