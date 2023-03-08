import { useCallback, useEffect, useRef, useState } from "react"

export default function Circle({
  radius,
  points,
  angle,
  padding = 5,
  updateCoordinates,
  className,
}: {
  radius: number
  points: number
  angle: number
  padding?: number
  updateCoordinates: (coordinates: { x: number; y: number }[]) => void
  className?: string
}) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  async function getCoordinates() {
    const subAngle = angle / points

    const temp: { x: number; y: number }[] = []

    for (let i = 0; i <= points; i++) {
      const rad = subAngle * i * (Math.PI / 180)
      const x: number = radius * Math.cos(rad) + padding
      const y: number = radius * Math.sin(rad) + padding
      temp.push({ x, y })
    }

    updateCoordinates(temp)

    return temp
  }

  function drawCircle(
    canvas: HTMLCanvasElement,
    coordinates: { x: number; y: number }[]
  ) {
    canvas.width = radius * 2 + padding * 2
    canvas.height = radius * 2 + padding * 2
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const x = canvas.width / 2
    const y = canvas.height / 2
    const start = 0 * (Math.PI / 180)
    const rad = angle * (Math.PI / 180)

    ctx.beginPath()
    ctx.arc(x, y, radius, start, rad)
    ctx.stroke()
    ctx.closePath()

    const l = coordinates.length

    for (const coord of coordinates) {
      if (coord === coordinates[l - 1]) {
        ctx.fillStyle = "orange"
      } else if (coord === coordinates[0]) {
        ctx.fillStyle = "green"
      } else {
        ctx.fillStyle = "cornflowerblue"
      }

      ctx.beginPath()
      ctx.arc(coord.x + radius, coord.y + radius, 5, 0, 360)
      ctx.fill()
      ctx.closePath()
    }
  }

  const handleCanvasInitialLoad = useCallback(
    (canvas: HTMLCanvasElement) => {
      setCanvas(canvas)
      getCoordinates().then((data) => drawCircle(canvas, data))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!canvas) return

    getCoordinates().then((data) => {
      drawCircle(canvas, data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius, points, angle])

  return (
    <>
      <canvas ref={handleCanvasInitialLoad} className={className} />
    </>
  )
}
