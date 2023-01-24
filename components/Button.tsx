import type { ReactNode, ButtonHTMLAttributes, SyntheticEvent } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    
}

const Button = ({
    children,
    className,
    onClick,
    ...props
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl bg-slate-600 text-white px-4 py-2 rounded ${className ?? ""}`} {...props}>
        {children}
    </button>
  )
}

export default Button