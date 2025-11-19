import React from 'react';
import Export from '../Export/Export.js';
import Reset from './Reset.js';

function Footer() {
  return (
    <section className={'h5p-keywords-footer'}>
      <Reset/>
      <Export/>
    </section>
  );
}

export default Footer;
