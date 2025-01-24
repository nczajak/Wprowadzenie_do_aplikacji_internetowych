import {useState} from "react";
import Payment from "./payment";

const OrderDetails = ({cart,userCart,userid,deleteFunction})=>{
    // console.log(cart)

    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [city,setCity]=useState("");
    const [address,setAddress]=useState("");
    const [paymentComponent,setPaymentComponent]=useState(false);
    const [nameGuard,setNameGuard] = useState(false);
    const [surnameGuard,setSurnameGuard] = useState(false);
    const [emailGuard,setEmailGuard] = useState(false);
    const [phoneGuard,setPhoneGuard] = useState(false);
    const [cityGuard,setCityGuard] = useState(false);
    const [addressGuard,setAddressGuard] = useState(false);
    const [emailCorrectGuard,setEmailCorrectGuard]=useState(false);
    const [phoneCorrectGuard,setPhoneCorrectGuard]=useState(false);


    const goToPayment= ()=>{

        let isValid = true;
        if(name==="" ) {
            setNameGuard(true);
            isValid = false;
        }
        else{
            setNameGuard(false);
        }
        if( surname==="" ) {
            setSurnameGuard(true);
            isValid = false;
        }
        else{
            setSurnameGuard(false);
        }
        if(email==="" ) {
            setEmailGuard(true);
            isValid = false;
        }
        else{
            setEmailGuard(false);
        }
        if(phone === ""){
            setPhoneGuard(true);
            isValid = false;
        }
        else{
            setPhoneGuard(false);
        }
        if(city === "" ) {
            setCityGuard(true);
            isValid = false;
        }
        else{
            setCityGuard(false);
        }
        if(address === "" ){
            setAddressGuard(true);
            isValid = false;
        }
        else{
            setAddressGuard(false);
        }
        if(email!== "" && !validateEmail(email)){
            setEmailCorrectGuard(true);
            isValid = false;
        }
        else{
            setEmailCorrectGuard(false);
        }
        if(phone!=="" && !validatePhoneNumberWithAnyCode(phone)){
            setPhoneCorrectGuard(true);
            isValid = false;
        }
        else{
            setPhoneCorrectGuard(false);
        }
        if(isValid){
            setPaymentComponent(true);
        }
    }


    const validateEmail=(email)=> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePhoneNumberWithAnyCode=(phoneNumber)=> {
        const phoneRegex = /^\+\d{2}\s\d{3}\s\d{3}\s\d{3}$/;
        return phoneRegex.test(phoneNumber);
    }


    return (
        <div>
            <p>Uzupełnij dane o sobie</p>
            <p>Name: </p>
            {(nameGuard) &&
                <p>Musisz podać imię aby przejść dalej!</p>
            }
            <input type="text" value={name} onChange={(e)=>{
                setName(e.target.value);
            }}/>
            <p>Surname: </p>
            {(surnameGuard) &&
                <p>Musisz podać nazwisko aby przejść dalej!</p>

            }
            <input type="text" onChange={(e) => {
                setSurname(e.target.value);
            }}/>
            <p>Address e-mail: </p>
            {(emailGuard) &&
                <p>Musisz podać adres email aby przejść dalej!</p>
            }
            {(emailCorrectGuard)&&
                <p>Adres email powinien mieć formę: x@x.x</p>
            }
            <input type="text" onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <p>Phone number: </p>
            {(phoneGuard) &&
                <p>Musisz podać nunmer telefonu aby przejść dalej!</p>
            }
            {(phoneCorrectGuard) &&
                <p>Numer telefonu powinien mieć formę: +xx xxx xxx xxx</p>
            }
            <input type="text" onChange={(e) => {
                setPhone(e.target.value)
            }}/>
            <h2>Address to delivery</h2>
            <p>City: </p>
            {(cityGuard) &&
                <p>Musisz podać miasto zamieszkania aby przejść dalej!</p>
            }
            <input type="text" onChange={(e)=>{
                setCity(e.target.value)
            }}/>
            <p>Address:</p>
            {(addressGuard) &&
                <p>Musisz podać adres aby przejść dalej!</p>
            }
            <input type="text" onChange={(e)=>{
                setAddress(e.target.value)
            }}/>
            <button onClick={goToPayment}>Proceed to Payment</button>
            {(paymentComponent)&&(
                <Payment cart={cart} userCart={userCart} user={userid} deleteFunction={deleteFunction}/>
            )}

        </div>
    )
}
export default OrderDetails;