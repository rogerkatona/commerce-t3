import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import s from './Footer.module.css'
import Modal from "components/myComponents/modal";
import useModal from "lib/useModal";

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)
  const {isShowing, toggle} = useModal();

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="flex flex-col justify-center md:items-center md:px-0 px-6 bg-medBlue.900 py-48 space-y-6">
          <div className="">
            <Link href="/">
              <a className="flex ">
                <span>
                  <Logo />
                </span>
              </a>
            </Link>
          </div>
          <div className="">
            <nav className="space-x-6">
              <Link href="/products">
                <a className={s.link}>Products</a>
              </Link>
              <Link href="/services">
                <a className={s.link}>Services & Customization</a>
              </Link>
              <Link href="/technology">
                <a className={s.link}>Technology & Patent</a>
              </Link>

              {/*              {links?.map((l) => (
                <Link href={l.href} key={l.href}>
                  <a className={s.link}>{l.label}</a>
                </Link>
              ))}*/}
              <Link href="/About">
                <a className={s.link}>About</a>
              </Link>
              <Link
                href="https://www.instagram.com/the_real_fry_tech_llc/">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={s.link}>Instagram</a>
              </Link>
            </nav>
          </div>
          <div>
            <Link href=''>
              <button
                onClick={toggle}
                className="hover:bg-rust.800 hover:text-white.100 hover:border-newGunmetal.300 text-xs text-newGunmetal.500 uppercase px-3 py-2  border border-newGunmetal.500 rounded-lg">
                Contact
              </button>
            </Link>
          </div>
          <section>
            <Modal
              isShowing={isShowing}
              hide={toggle}
            />
          </section>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
