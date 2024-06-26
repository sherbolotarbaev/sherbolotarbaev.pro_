'use client';

import { siteConfig } from '@/config/site';
import type { Post } from '@/app/lib/blog';

import Image from 'next/image';

import Banner from '../components/banner';
import Experience from './components/experience';
import Contact from './components/contact';
import Skills from './components/skills';
import Posts from './components/posts';

import sher from '@/public/images/sherbolot.webp';
import { IoIosArrowRoundForward } from 'react-icons/io';
import scss from '@/app/components/scss/page.module.scss';

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: Readonly<HomeClientProps>) {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <div className={scss.logo_wrapper}>
            <Image
              className={scss.logo}
              width={500}
              height={500}
              src={sher}
              alt={siteConfig.name}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAMklEQVR4nAEnANj/ANTe4JSQkOvl21diZQC/rqNwZmvItraVn6kAAAwYdpqq8O/z8/j3vaUXBBJEHV0AAAAASUVORK5CYII="
            />
          </div>

          <div className={scss.text}>
            <h2 className={scss.title}>{"hey, I'm Sher 👋"}</h2>

            <p className={scss.desc}>
              {
                "I'm a software engineer from Kyrgyzstan 🇰🇬. I'm fascinated by large-scale, high-impact products and contributed to major feature launches in industry-leading services."
              }
            </p>
          </div>

          <Banner width={195} href="/cv/Sherbolot-Arbaev.pdf">
            📢 Available for Work <IoIosArrowRoundForward size={19} />
          </Banner>
        </div>

        <div className={scss.container}>
          <Skills />
        </div>

        <div className={scss.container}>
          <Experience />
        </div>

        <div className={scss.container}>
          <Posts posts={posts} />
        </div>

        <div className={scss.container}>
          <Contact />
        </div>
      </section>
    </>
  );
}
