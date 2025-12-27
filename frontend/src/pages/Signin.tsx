import { SigninAccount } from '../components/SigninAccount'
import { Quote } from "../components/Quote"

function Signin() {
   return (
      <div className="flex justify-center items-center h-screen w-screen">
        <SigninAccount/>
        <Quote/>
      </div>
   )
}

export default Signin