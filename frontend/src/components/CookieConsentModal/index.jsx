import { useEffect, useState } from "react";
import "./styles.css";

const CookieConsentModal = () => {
  const [isVisible, setIsVisible] = useState(false); //State to open and close cookie modal

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent"); //Get the item of local storage call "cookie_consent"
    if (!consent) { //If the user hasn't accept the cookie consent
      setIsVisible(true); //Open the modal 
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true"); //When the user accept the cookie set true in the cookie_consent var of local storage
    setIsVisible(false); //Close the modal 
  };

  if (!isVisible) return null;  //Prevent unnecessary renders

  return (
    <div className="cookie-modal-container">
      <div className="cookie-modal">
        <h2 className="cookie-title">🍪 ¿Aceptas nuestras cookies?</h2>
        <p className="cookie-text">
          Usamos cookies para mejorar tu experiencia. 
        </p>
        <div className="cookie-buttons">
          <button
            className="cookie-button reject"
            onClick={() => setIsVisible(false)}
          >
            Rechazar
          </button>
          <button
            className="cookie-button accept"
            onClick={handleAccept}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;