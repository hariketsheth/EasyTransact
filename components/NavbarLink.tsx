import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/NavbarLink.module.css'

function NavbarLink({ text, href }: { text: string, href: string }) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a className={
        `${router.pathname === href && styles.active} pb-1
         hover:border-b-2 hover:border-b-violet-500`
      }>
        {text}
      </a>
    </Link>
  )
}

export default NavbarLink
