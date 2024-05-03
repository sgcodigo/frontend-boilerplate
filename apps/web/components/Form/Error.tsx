export default function Error({ msg = '' }: { msg?: string }) {
  return msg.trim() ? (
    <p className='text-error mt-2 flex items-start space-x-1.5'>
      <span className='mt-0.5 flex-1 text-sm'>{msg}</span>
    </p>
  ) : null
}
