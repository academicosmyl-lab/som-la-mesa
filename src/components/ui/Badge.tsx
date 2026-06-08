interface Props {
  children: React.ReactNode
  variant?: 'teal' | 'amber' | 'red' | 'green' | 'blue' | 'gray' | 'demo'
  size?: 'xs' | 'sm'
}

const styles: Record<NonNullable<Props['variant']>, string> = {
  teal:  'bg-[rgba(25,227,194,0.12)] text-[#19E3C2] border border-[rgba(25,227,194,0.3)]',
  amber: 'bg-[rgba(255,159,46,0.12)] text-[#FF9F2E] border border-[rgba(255,159,46,0.3)]',
  red:   'bg-[rgba(255,93,93,0.12)] text-[#FF5D5D] border border-[rgba(255,93,93,0.3)]',
  green: 'bg-[rgba(57,220,132,0.12)] text-[#39DC84] border border-[rgba(57,220,132,0.3)]',
  blue:  'bg-[rgba(90,169,255,0.12)] text-[#5AA9FF] border border-[rgba(90,169,255,0.3)]',
  gray:  'bg-[rgba(126,138,160,0.12)] text-[#7E8AA0] border border-[rgba(126,138,160,0.2)]',
  demo:  'bg-[rgba(255,159,46,0.12)] text-[#FF9F2E] border border-[rgba(255,159,46,0.3)]',
}

export default function Badge({ children, variant = 'gray', size = 'xs' }: Props) {
  const sizeClass = size === 'xs'
    ? 'text-[9px] font-[700] tracking-[0.1em] px-[5px] py-[1px]'
    : 'text-[10px] font-[600] tracking-[0.08em] px-[7px] py-[2px]'

  return (
    <span
      className={`font-data inline-flex items-center rounded-[4px] uppercase ${sizeClass} ${styles[variant]}`}
    >
      {children}
    </span>
  )
}
