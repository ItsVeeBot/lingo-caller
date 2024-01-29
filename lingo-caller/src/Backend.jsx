import { socket } from './Socket'
import { useEffect, useState } from 'react'

function Backend() {

  const defaultEvenNums = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, -1, -1, -1]
  const defaultOddNums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, -1, -1, -1]

  const [evenNums, setEvenNums] = useState(shuffleNumbers(defaultEvenNums))
  const [oddNums, setOddNums] = useState(shuffleNumbers(defaultOddNums))

  function sendNumber(num) {
    socket.emit("number_change", {number: num})
  }

  function sendNumberEven(){
    const copyArr = [...evenNums]
    const num = copyArr.pop()
    setEvenNums(copyArr)
    sendNumber(num)
  }
  function sendNumberOdd(){
    const copyArr = [...oddNums]
    const num = copyArr.pop()
    setOddNums(copyArr)
    sendNumber(num)
  }

  function resetEven(){
    setEvenNums(shuffleNumbers([...defaultEvenNums]))
  }
  function resetOdd(){
    setOddNums(shuffleNumbers([defaultOddNums]))
  }
  function resetEvenQuestion(){
    setEvenNums(shuffleNumbers([...defaultEvenNums, 0, 0, 0]))
  }
  function resetOddQuestion(){
    setOddNums(shuffleNumbers([...defaultOddNums, 0, 0, 0]))
  }
  
  function addEvenQuestion(){
    setEvenNums(
      shuffleNumbers(
        [...evenNums, 0, 0, 0]
      )
    )
  }
  function addOddQuestion(){
    setOddNums(
      shuffleNumbers(
        [...oddNums, 0, 0, 0]
      )
    )
  }

  function toggleNumber(){
    socket.emit("toggle_number")
  }

  function shuffleNumbers(arr){
    var i = arr.length
    var j = 0
    var temp = 0

    while(i--){
      j = Math.floor(Math.random() * (i+1))
      temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }
  
  return (  
    <>
    <div className='flex'>
    <div className="m-auto md:w-6/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl bg-white shadow-xl">
                <div className="p-6 sm:p-16">
                    <div className="space-y-4">
                        <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Odd Team</h2>
                    </div>
                    <div className="mt-16 grid space-y-4">
                        <button onClick={sendNumberOdd} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Draw odd number</span>
                            </div>
                        </button>
                        <button onClick={resetOdd} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Reset and reshuffle</span>
                            </div>
                        </button>
                        <button onClick={addOddQuestion} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Add ? and reshuffle</span>
                            </div>
                        </button>
                        <button onClick={resetOddQuestion} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Reset, add ? and reshuffle</span>
                            </div>
                        </button>
                        <div>
                          {oddNums.map((num)=>{
                            return(
                              <span key = {Math.random()}>{num}, </span>
                            )
                          })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="m-auto md:w-6/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl bg-white shadow-xl">
                <div className="p-6 sm:p-16">
                    <div className="space-y-4">
                        <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Even Team</h2>
                    </div>
                    <div className="mt-16 grid space-y-4">
                        <button onClick={sendNumberEven} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Draw even number</span>
                            </div>
                        </button>
                        <button onClick={resetEven} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Reset and reshuffle</span>
                            </div>
                        </button>
                        <button onClick={addEvenQuestion} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Add ? and reshuffle</span>
                            </div>
                        </button>
                        <button onClick={resetEvenQuestion} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Reset, add ? and reshuffle</span>
                            </div>
                        </button>
                        <div>
                          {evenNums.map((num)=>{
                            return(
                              <span key = {Math.random()}>{num}, </span>
                            )
                          })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={toggleNumber}>Toggle visibility</button>
    </>
    )
  }
export default Backend;