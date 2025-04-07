import React from 'react'
interface catProps{
    params: Promise<{ id: string }>;

}
const page = async({params}:catProps) => {
    const { id } = await params;
  return (
    <div>page</div>
  )
}

export default page