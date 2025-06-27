import React, { useState } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';

// 예시 API 함수들
const fetchContactInfo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    contactInfo: {
      email: 'contact@example.com',
      github: 'https://github.com/username',
      website: 'https://example.com',
      social: {
        twitter: '@username',
        linkedin: 'linkedin.com/in/username',
      },
    },
    teamMembers: [
      { name: '김개발자', role: 'Frontend Developer', email: 'dev1@example.com' },
      { name: '이디자이너', role: 'UI/UX Designer', email: 'design@example.com' },
      { name: '박백엔드', role: 'Backend Developer', email: 'backend@example.com' },
    ],
  };
};

const subscribeNewsletter = async (email: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!email || !email.includes('@')) {
    throw new Error('유효한 이메일 주소를 입력해주세요.');
  }

  // 실제로는 뉴스레터 서비스에 등록
  console.log('뉴스레터 구독:', email);
  return { message: `${email}로 뉴스레터 구독이 완료되었습니다!` };
};

export default function ContactPage() {
  const [email, setEmail] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['contact-info'],
    queryFn: fetchContactInfo,
    staleTime: 15 * 60 * 1000, // 15분간 fresh
  });

  const {
    mutate: subscribe,
    isPending: isSubscribing,
    isSuccess: isSubscribed,
    error: subscriptionError,
  } = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: () => {
      setEmail(''); // 폼 리셋
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(email);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  const { contactInfo, teamMembers } = data!;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          ← 홈으로 돌아가기
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">연락처</h1>
        <p className="text-lg text-gray-600">프로젝트에 대한 문의나 협업 제안을 환영합니다.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 연락처 정보 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">연락처 정보</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-20">이메일:</span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-20">GitHub:</span>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {contactInfo.github}
                </a>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-20">웹사이트:</span>
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {contactInfo.website}
                </a>
              </div>
            </div>
          </div>

          {/* 팀 멤버 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">팀 멤버</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {member.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 뉴스레터 구독 - useMutation 예제 */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">뉴스레터 구독</h2>
          <p className="text-gray-600 mb-4 text-sm">최신 업데이트와 팁을 받아보세요.</p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 주소
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribing || isSubscribed}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubscribing || isSubscribed || !email.trim()}
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubscribing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isSubscribed
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {isSubscribing ? '구독 중...' : isSubscribed ? '구독 완료!' : '구독하기'}
            </button>
          </form>

          {/* 결과 표시 */}
          {isSubscribed && (
            <div className="mt-4 p-3 rounded-md text-sm bg-green-50 text-green-800 border border-green-200">
              뉴스레터 구독이 완료되었습니다!
            </div>
          )}

          {subscriptionError && (
            <div className="mt-4 p-3 rounded-md text-sm bg-red-50 text-red-800 border border-red-200">
              {subscriptionError.message}
            </div>
          )}

          {/* 소셜 링크 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">소셜 미디어</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Twitter:</span>
                <span className="ml-2 text-blue-600">{contactInfo.social.twitter}</span>
              </div>
              <div>
                <span className="text-gray-600">LinkedIn:</span>
                <span className="ml-2 text-blue-600">{contactInfo.social.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TanStack Query 고급 기능 설명 */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          🚀 TanStack Query 고급 기능 예제
        </h3>
        <div className="text-blue-800 text-sm space-y-2">
          <p>
            <strong>Background Refetching:</strong> 사용자가 탭을 다시 포커스할 때 자동으로 데이터
            업데이트
          </p>
          <p>
            <strong>Stale Time:</strong> 설정된 시간 동안은 서버 요청 없이 캐시된 데이터 사용
          </p>
          <p>
            <strong>Optimistic Updates:</strong> 서버 응답 전에 UI를 미리 업데이트하여 빠른 UX 제공
          </p>
          <p>
            <strong>Error Retry:</strong> 네트워크 오류 시 자동으로 재시도하여 안정성 향상
          </p>
        </div>
      </div>
    </div>
  );
}
