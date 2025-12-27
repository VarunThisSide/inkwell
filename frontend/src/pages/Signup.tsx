import { CreateAccount } from "../components/CreateAccount"
import { Quote } from "../components/Quote"

function Signup() {
   return (
      <div className="flex justify-center items-center h-screen w-screen">
         <CreateAccount/>
         <Quote/>
      </div>
   )
}

export default Signup