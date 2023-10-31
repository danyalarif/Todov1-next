import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='min-h-[90vh] flex flex-row items-center justify-center'>
        <Link href='/todo' className='border rounded-lg p-4 bg-purple-950 hover:bg-purple-800 text-3xl'>Enter Now</Link>
      </div>
    </>
  )
}
