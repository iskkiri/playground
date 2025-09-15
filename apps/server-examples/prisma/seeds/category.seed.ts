import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  console.log('카테고리 시딩 시작...');

  // 기본 카테고리 데이터
  const categories = [
    {
      name: 'Technology',
      description: '기술, 프로그래밍, IT 관련 게시글',
    },
    {
      name: 'News',
      description: '최신 뉴스 및 시사 관련 게시글',
    },
    {
      name: 'Lifestyle',
      description: '라이프스타일, 취미, 일상 관련 게시글',
    },
    {
      name: 'Business',
      description: '비즈니스, 경제, 창업 관련 게시글',
    },
    {
      name: 'Entertainment',
      description: '엔터테인먼트, 문화, 예술 관련 게시글',
    },
    {
      name: 'Sports',
      description: '스포츠, 운동, 피트니스 관련 게시글',
    },
    {
      name: 'Health',
      description: '건강, 의료, 웰빙 관련 게시글',
    },
    {
      name: 'Education',
      description: '교육, 학습, 연구 관련 게시글',
    },
    {
      name: 'Travel',
      description: '여행, 관광, 지역 정보 관련 게시글',
    },
    {
      name: 'Food',
      description: '음식, 요리, 맛집 관련 게시글',
    },
    {
      name: 'Fashion',
      description: '패션, 뷰티, 스타일 관련 게시글',
    },
    {
      name: 'Gaming',
      description: '게임, e스포츠, 게임 리뷰 관련 게시글',
    },
    {
      name: 'Music',
      description: '음악, 콘서트, 뮤지션 관련 게시글',
    },
    {
      name: 'Movies',
      description: '영화, 드라마, 영상 컨텐츠 관련 게시글',
    },
    {
      name: 'Books',
      description: '도서, 문학, 독서 관련 게시글',
    },
    {
      name: 'Art',
      description: '미술, 디자인, 창작 활동 관련 게시글',
    },
    {
      name: 'Science',
      description: '과학, 연구, 발견 관련 게시글',
    },
    {
      name: 'Environment',
      description: '환경, 기후, 지속가능성 관련 게시글',
    },
    {
      name: 'Politics',
      description: '정치, 정책, 사회 이슈 관련 게시글',
    },
    {
      name: 'Finance',
      description: '금융, 투자, 경제 동향 관련 게시글',
    },
    {
      name: 'Real Estate',
      description: '부동산, 주택, 임대 관련 게시글',
    },
    {
      name: 'Automotive',
      description: '자동차, 교통, 모빌리티 관련 게시글',
    },
    {
      name: 'Pets',
      description: '반려동물, 동물 관리 관련 게시글',
    },
    {
      name: 'Parenting',
      description: '육아, 부모, 가족 관련 게시글',
    },
    {
      name: 'DIY',
      description: 'DIY, 수리, 만들기 관련 게시글',
    },
    {
      name: 'Photography',
      description: '사진, 촬영, 포토그래피 관련 게시글',
    },
    {
      name: 'Cryptocurrency',
      description: '암호화폐, 블록체인, NFT 관련 게시글',
    },
    {
      name: 'Startups',
      description: '스타트업, 창업, 벤처 관련 게시글',
    },
    {
      name: 'Marketing',
      description: '마케팅, 광고, 브랜딩 관련 게시글',
    },
    {
      name: 'Career',
      description: '커리어, 취업, 직업 관련 게시글',
    },
    {
      name: 'Productivity',
      description: '생산성, 효율성, 시간 관리 관련 게시글',
    },
    {
      name: 'Relationships',
      description: '인간관계, 연애, 소통 관련 게시글',
    },
    {
      name: 'Mental Health',
      description: '정신건강, 심리, 상담 관련 게시글',
    },
    {
      name: 'Religion',
      description: '종교, 신앙, 철학 관련 게시글',
    },
    {
      name: 'History',
      description: '역사, 문화유산, 전통 관련 게시글',
    },
    {
      name: 'Language',
      description: '언어학습, 번역, 다국어 관련 게시글',
    },
    {
      name: 'Nature',
      description: '자연, 생태, 야생동물 관련 게시글',
    },
    {
      name: 'Gardening',
      description: '원예, 식물 기르기, 농업 관련 게시글',
    },
    {
      name: 'Home',
      description: '인테리어, 집꾸미기, 생활용품 관련 게시글',
    },
    {
      name: 'Festivals',
      description: '축제, 이벤트, 행사 관련 게시글',
    },
    {
      name: 'Volunteering',
      description: '봉사활동, 사회공헌, 기부 관련 게시글',
    },
    {
      name: 'Crafts',
      description: '수공예, 공예품, 핸드메이드 관련 게시글',
    },
    {
      name: 'Space',
      description: '우주, 천문학, 항공우주 관련 게시글',
    },
    {
      name: 'Ocean',
      description: '바다, 해양, 수중 활동 관련 게시글',
    },
    {
      name: 'Weather',
      description: '날씨, 기후, 기상 관련 게시글',
    },
    {
      name: 'Architecture',
      description: '건축, 도시계획, 건설 관련 게시글',
    },
    {
      name: 'Agriculture',
      description: '농업, 농촌, 농산물 관련 게시글',
    },
    {
      name: 'Energy',
      description: '에너지, 신재생에너지, 전력 관련 게시글',
    },
    {
      name: 'Transportation',
      description: '교통, 물류, 운송 관련 게시글',
    },
    {
      name: 'Security',
      description: '보안, 안전, 사이버보안 관련 게시글',
    },
    {
      name: 'Community',
      description: '지역사회, 동네, 커뮤니티 관련 게시글',
    },
  ];

  // 카테고리 upsert (생성 또는 업데이트)
  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {
        description: categoryData.description,
      },
      create: categoryData,
    });
  }

  console.log(`${categories.length}개의 카테고리가 처리되었습니다.`);
}