import TennisBall from "@/components/Tennis Ball/TennisBall"
import { Button } from "@/components/ui/button"
import { ReactNode, useEffect, useRef } from "react"
import { FaBaseball } from "react-icons/fa6"

interface TennisCourtProps {
  server: string
  children: ReactNode
  handleFault: () => void
  handleNet: () => void
  isOnFault: boolean
}

interface UserProfileProps {
  right: boolean
}

export const UserProfile = ({ right }: UserProfileProps) => {
  return (
    <div
      className={`flex flex-row ${right ? "flex-end items-end" : ""} h-full`}
    >
      <FaBaseball className="text-primary" size={25} />
      <img src="" alt="" />
      <div></div>
    </div>
  )
}

const TennisCourt = ({
  server,
  children,
  handleFault,
  handleNet,
  isOnFault,
}: TennisCourtProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = 700
  const height = 300

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const xforcenter = (canvas.width - 450) / 2
    const yforcenter = (canvas.height - 250) / 2

    const xforBigCenter = (canvas.width - width) / 2
    const yforBigCenter = (canvas.height - 250) / 2

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const centerLIneWidth = 450

    const netWidth = 500

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#2c5da2"
    ctx.fillRect(0, 0, width, height)

    if (server === "player1") {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
      ctx.fillRect(0, 0, centerX, height)
    } else if (server === "player2") {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
      ctx.fillRect(centerX, 0, canvas.width - centerX, height)
    }

    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 2
    ctx.strokeRect(xforcenter, yforcenter, 450, 250)

    ctx.beginPath()
    ctx.moveTo(centerX - centerLIneWidth / 2, centerY)
    ctx.lineTo(centerX + centerLIneWidth / 2, centerY)
    ctx.stroke()

    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 3
    ctx.strokeRect(xforBigCenter, yforBigCenter, width, 250)

    ctx.beginPath()
    ctx.moveTo(centerX, centerY - netWidth / 2)
    ctx.lineTo(centerX, centerY + netWidth / 2)
    ctx.stroke()
  }, [server])

  console.log("Fault on Tennis Court: ", isOnFault)

  return (
    <div className="relative flex flex-row  gap-1">
      {server === "player1" ? <UserProfile right={false} /> : ""}

      <canvas
        width={width}
        height={height}
        className="border-2 border-primary"
        ref={canvasRef}
      />
      <div
        className={`absolute  ${
          server === "player1"
            ? "left-[30%] top-[10%]"
            : "right-[30%] top-[10%]"
        }  h-28  flex flex-col gap-1 justify-between`}
      >
        {children}
      </div>
      <Button
        className="bg-primary absolute left-[40%] text-white px-1 capitalize w-32 shadow rounded-xl"
        onClick={handleFault}
      >
        {isOnFault ? "Double Fault" : "Fault"}
      </Button>
      {/* <Button
        className="bg-primary absolute left-[40%] top-[105%] text-white px-1 capitalize w-32 shadow rounded-xl"
        onClick={handleNet}
      >
        Net
      </Button> */}
      {server === "player2" ? <UserProfile right /> : ""}
    </div>
  )
}

export default TennisCourt
