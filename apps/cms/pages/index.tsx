import Button from 'components/Button'

export default function Index() {
  return (
    <main className='flex-center s-full flex'>
      <div className='grid grid-cols-4 gap-10'>
        <Button label='Button' variant='primary' />
        <Button label='Button' variant='secondary' />
        <Button label='Button' variant='dashed' />
        <Button label='Button' variant='link' />
      </div>
    </main>
  )
}
