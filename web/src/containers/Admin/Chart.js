import React, { useState, useEffect } from "react"
import { orderListURL } from "../../constants"
import { authStore } from "../../apis/store"

import { useTheme } from "@material-ui/core/styles"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts"
import Title from "./Title"
import { Typography } from "@material-ui/core"

// Generate Sales Data
function createData(time, amount) {
  return { time, amount }
}

export default function Chart() {
  const theme = useTheme()
  const [orders, setOrders] = useState({
    loading: true,
    data: null,
  })
  useEffect(() => {
    const getOrders = () => {
      authStore
        .get(orderListURL)
        .then((response) => {
          const data = response.data.results
          let chartData = []
          for (let i = 0; i < data.length; i++) {
            const date = new Date(data[i].ordered_date).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )
            const now = new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
            if (now === date) {
              const orderDate = new Date(
                data[i].ordered_date
              ).toLocaleDateString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })
              const chartItem = createData(orderDate.toString(), data[i].total)
              chartData.push(chartItem)
            }
          }
          setOrders({
            loading: false,
            data: chartData,
          })
        })
        .catch((error) => setOrders({ ...orders, loading: false }))
    }
    getOrders()
  }, [])

  return (
    <React.Fragment>
      <Title>Today</Title>
      {orders.data && orders.data.length > 0 ? (
        <ResponsiveContainer>
          <LineChart
            data={orders.data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                }}
              >
                Sales (AED)
              </Label>
            </YAxis>
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" component="p">
          No sales today yet.
        </Typography>
      )}
    </React.Fragment>
  )
}
