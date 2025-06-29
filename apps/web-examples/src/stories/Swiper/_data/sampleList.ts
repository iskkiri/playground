import sampleImage1 from '@/assets/images/sample1.png';
import sampleImage2 from '@/assets/images/sample2.png';
import sampleImage3 from '@/assets/images/sample3.png';
import sampleImage4 from '@/assets/images/sample4.png';
import sampleImage5 from '@/assets/images/sample5.png';
import sampleImage6 from '@/assets/images/sample6.png';
import sampleImage7 from '@/assets/images/sample7.png';

const sampleImageList = [
  sampleImage1.src,
  sampleImage2.src,
  sampleImage3.src,
  sampleImage4.src,
  sampleImage5.src,
  sampleImage6.src,
  sampleImage7.src,
];

export const sampleList = [...Array(6)].map((_, i) => sampleImageList[i]);

export const sampleList2 = [...Array(5)].map((_, i) => sampleImageList[i]);

export const sampleList3 = [...Array(10)].map(
  (_, i) => sampleImageList[i % sampleImageList.length]
);
