'use client';

import Form from './form';

import scss from './scss/contact.module.scss';

export default function Contact() {
  return (
    <>
      <div className={scss.wrapper} id="contact">
        <div className={scss.container}>
          <h2 className={scss.title}>Get in touch ✉️</h2>

          <Form />
        </div>
      </div>
    </>
  );
}
