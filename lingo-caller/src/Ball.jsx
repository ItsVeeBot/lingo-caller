import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { socket } from './Socket'

function Ball() {
    const [ballNum, setBallNum] = useState(23)
    const [visible, setVisible] = useState(false)
    
    useEffect(()=> {
        socket.on("number_change", (data) => {
            console.log(`Received a signal! ${data["number"]}`)
            setBallNum(data["number"])
            setVisible(true)
        })
        socket.on("toggle_number", ()=>{
            setVisible(visible => !visible)
        })
        return () => {
          socket.off("number_change")
          socket.off("toggle_number")
        }
    }, [socket])
  
    useEffect(() => {
      if (visible) {
        gsap.to(".ball1", {y:0, opacity:1})
      }
      else{
        gsap.to(".ball1", {y:50, opacity:0})
      }
  
    }, [visible])
  
    return (  
    <>
      <div className={"ball1 w-96 h-96 rounded-full inline-flex items-center justify-center text-white text-9xl font-bold bg-gradient-to-t " + (ballNum>=0 ? "from-blue-800 to-blue-400" : "from-red-800 to-red-400")}>
       {ballNum > 0 && ballNum}
       {ballNum == 0 && "?"}
      </div>
    </>
    )
  }
export default Ball;