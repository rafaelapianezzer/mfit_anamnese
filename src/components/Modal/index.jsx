export const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            {children}
        </div>
      </div>
    );
  };
  



