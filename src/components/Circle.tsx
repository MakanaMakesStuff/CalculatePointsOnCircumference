import { useEffect, useState } from "react"

export default function Circle({
  radius,
  points,
  angle,
}: {
  radius: number
  points: number
  angle: number
}) {
  const subAngle = angle / points

  const [positions, setPoints] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    for (let i = 0; i < points; i++) {
      const rad = subAngle * (Math.PI / 180)
      const x: number = radius * Math.cos(rad)
      const y: number = radius * Math.sin(rad)
      setPoints([...positions, { x, y }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <span className="answer">
        {positions.map((point, i) => {
          return (
            <span key={i}>
              your coordiantes are: {`${point.x} and ${point.y}`}
            </span>
          )
        })}
      </span>
    </>
  )
}
