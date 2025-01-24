import facebook from '../images/facebook.png'
import instagram from '../images/instagram.webp'
import paypal from '../images/paypal.png'
import mastercard from '../images/mastercar.webp'
import blik from '../images/blik.png'
import visa from '../images/visa.jpg'
import mbank from '../images/Mbank.jpg'
const Footer=()=>{
    return(
        <div className="footer">
            <div className="followUsComponent">
                <div className="followUs">Follow us</div>
                <div>
                    <div className="logoFotter">
                        <img src={facebook} alt="facebook logo" width="30px" height="30px"/>
                        <p>https://www.facebook.com/UniversalStore</p>
                    </div>
                    <div className="logoFotter">
                        <img src={instagram} alt="instagram logo" width="30px" height="30px"/>
                        <p>@universal.store.official</p>
                    </div>

                </div>
            </div>
            <div className="logoFotterPayment">
                <img src={visa} alt="visa logo" width="70px" height="50px"/>
                <img src={paypal} alt="paypal logo" width="50px" height="50px"/>
                {/*<img src={mastercard} alt="mastercard logo" width="80px" height="70px"/>*/}
                <img src={blik} alt="blik logo" width="110px" height="50px"/>
                <img src={mbank} alt="mbank logo" width="120px" height="50px"/>

            </div>
        </div>
    )
}
export default Footer;