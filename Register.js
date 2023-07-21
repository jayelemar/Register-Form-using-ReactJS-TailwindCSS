import {useState, useEffect} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";


const Register = () => {
    const [showPassword, setShowPassword]= useState(false);
    const [showIndicator, setShowIndicator]= useState(false);
    const [pass, setPass]= useState("");

    const [passLetter, setPassLetter]= useState(false);
    const [passNumber, setPassNumber]= useState(false);
    const [passChar, setPassChar]= useState(false);
    const [passLength, setPassLength]= useState(false);
    const [passComplete, setPassComplete]= useState(false);

    const handleTooglePassword = () => {
        setShowPassword(!showPassword)
    };

    const handleShowIndicator = () => {
        setShowIndicator(true);
    };

    const handlePasswordChange = (e) => {
        setPass(e.target.value)
        console.log(pass);
    };

    useEffect(()=> {
     // checking lowercase & uppercase
        if(pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            setPassLetter(true)
        } else {
            setPassLetter(false)
        }
    // Check for Numbers
        if(pass.match(/([0-9])/)) {
            setPassNumber(true)
        } else {
            setPassNumber(false)
        }

    //Check for Special Characters
        if(pass.match(/([!,@,#,$,%,^,&,*,?,_,~])/)){
            setPassChar(true)
        } else {
            setPassChar(false)
        }
        
    //CHeck for passLength
        if(pass.length > 7) {
            setPassLength(true)
        } else {
            setPassLength(false)
        }

    // Check if all pass indicator is checked
        if(passLetter && passNumber && passChar && passLength ) {
            setPassComplete(true)
        } else {
            setPassComplete(false)
        }

    }, [pass, passLetter, passNumber, passChar, passLength])

    return (
        <section>
            <form action=''>
                <h1>Register</h1>
                <input type="text" placeholder='Username'/>
                <input type="email" placeholder='Email'/>
                {/* Password Field*/}
                <div className="password relative">
                    <input type={showPassword ? "text" : "password"} 
                            placeholder='Password'
                            onFocus={handleShowIndicator}
                            value={pass}
                            onChange={handlePasswordChange}
                            />
                    <span className='icon absolute top-3 right-1 cursor-pointer'
                        onClick={handleTooglePassword}>
                            {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </span>
                </div>
                {/* Password Field*/}
                <button disabled={!passComplete} 
                        onClick={()=> {
                            alert(pass)
                        }}
                        className={passComplete ? "btn-blue" : "btn-grey" }>
                        Register
                </button>
                <p className='relative right-9 bottom-2'>Have an account? <span className='login'>Login</span></p>


                {/* Password Strength Indicator */}
                <div className={`password-strength-indicator ${showIndicator ? 'show-indicator' : 'hide-indicator'}`}>
                    <p>Password Strength Indicator</p>
                    <ul>
                        <li className={passLetter ? "pass-green": "pass-red"}>
                            <span>
                                {passLetter ? <FaCheck/> : <GoDotFill/>}
                                &nbsp;LowerCase & Uppercase
                            </span>
                        </li>
                        <li className={passNumber ? "pass-green": "pass-red"}>
                            <span>
                                {passNumber ? <FaCheck/> : <GoDotFill/>}
                                &nbsp;Numbers(0-9)
                            </span>
                        </li>
                        <li className={passChar ? "pass-green": "pass-red"}>
                            <span>
                                {passChar ? <FaCheck/> : <GoDotFill/>}
                                &nbsp;Special Characters(!@#$%^&*)
                            </span>
                        </li>
                        <li className={passLength ? "pass-green": "pass-red"}>
                            <span>
                                {passLength ? <FaCheck/> : <GoDotFill/>}
                                &nbsp;At least 8 Characters
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Password Strength Indicator */}
            </form>
        
        </section>
    )
}

export default Register
