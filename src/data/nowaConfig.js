import uniqid from 'uniqid';
import * as yup from 'yup';

const min = 0;
const max = 100;
const primaryScale = 0.4;
const advanceScale = 1;
const primaryScore = '';
const advanceScore = '';
const bigger = 0;
// const value = '';
// const unique = true;
// const disabled = false;
// const basLevel = 'Poziom \n Podstawowy \n (%)';
// const extLevel = 'Poziom \n Rozszerzony \n (%)';

export const subjects = {
  id: uniqid(),
  title: 'Nowa Matura',
  min,
  max,
  subjects: [
    {
      id: uniqid(),
      title: 'Język obcy',
      primaryScore,
      advanceScore,
      primaryScale,
      advanceScale,
      forLanguage: 0.1,
      bigger,
    },
    {
      id: uniqid(),
      title: 'Język polski',
      primaryScore,
      advanceScore,
      primaryScale,
      advanceScale,
      forLanguage: true,
      bigger,
    },
    {
      id: uniqid(),
      title: 'Matematyka',
      primaryScore,
      advanceScore,
      primaryScale,
      advanceScale,
      hidden: true,
      forLanguage: true,
      bigger,
    },
    {
      id: uniqid(),
      title: 'Przedmiot dodatkowy',
      primaryScore,
      advanceScore,
      primaryScale,
      advanceScale,
      hidden: true,
      forLanguage: true,
      bigger,
    },
  ],
};

export const validationSchema = yup.object({
  subjects: yup.array().of(
    yup.object({
      primaryScore: yup
        .number()
        .positive()
        .integer()
        .min(min)
        .max(max),
      advanceScore: yup
        .number()
        .positive()
        .integer()
        .min(min)
        .max(max),
    }),
  ),
});
