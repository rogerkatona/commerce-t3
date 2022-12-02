import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'

export default function MenuSidebarView({
  links = [],
}: {
  links?: LinkProps[]
}) {
  const { closeSidebar } = useUI()

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/index">
                <a className={s.link}>Home</a>
              </Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/products">
                <a className={s.link}>Products</a>
              </Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/services">
                <a className={s.link}>Services & Customization</a>
              </Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/technology">
                <a className={s.link}>Technology & Patent</a>
              </Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/about">
                <a className={s.link}>About</a>
              </Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link
                href="https://www.instagram.com/the_real_fry_tech_llc/">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={s.link}>Instagram</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}

MenuSidebarView
