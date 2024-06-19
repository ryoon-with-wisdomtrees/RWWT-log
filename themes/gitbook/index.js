/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use client'

import BLOG from '@/blog.config'
import Comment from '@/components/Comment'
import CommonHead from '@/components/CommonHead'
import { AdSlot } from '@/components/GoogleAdsense'
import LazyImage from '@/components/LazyImage'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import Girok from '@/public/images/inspiration/girok.jpg'
import ReadPic from '@/public/images/read/So-I-Read-And-Write.png'
import Coffee from '@/public/images/thelog/coffee.jpg'
import DearGod from '@/public/images/thelog/deargod.jpeg'
import Maria from '@/public/images/thelog/maria.jpeg'
import Leeseula from '@/public/images/thelog/leeseula.jpeg'
import Years from '@/public/images/thelog/years.jpeg'
import Jadu from '@/public/images/thelog/jadu.jpeg'
import Latte from '@/public/images/thelog/latte.jpeg'
import Nogiveup from '@/public/images/thelog/nogiveup.png'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import Announcement from './components/Announcement'
import ArticleAround from './components/ArticleAround'
import ArticleInfo from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from './components/BlogArchiveItem'
import BlogPostListPage from './components/BlogPostListPage'
import Catalog from './components/Catalog'
import CategoryItem from './components/CategoryItem'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import GuestBookItem from './components/GuestBookItem'
import InfoCard from './components/InfoCard'
import InspirationItem from './components/InspirationItem'
import JumpToTopButton from './components/JumpToTopButton'
import NavPostList from './components/NavPostList'
import PageNavDrawer from './components/PageNavDrawer'
import PortfolioItem from './components/PortfolioItem'
import ReadAndWriteItem from './components/ReadAndWriteItem'
import RevolverMaps from './components/RevolverMaps'
import SearchInput from './components/SearchInput'
import TagItemMini from './components/TagItemMini'
import TechLogItem from './components/TechLogItem'
import TheLogitem from './components/TheLogitem'
import TocDrawer from './components/TocDrawer'
import TopNavBar from './components/TopNavBar'
import CONFIG from './config'
import { Style } from './style'
import AGiveAwayLogItem from './components/AGiveAwayLogItem'

// Theme global variables
const ThemeGlobalGitbook = createContext()
export const useGitBookGlobal = () => useContext(ThemeGlobalGitbook)

/**
 * 기본 레이아웃
 * 왼쪽, 오른쪽 레이아웃을 채택하고, 모바일 단말기 상단 내비게이션 바를 활용하세요.
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const {
    children,
    post,
    allNavPagesForGitBook,
    slotLeft,
    slotRight,
    slotTop,
    meta
  } = props
  const { onLoading } = useGlobal()
  const router = useRouter()
  const [tocVisible, changeTocVisible] = useState(false)
  const [pageNavVisible, changePageNavVisible] = useState(false)
  // const modifiedAllNavPages = allNavPages?.filter(post => {
  //   return post && post?.type !== 'TheLog'
  // })
  // console.log('modifiedAllNavPages', modifiedAllNavPages)
  const [filteredNavPages, setFilteredNavPages] = useState(
    allNavPagesForGitBook
  )

  const showTocButton = post?.toc?.length > 1

  useEffect(() => {
    setFilteredNavPages(allNavPagesForGitBook)
  }, [post])

  return (
    <ThemeGlobalGitbook.Provider
      value={{
        tocVisible,
        changeTocVisible,
        filteredNavPages,
        setFilteredNavPages,
        allNavPagesForGitBook,
        pageNavVisible,
        changePageNavVisible
      }}
    >
      <CommonHead meta={meta} />
      <Style />

      <div
        id="theme-gitbook"
        className="bg-white dark:bg-hexo-black-gray w-full h-full min-h-screen justify-center dark:text-gray-300 dark:bg-black"
      >
        {/* 상단 네비게이션 바 */}
        <TopNavBar {...props} />

        <main
          id="wrapper"
          className={
            (BLOG.LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : '') +
            'relative flex justify-between w-full h-full mx-auto'
          }
        >
          {/* 왼쪽 네브바 */}
          <div
            className={
              'font-sans hidden md:block border-r dark:border-transparent relative z-10 '
            }
          >
            <div className="w-72  px-6 sticky top-0 overflow-y-scroll my-16 h-screen ">
              {slotLeft}
              <SearchInput className="my-3 rounded-md" />
              <div className="mb-20">
                {/* 모든 기사 목록 */}
                <NavPostList filteredNavPages={filteredNavPages} />
              </div>
            </div>

            <div className="w-72 fixed left-0 bottom-0 z-20 bg-white dark:bg-black">
              <Footer {...props} />
            </div>
          </div>

          <div
            id="center-wrapper"
            className="flex flex-col justify-between w-full relative z-10 pt-14 min-h-screen"
          >
            <div
              id="container-inner"
              className="w-full px-7 max-w-3xl justify-center mx-auto"
            >
              {slotTop}

              <Transition
                show={!onLoading}
                appear={true}
                enter="transition ease-in-out duration-700 transform order-first"
                enterFrom="opacity-0 translate-y-16"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-16"
                unmount={false}
              >
                {children}
              </Transition>

              {/* Google ads */}
              <AdSlot type="in-article" />

              {/* Back button */}
              <JumpToTopButton />
            </div>

            {/* bottom */}
            <div className="md:hidden">
              <Footer {...props} />
            </div>
          </div>

          {/*  오른쪽 슬라이딩 서랍 */}
          <div
            style={{ width: '32rem' }}
            className={'hidden xl:block dark:border-transparent relative z-10 '}
          >
            <div className="py-14 px-6 sticky top-0">
              <ArticleInfo post={props?.post ? props?.post : props.notice} />

              <div className="py-4">
                <Catalog {...props} />
                {slotRight}
                {/* {router.route === '/' && ( */}
                <>
                  <InfoCard {...props} />
                  {CONFIG.WIDGET_REVOLVER_MAPS === 'true' && <RevolverMaps />}
                  {/* <Live2D /> */}
                </>
                {/* )} */}
                {/* gitbook 테마 홈페이지에는 공지사항만 표시됩니다. */}
                <Announcement {...props} />
              </div>

              <AdSlot type="in-article" />
            </div>
          </div>
        </main>

        {/* Mobile floating directory button */}
        {showTocButton && !tocVisible && (
          <div className="md:hidden fixed right-0 bottom-52 z-30 bg-white border-l border-t border-b dark:border-gray-800 rounded">
            <FloatTocButton {...props} />
          </div>
        )}

        {/* 모바일 탐색 창 */}
        <PageNavDrawer {...props} filteredNavPages={filteredNavPages} />

        {/* 모바일 하단 탐색 메뉴 */}
        {/* <BottomMenuBar {...props} className='block md:hidden' /> */}
      </div>
    </ThemeGlobalGitbook.Provider>
  )
}

/**
 * 첫 장
 * 기사 세부정보 페이지로 리디렉션
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const router = useRouter()
  useEffect(() => {
    router.push(CONFIG.INDEX_PAGE).then(() => {
      // console.log('지정된 홈페이지로 이동', CONFIG.INDEX_PAGE)
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById('notion-article')
          if (!article) {
            console.log(
              'Please check if your Notion database contains this slug page： ',
              CONFIG.INDEX_PAGE
            )
            const containerInner = document.querySelector(
              '#theme-gitbook #container-inner'
            )
            const newHTML = `<h1 class="text-3xl pt-12  dark:text-gray-300">Configuration error</h1><blockquote class="notion-quote notion-block-ce76391f3f2842d386468ff1eb705b92"><div>请在您的notion中添加一个slug为${CONFIG.INDEX_PAGE}的文章</div></blockquote>`
            containerInner?.insertAdjacentHTML('afterbegin', newHTML)
          }
        }
      }, 7 * 1000)
    })
  }, [])

  return <LayoutBase {...props} />
}

/**
 * 기사 목록 없음
 * 모두 페이지 탐색에 따라 다릅니다.
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <LayoutBase {...props}>
      <div className="mt-10">
        <BlogPostListPage {...props} />
      </div>
    </LayoutBase>
  )
}

/**
 * 모든 기사 세부정보
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, prev, next, lock, validPassword, siteInfo } = props
  const { locale } = useGlobal()
  return (
    <LayoutBase {...props}>
      {/* 기사 잠금 */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && (
        <div id="container">
          {/* title */}
          <h1 className="text-3xl pt-12  dark:text-gray-300">{post?.title}</h1>
          <section
            className="flex-wrap
          shadow-text-md flex text-sm
          justify-start mt-4 text-gray-500
           dark:text-gray-400 font-light py-2
           "
          >
            <div className="flex justify-start dark:text-gray-200 ">
              <span className="whitespace-nowrap">
                <i className="far fa-calendar mr-2" />
                {post?.publishDay}
              </span>{' '}
              <span className="mx-1"> | </span>{' '}
              <span className="whitespace-nowrap mr-2">
                <i className="far fa-calendar-check mr-2" />
                {post?.lastEditedDay}
              </span>
              <div className="hidden busuanzi_container_page_pv font-light mr-2 whitespace-nowrap">
                <i className="mr-1 fas fa-eye" />
                <span className="busuanzi_value_page_pv" />
              </div>
            </div>
            <span className="mx-1"> | </span>{' '}
            <Link href="/main" passHref legacyBehavior>
              <div className="flex flex-row">
                <LazyImage
                  src={siteInfo?.icon}
                  className="rounded-full cursor-pointer"
                  width={22}
                  hight={22}
                  alt={BLOG.AUTHOR}
                />

                <div className="mr-3 ml-2 my-auto text-green-500 cursor-pointer">
                  {BLOG.AUTHOR}
                </div>
              </div>
            </Link>
          </section>
          {/* Notion기사 본문 */}
          {post && (
            <section id="article-wrapper" className="px-1">
              <NotionPage post={post} />

              {/* share */}
              <ShareBar post={post} />
              {/* Article classification and tag information */}
              <div className="flex justify-between">
                {CONFIG.POST_DETAIL_CATEGORY && post?.category && (
                  <CategoryItem category={post.category} />
                )}
                <div>
                  {CONFIG.POST_DETAIL_TAG &&
                    post?.tagItems?.map(tag => (
                      <TagItemMini key={tag.name} tag={tag} />
                    ))}
                </div>
              </div>

              {post?.type !== 'CONFIG' &&
                post?.type !== 'Menu' &&
                post?.type !== 'SubMenu' &&
                post?.type !== 'Notice' &&
                post?.type !== 'Page' &&
                post?.status === 'Published' && (
                  <ArticleAround prev={prev} next={next} />
                )}
              <AdSlot />

              <Comment frontMatter={post} />
            </section>
          )}

          <TocDrawer {...props} />
        </div>
      )}
    </LayoutBase>
  )
}

/**
 * 검색 없음
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  return <LayoutBase {...props}></LayoutBase>
}

/**
 * GuestBook (방명록) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutGuestBook = props => {
  const { GuestBookPosts } = props
  // console.log('theLogPosts', theLogPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl dark:text-gray-300 mb-4 ">GuestBook</div>
        <div className="flex flex-row">
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(GuestBookPosts)?.map(archiveTitle => {
              return (
                <GuestBookItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={GuestBookPosts}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * TheLog(일상기록) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutTheLog = props => {
  const { theLogPosts } = props
  // console.log('theLogPosts', theLogPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl flex flex-row  mb-4 ">
          <div className="">륜의 진실된 {''} </div>
          <div className="text-red-400">&nbsp;Life logs. </div>
        </div>
        <div className=" dark:text-gray-300 md:px-2 text-neutral-700 mt-3 text-base ">
          나는 배웠다.
          <br />
          앞과 뒤를 계산하지 않고 자신에게 정직한 사람이
          <br />
          결국은 우리가 살아가는 데서 앞선다는 것을.
          <br /> - Omer B. washington
          <br />
          <br />
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-20 h-full">
            <div className="w-full flex flex-row float-left  gap-4 mb-4 ">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image
                src={Nogiveup}
                alt="Nogiveup"
                className="rounded-lg duration-500  hover:scale-110 "
              />
              <Image
                src={Leeseula}
                alt="Leeseula"
                className="rounded-lg duration-500 mt-20 hover:scale-110"
              />
            </div>
            <div className="w-full flex flex-row float-right gap-4 mb-4 ">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}

              <Image
                src={Jadu}
                alt="Jadu"
                className="rounded-lg duration-500  hover:scale-110 h-3/5  "
              />
              <Image
                src={Latte}
                alt="Latte"
                className="rounded-lg duration-500  hover:scale-110  "
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(theLogPosts)?.map(archiveTitle => {
              return (
                <TheLogitem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={theLogPosts}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * Inspiration 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutInspiration = props => {
  console.log('여긴 찾아오나')
  const { InspirationPosts } = props
  // console.log('InspirationPosts', InspirationPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-row">
          <div className="w-1/2 mr-10">
            <div className="mb-2">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image
                src={Girok}
                alt="So-I-Read-And-Write"
                className="md:hidden"
              />
              <div className="text-3xl md:px-2 text-right  text-amber-400   mr-4 pb-2">
                영감기록
              </div>
              <div className=" dark:text-gray-300 md:px-2 text-neutral-700 mt-1 text-right my-2 mr-4 ">
                남에게서 배운 <br />
                좋은 질투와 <br />
                부러움
                <br />
                & &nbsp;&nbsp;
                <br />
                존경에
                <br />
                대한
                <br />
                기록
                <br />
                <br />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {' '}
            {Object.keys(InspirationPosts)?.map(archiveTitle => {
              // console.log(archiveTitle)
              return (
                <InspirationItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={InspirationPosts}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

// LayoutTechLog 테크 로그 레이아웃
const LayoutTechLog = props => {
  const { techLogPosts } = props
  // console.log('portfolioPosts', portfolioPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-col">
          <div className="w-full mb-4">
            <div>
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              {/* &gt;<Image src={ReadPic} alt="So-I-Read-And-Write" /> */}
              <div className="text-3xl  text-orange-500">Tech Logs </div>
              <div className=" dark:text-gray-300 mt-1  text-base p-2 ">
                <div className="flex flex-row">
                  {' '}
                  一(일) 개라도 배우고 기록하는{' '}
                  <div className="text-orange-300">&nbsp;완료주의</div> <br />
                </div>

                <div className="w-4/12 text-sm   text-right ">
                  &gt;&gt;&gt;&gt; betters than &gt;&gt;&gt;
                </div>
                <div className="text-xs    text-center">
                  완벽하게 배우려다 영원히 안하는 완성주의 <br />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {techLogPosts?.map((item, index) => {
              // console.log('item', item)
              // console.log(portfolioPosts[item.to])
              return (
                <TechLogItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

// LayoutAGiveAwayLog 제작/브랜딩/제안용 레이아웃 -24.06.19
const LayoutAGiveAwayLog = props => {
  console.log('찾아는 오니??')
  const { aGiveAwayLogPosts } = props
  console.log('aGiveAwayLogPosts:::::::::::', aGiveAwayLogPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-col">
          <div className="w-full mb-4">
            <div>
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              {/* &gt;<Image src={ReadPic} alt="So-I-Read-And-Write" /> */}
              <div className="text-3xl flex flex-row dark:text-gray-300 ">
                <div className=""> 🎨 </div>&nbsp;{' '}
                <div className="text-yellow-400">GiveAways</div>
                &nbsp;<div>to the World</div>
                &nbsp;{' '}
                <div className="text-red-600 dark:text-red-400">w/Love </div>
              </div>
              <div className=" dark:text-gray-300 mt-1 text-base p-2 ">
                Like Drawing <br />
                <div className="w-4/12 text-base  text-right ">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; or Making &
                  Creating &nbsp;&nbsp;&nbsp;
                </div>
                <div className="text-base    text-center">
                  or Proposing & Suggesting. <br />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {aGiveAwayLogPosts?.map((item, index) => {
              // console.log('item', item)
              // console.log(portfolioPosts[item.to])
              return (
                <AGiveAwayLogItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

// Portfolio 메뉴 레이아웃
const LayoutPortfolio = props => {
  const { portfolioPosts } = props
  // console.log('portfolioPosts', portfolioPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-col">
          <div className="w-full mb-4 px-2">
            <div className="">
              <div className=" dark:text-gray-300 mt-1 font   text-neutral-400 text-base ">
                5살 온종일 a4종이로 모델하우스 만들기. <br />
              </div>
              <div className=" dark:text-gray-300 mt-1 font   text-neutral-500 text-base ">
                27살 크고 작은 재미난 마케팅/광고 기획 제안.
              </div>
              <div className=" dark:text-gray-300 mt-1 font-size: 0.75rem; text-neutral-600 text-base ">
                그리고 여전히 분석하고 제안하고 창작하는 것을 즐거워하는
                개발자의
              </div>
              <div className="text-3xl dark:text-gray-300 text-neutral-900 py-4 ">
                SIDE-PROJECT PORTFOLIO.
              </div>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {portfolioPosts?.map((item, index) => {
              // console.log('item', item)
              // console.log(portfolioPosts[item.to])
              return (
                <PortfolioItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * Read & Write 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutReadAndWrite = props => {
  const { readAndWritePosts } = props
  // console.log('readAndWritePosts', readAndWritePosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl flex flex-row dark:text-gray-300 mt-4 mb-2">
          <div className="text-green-500">Read </div>
          <div className=" text-lime-400">&nbsp;&&nbsp;Write. </div>
        </div>
        <div className="w-1/2 text-base mb-4 dark:text-gray-300 text-neutral-700 ">
          읽고 쓰는 것은 자신의 세계를, <br />
          생각을 확장해 나가는 기록이다.
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 mr-20">
            <div className="">
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              <Image src={ReadPic} alt="So-I-Read-And-Write" />
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {Object.keys(readAndWritePosts)?.map(archiveTitle => {
              // console.log(archiveTitle)
              return (
                <ReadAndWriteItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={readAndWritePosts}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * 아카이브 페이지는 거의 사용되지 않습니다.
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3  min-h-full">
        {Object.keys(archivePosts)?.map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </LayoutBase>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <LayoutBase {...props}>
      <div className="w-full h-96 py-80 flex justify-center items-center">
        404 Not found.
      </div>
    </LayoutBase>
  )
}

/**
 * Category List
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <LayoutBase {...props}>
      <div className="bg-white dark:bg-neutral-700  px-10 py-10">
        <div className="dark:text-gray-200 mb-5">
          <i className="mr-4 fas fa-th" />
          {locale.COMMON.CATEGORY}:
        </div>
        <div id="category-list" className="duration-200 flex flex-wrap">
          {categoryOptions?.map(category => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior
              >
                <div
                  className={
                    'hover:text-black dark:hover:text-white dark:text-neutral-300 dark:hover:bg-neutral-600 px-5 cursor-pointer py-2 hover:bg-neutral-100'
                  }
                >
                  <i className="mr-4 fas fa-folder" />
                  {category.name}({category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * tag list
 */
const LayoutTagIndex = props => {
  console.log('props Tag:', props)
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <LayoutBase {...props}>
      <div className="bg-white dark:bg-neutral-700  px-10 py-10">
        <div className="dark:text-neutral-200 mb-5">
          <i className="mr-4 fas fa-tag" />
          {locale.COMMON.TAGS}:
        </div>
        <div id="tags-list" className="duration-200 flex flex-wrap">
          {tagOptions?.map(tag => {
            return (
              <div key={tag.name} className="p-2">
                <TagItemMini key={tag.name} tag={tag} />
              </div>
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutCategoryIndex,
  LayoutGuestBook,
  LayoutIndex,
  LayoutInspiration,
  LayoutAGiveAwayLog,
  LayoutPortfolio,
  LayoutPostList,
  LayoutReadAndWrite,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  LayoutTechLog,
  LayoutTheLog,
  CONFIG as THEME_CONFIG
}
