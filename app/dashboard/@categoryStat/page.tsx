"use client"
import React,{useState,useEffect, use} from 'react'
import { Label, Pie, PieChart,Tooltip } from "recharts"

import { Card,  CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from '@/src/components/ui/card'
    import { getCatEventInfo } from '@/app/actions/info.action'
    import { ChartConfig, ChartContainer,
        ChartTooltip,
        ChartTooltipContent, } from '@/src/components/ui/chart'

     const colors=["#36A2EB","#FF6384", "#FFCE56", "#FF9F40", "#4BC0C0", "#9966FF"]   
     const chartConfig={
        category:{
            label:"Events"
        }
    } satisfies ChartConfig
const Page = () => {
    const [categoryData,setCategoryData] =useState<any>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCatEventInfo()
                if (response.success && response.data) {
                    setCategoryData(response.data)
                } else {
                    console.error("Error fetching data:", response.message)
                }
            } catch (err) {
                console.error("Error fetching totals:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    },[])
const chartData= categoryData?.map((category:any,index:number)=>({
    name:category.name,
    value:category.value,
    fill:colors[index % colors.length],
}))
const totalEvent = React.useMemo(() => {
    return categoryData.reduce((acc:any, curr:any) => acc + curr.value, 0)
  }, [categoryData])


  return (
    <div>
<Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Event's Category </CardTitle>
        <CardDescription>Event distribution by category </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
{totalEvent}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Events
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
    
          Category performance data <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total Events by category.
        </div>
      </CardFooter>
    </Card>

    </div>
  )
}

export default Page