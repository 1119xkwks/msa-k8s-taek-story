import {useEffect} from 'react';

const usePageTitle = (pageTitle) => {
  useEffect(() => {
    const $title = document.getElementsByTagName('title')?.[0];
    if ($title) {
      let pTitle = pageTitle;
      if (pTitle) {
        pTitle += ` | 택 스토리`;
      }
      $title.innerText = pTitle;
    }
  }, []);
}

export default usePageTitle;