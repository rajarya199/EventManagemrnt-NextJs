"use client"
import React, { useState, useEffect } from "react"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import { getTopCategory } from "@/app/actions/info.action"


const chartConfig = {
  event: {
    label: "Event",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export default function Page() {

    const [data, setData] = useState<{ id: string; name: string; eventCount: number }[]>([])
    const [loading, setLoading] = useState(true)
useEffect(()=>{
    async  function fetchData(){
        try{
const response= await getTopCategory()
if(response.success && response.data ){
    setData(response.data)
}
        }
        catch(error){
            console.error("Error fetching the data", error)

        }
        finally{
            setLoading(false)
        }
    }
    fetchData()
},[])


if (loading) return <p>Loading...</p>
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Categories</CardTitle>
        <CardDescription>Category By events</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
              top:8,
              bottom:8,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="eventCount" type="number" hide />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--chart-2))" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="eventCount"
              layout="vertical"
fill="hsl(var(--chart-1))"
              radius={4}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              {/* <LabelList
                dataKey="eventCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
