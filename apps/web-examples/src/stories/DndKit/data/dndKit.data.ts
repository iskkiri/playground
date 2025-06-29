import sampleImage1 from '@/assets/images/sample1.png';
import sampleImage2 from '@/assets/images/sample2.png';
import sampleImage3 from '@/assets/images/sample3.png';
import sampleImage4 from '@/assets/images/sample4.png';
import sampleImage5 from '@/assets/images/sample5.png';
import sampleImage6 from '@/assets/images/sample6.png';
import sampleImage7 from '@/assets/images/sample7.png';

export const cardList = [...Array(10)].map((_, i) => ({
  id: i + 1,
  text: `Item ${i + 1}`,
}));

export const imageCardList = [...Array(7)].map((_, i) => ({
  id: i + 1,
  image: [
    sampleImage1.src,
    sampleImage2.src,
    sampleImage3.src,
    sampleImage4.src,
    sampleImage5.src,
    sampleImage6.src,
    sampleImage7.src,
  ][i],
  text: `Sample ${i + 1}`,
}));
